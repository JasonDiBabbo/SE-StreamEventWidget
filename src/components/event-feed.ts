import { StreamEvent } from '@models';
import { EventService } from '@services';
import { FieldKeys, FieldStore, Time } from '@utilities';

export class EventFeed {
    /**
     * Gets the current slide from the DOM
     */
    public get currentSlide(): HTMLElement {
        const slides = this.slideDeck.children;

        if (!slides || slides.length < 1) {
            throw new Error(`Cannot get current slide. No slides in slide deck.`);
        }

        const currentSlide = slides[0] as HTMLElement;
        return currentSlide;
    }

    private readonly document: Document;

    private readonly slideDeck: HTMLElement;

    /**
     * The amount of time an alert is allowed to remain active before being evicted for the next event
     */
    private readonly alertDisplayTime: number;

    /**
     * The amount of time an event is allowed to display before being evicted for the next one
     */
    private readonly eventDisplayTime: number;

    /**
     * Initializes a new instance of the {@link EventFeed} class
     *
     * @param eventService The event service
     */
    constructor(private eventService: EventService) {
        if (!this.eventService) {
            throw new Error(`Parameter 'eventService' is null or undefined.`);
        }

        if (!document) {
            throw new Error(`Global 'document' object is null or undefined.`);
        }

        this.document = document;
        this.slideDeck = this.document.querySelector('.slide-deck');

        this.alertDisplayTime = Time.toMilliseconds(
            FieldStore.Get<number>(FieldKeys.FeedAlertDisplayTime)
        );

        this.eventDisplayTime = Time.toMilliseconds(
            FieldStore.Get<number>(FieldKeys.FeedEventDisplayTime)
        );
    }

    /**
     * Starts the feed to begin processing events
     */
    public start(): void {
        this.initializeCurrentSlide().then((slide) => this.processEvents(slide));
    }

    /**
     * Triggers an alert on the feed
     *
     * @param event The new event
     */
    public triggerAlert(event: StreamEvent): void {
        const currentSlide = this.currentSlide;
        const newSlide = this.createAlertSlide(event);

        this.slideDeck.appendChild(newSlide);

        Promise.all([this.animateSlideUpOut(currentSlide), this.animateSlideUpIn(newSlide)])
            .then(() => this.slideDeck.removeChild(currentSlide))
            .then(() => this.wait(this.alertDisplayTime))
            .then(() => this.clearAlert(newSlide))
            .then(() => this.processEvents(newSlide));
    }

    /**
     * Animates a slide up and into the feed
     *
     * @param slide The slide to animate
     * @returns A void promise
     */
    private animateSlideUpIn(slide: HTMLElement): Promise<void> {
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

    /**
     * Animates a slide up and out of the feed
     *
     * @param slide The slide to animate
     * @returns A void promise
     */
    private animateSlideUpOut(slide: HTMLElement): Promise<void> {
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

    /**
     * Transitions a slide out of the alert state
     *
     * @param slide The slide to transition
     * @returns A void promise
     */
    private clearAlert(slide: HTMLElement): Promise<void> {
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

    /**
     * Creates a slide for a new alert
     *
     * @param event The event to create an alert slide for
     * @returns The slide element
     */
    private createAlertSlide(event: StreamEvent): HTMLElement {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.innerHTML = event.html;
        slide.classList.add(event.alertCssClass, 'offscreen-bottom');

        return slide;
    }

    /**
     * Fades in the content of a slide
     *
     * @param slide The slide to fade in
     * @returns A void promise
     */
    private fadeInSlideEvent(slide: HTMLElement): Promise<void> {
        return new Promise((resolve) => {
            const handler = (event: TransitionEvent) => {
                if (event.propertyName === 'opacity') {
                    slide.removeEventListener('transitionend', handler);
                    resolve();
                }
            };

            slide.addEventListener('transitionend', handler);
            slide.classList.remove('hidden');
        });
    }

    /**
     * Fades out the content of a slide
     *
     * @param slide The slide to fade out
     * @returns A void promise
     */
    private fadeOutSlideEvent(slide: HTMLElement): Promise<void> {
        return new Promise((resolve) => {
            const handler = (event: TransitionEvent) => {
                if (event.propertyName === 'opacity') {
                    slide.removeEventListener('transitionend', handler);
                    resolve();
                }
            };

            slide.addEventListener('transitionend', handler);
            slide.classList.add('hidden');
        });
    }

    /**
     * Initializes the current slide with event data
     *
     * @returns A promise of the slide
     */
    private initializeCurrentSlide(): Promise<HTMLElement> {
        const slide = this.currentSlide;
        const event = this.eventService.getCurrentEvent();

        return this.setSlide(slide, event.html).then(() => slide);
    }

    /**
     * Cycles through events on a slide
     *
     * @param slide The slide to cycle events on
     */
    private processEvents(slide: HTMLElement): void {
        const nextEvent = this.eventService.getNextEvent();

        this.processSlideEvent(slide, nextEvent).then(() => {
            /**
             * Compare the slide we've been working with to the one that's
             * the first child of the slide deck in the DOM.
             * We know that the slide we're using is no longer
             * valid if it's not the first child.
             */

            if (slide === this.currentSlide) {
                this.processEvents(slide);
            }
        });
    }

    /**
     * Displays an event on a slide
     *
     * @param slide The slide to include the event on
     * @param event The event to display
     * @returns A void promise
     */
    private processSlideEvent(slide: HTMLElement, event: StreamEvent): Promise<void> {
        // Old implementation
        // return this.wait(this.eventDisplayTime)
        //     .then(() => this.fadeOutSlideEvent(slide))
        //     .then(() => this.setSlide(slide, this.eventService.getNextEvent()))
        //     .then(() => this.fadeInSlideEvent(slide));

        return this.wait(this.eventDisplayTime)
            .then(() => this.fadeOutSlideEvent(slide))
            .then(() => this.setSlide(slide, event.html))
            .then(() => this.fadeInSlideEvent(slide));
    }

    /**
     * Forces the browser to process new animations
     *
     * When new DOM elements are introduced, associated
     * animations may have trouble firing.
     *
     * NOTE: This is a workaround/hack, not a supported
     * API call of any kind.
     *
     * @param element The element being animated
     */
    private requestBrowserAnimation(element: HTMLElement): void {
        void element.offsetWidth;
    }

    /**
     * Sets the content of a slide
     *
     * @param slide The slide being set
     * @param html The HTML string to set as the slide content
     *
     * @returns A void promise
     */
    private setSlide(slide: HTMLElement, html: string): Promise<void> {
        return new Promise<void>((resolve) => {
            slide.innerHTML = html;
            resolve();
        });
    }

    /**
     * Waits for a specified duration
     *
     * @param duration The duration to wait in ms
     * @returns A void promise
     */
    private wait(duration: number): Promise<void> {
        return new Promise<void>((resolve) => {
            window.setTimeout(() => resolve(), duration);
        });
    }
}
