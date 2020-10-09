import { StreamEvent } from './streamEvent';
import { StreamEventFeedBar } from './streamEventFeedBar';
import { StreamEventFeedParameters } from './streamEventFeedParameters';

export class StreamEventFeed {
    private bar: StreamEventFeedBar;

    private timeEventDisplay: number;

    private timeEventAlertSlide: number;

    private timeEventAlertFade: number;

    private currentEventIndex: number;

    private events: StreamEvent[];

    private get currentEvent(): StreamEvent {
        const event = this.events[this.currentEventIndex];

        if (!event) {
            throw new Error('')
        }

        return event;
    }

    private get nextEvent(): StreamEvent {
        this.currentEventIndex = this.calculateNextEventIndex();
        const event = this.events[this.currentEventIndex];

        if (!event) {
            throw new Error('');
        }

        return event;
    }

    constructor(params: StreamEventFeedParameters) {
        if (params) {
            this.timeEventDisplay = params.timeEventDisplay && params.timeEventDisplay > 0 ? params.timeEventDisplay : this.timeEventDisplay;
            this.timeEventAlertSlide = params.timeEventAlertSlide && params.timeEventAlertSlide > 0 ? params.timeEventAlertSlide : this.timeEventAlertSlide;
            this.timeEventAlertFade = params.timeEventAlertFade && params.timeEventAlertFade > 0 ? params.timeEventAlertFade : this.timeEventAlertFade;
        }

        this.bar = new StreamEventFeedBar();
    }

    protected static SInit = (() => {
        StreamEventFeed.prototype.timeEventDisplay = 10000;
        StreamEventFeed.prototype.timeEventAlertSlide = 750;
        StreamEventFeed.prototype.timeEventAlertFade = 2000;
        StreamEventFeed.prototype.currentEventIndex = -1;
        StreamEventFeed.prototype.events = [];
    })();

    public displayEvents(): void {
        const currentBarSlide = this.bar.currentSlide;
        const currentBarSlideContent = currentBarSlide.children[0] as HTMLElement;

        currentBarSlide.addEventListener('transitionend', (event: TransitionEvent) => {
            const property = event.propertyName;

            if (property === 'opacity') {
                if (currentBarSlideContent.style.opacity === '1') {
                    setTimeout(() => this.hideElement(currentBarSlideContent), this.timeEventDisplay);
                } else {
                    currentBarSlideContent.innerHTML = this.nextEvent.html;
                    this.revealElement(currentBarSlideContent);
                }
            }
        });

        if (!currentBarSlideContent.innerHTML.trim()) {
            currentBarSlideContent.innerHTML = this.currentEvent.html;
        }

        setTimeout(() => this.hideElement(currentBarSlideContent), this.timeEventDisplay);
    }

    public registerEvent(event: StreamEvent): void {
        if (!event) {
            return;
        }

        const originalEventIndex = this.events.findIndex((x) => x.eventType === event.eventType);

        if (originalEventIndex === -1) {
            this.currentEventIndex = this.events.push(event) - 1;
        } else {
            let newEventIndex: number;

            if (originalEventIndex > this.currentEventIndex) {
                this.events.splice(originalEventIndex, 1);
                newEventIndex = this.currentEventIndex === this.events.length - 1 ? 0 : this.currentEventIndex + 1;
                this.events.splice(newEventIndex, 0, event);
            } else if (originalEventIndex < this.currentEventIndex) {
                this.events.splice(originalEventIndex, 1);
                newEventIndex = this.currentEventIndex - 1 === 0 ? this.events.length - 1 : this.currentEventIndex - 2;
                this.events.splice(newEventIndex, 0, event);
            } else {
                this.events.splice(originalEventIndex, 1, event);
                newEventIndex = originalEventIndex;
            }

            this.currentEventIndex = newEventIndex;
        }
    }

    public registerEvents(events: StreamEvent[]): void {
        if (events) {
            events.forEach((event) => this.registerEvent(event));
        }
    }

    private calculateNextEventIndex(): number {
        return this.currentEventIndex === this.events.length - 1 ? 0 : this.currentEventIndex + 1;
    }

    private hideElement(element: HTMLElement): void {
        if (element) {
            element.style.opacity = '0';
        }
    }

    private revealElement(element: HTMLElement): void {
        if (element) {
            element.style.opacity = '1';
        }
    }
}