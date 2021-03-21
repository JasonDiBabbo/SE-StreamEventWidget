import { Bar, Slide, SlideContent, Slides, StreamEvent } from '@models';
import { EventService } from '@services';
import { FieldKeys, FieldStore } from '@utilities';

export class StreamEventBar {
    private eventDisplayTime: number;

    constructor(private eventService: EventService) {
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

        throw new Error('Method not implemented.');
    }

    private cycleContent(slide: Slide): void {
        this.processSlideContent(slide).then(() => {
            if (slide === this.getCurrentSlide()) {
                this.cycleContent(slide);
            }
        });
    }

    private getCurrentSlide(): Slide {
        const bar: Bar = document.querySelector('.bar');

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

    private populateSlide(slide: Slide, event: StreamEvent): Promise<void> {
        const content = this.getSlideContent(slide);

        return new Promise<void>((resolve) => {
            content.innerHTML = event.html;
            resolve();
        });
    }

    private processSlideContent(slide: Slide): Promise<void> {
        return this.waitForEventDisplayTime()
            .then(() => this.hideContent(slide))
            .then(() => this.populateSlide(slide, this.eventService.getNextEvent()))
            .then(() => this.revealContent(slide));
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

    private waitForEventDisplayTime(): Promise<void> {
        return new Promise<void>((resolve) => {
            window.setTimeout(() => resolve(), this.eventDisplayTime);
        });
    }
}
