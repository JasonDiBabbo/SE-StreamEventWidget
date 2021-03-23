import { Bar, Slide, SlideContent, Slides, StreamEvent } from '@models';
import { AlertService, EventService } from '@services';
import { FieldKeys, FieldStore } from '@utilities';

export class StreamEventBar {
    private alertDisplayTime: number;
    private eventDisplayTime: number;

    constructor(private eventService: EventService, private alertService: AlertService) {
        this.alertDisplayTime = FieldStore.Get<number>(FieldKeys.EventAlertDisplayTime);
        this.eventDisplayTime = FieldStore.Get<number>(FieldKeys.EventCycleDisplayTime);
    }

    public addEvents(...events: StreamEvent[]): void {
        if (!events) {
            throw new Error(`Parameter 'events' cannot be null or undefined.`);
        }

        events.forEach((event) => this.eventService.registerEvent(event));
    }

    public beginCycle(): void {
        this.initializeCurrentSlide().then((slide) => this.cycleContent(slide));
    }

    public triggerAlert(event: StreamEvent, persistEvent = true): void {
        if (persistEvent) {
            this.addEvents(event);
        }

        // TODO: There's a bug where if you trigger an alert of a given type,
        // TODO: the next event may also be that same event
        // TODO: i.e. follow alert, then it fades and shows the same follow

        const bar = this.getBar();
        const currentSlide = this.getCurrentSlide();
        const newSlide = this.alertService.createAlertSlide(event);

        this.placeSlideOffscreenBottom(newSlide);
        bar.appendChild(newSlide);

        Promise.all([this.animateSlideUpOut(currentSlide), this.animateSlideUpIn(newSlide)])
            .then(() => bar.removeChild(currentSlide))
            .then(() => this.waitForAlertDisplay())
            .then(() => this.markAlertAsRead(newSlide))
            .then(() => this.cycleContent(newSlide));
    }

    private animateSlideUpIn(slide: Slide): Promise<void> {
        this.requestBrowserAnimation(slide);

        return new Promise<void>((resolve) => {
            const handler = (event: TransitionEvent) => {
                if (event.propertyName === 'transform') {
                    slide.removeEventListener('transitionend', handler);
                    resolve();
                }
            };

            slide.addEventListener('transitionend', handler);
            slide.classList.remove('offscreen-bottom');
        });
    }

    private animateSlideUpOut(slide: Slide): Promise<void> {
        return new Promise<void>((resolve) => {
            const handler = (event: TransitionEvent) => {
                if (event.propertyName === 'transform') {
                    slide.removeEventListener('transitionend', handler);
                    resolve();
                }
            };

            slide.addEventListener('transitionend', handler);
            slide.classList.add('offscreen-top');
        });
    }

    private cycleContent(slide: Slide): void {
        this.processSlideContent(slide).then(() => {
            if (slide === this.getCurrentSlide()) {
                this.cycleContent(slide);
            }
        });
    }

    private getBar(): Bar {
        return document.querySelector('.bar');
    }

    private getCurrentSlide(): Slide {
        const bar = this.getBar();

        if (!bar) {
            throw new Error(`Element with '.bar' class not found.`);
        }

        const slides: Slides = bar.children;
        if (!slides || slides.length < 1) {
            throw new Error(`No children found in bar.`);
        }

        const currentSlide: Slide = slides[0] as HTMLElement;
        return currentSlide;
    }

    private getSlideContent(slide: Slide): SlideContent {
        return slide.children[0] as SlideContent;
    }

    private hideContent(slide: Slide): Promise<void> {
        const content = this.getSlideContent(slide);

        return new Promise((resolve) => {
            const handler = (event: TransitionEvent) => {
                if (event.propertyName === 'opacity') {
                    content.removeEventListener('transitionend', handler);
                    resolve();
                }
            };

            content.addEventListener('transitionend', handler);
            content.classList.add('hidden');
        });
    }

    private initializeCurrentSlide(): Promise<Slide> {
        const slide = this.getCurrentSlide();
        const event = this.eventService.getCurrentEvent();

        return this.populateSlide(slide, event).then(() => slide);
    }

    private markAlertAsRead(slide: Slide): Promise<void> {
        return new Promise<void>((resolve) => {
            const handler = (event: TransitionEvent) => {
                if (event.propertyName === 'background-color') {
                    slide.removeEventListener('transitionend', handler);
                    resolve();
                }
            };

            slide.addEventListener('transitionend', handler);
            slide.classList.value = 'slide';
        });
    }

    private placeSlideOffscreenBottom(slide: Slide): void {
        slide.classList.add('offscreen-bottom');
    }

    private populateSlide(slide: Slide, event: StreamEvent): Promise<void> {
        const content = this.getSlideContent(slide);

        return new Promise<void>((resolve) => {
            content.innerHTML = event.html;
            resolve();
        });
    }

    private processSlideContent(slide: Slide): Promise<void> {
        return this.waitForEventDisplay()
            .then(() => this.hideContent(slide))
            .then(() => this.populateSlide(slide, this.eventService.getNextEvent()))
            .then(() => this.revealContent(slide));
    }

    private requestBrowserAnimation(element: HTMLElement): void {
        void element.offsetWidth;
    }

    private revealContent(slide: Slide): Promise<void> {
        const content = this.getSlideContent(slide);

        return new Promise((resolve) => {
            const handler = (event: TransitionEvent) => {
                if (event.propertyName === 'opacity') {
                    content.removeEventListener('transitionend', handler);
                    resolve();
                }
            };

            content.addEventListener('transitionend', handler);
            content.classList.remove('hidden');
        });
    }

    private waitForAlertDisplay(): Promise<void> {
        return new Promise<void>((resolve) => {
            window.setTimeout(() => resolve(), this.alertDisplayTime);
        });
    }

    private waitForEventDisplay(): Promise<void> {
        return new Promise<void>((resolve) => {
            window.setTimeout(() => resolve(), this.eventDisplayTime);
        });
    }
}
