/**
 * Rotating Alert Feed v1.0.0
 * 
 * - @JasonDiBabbo
 */

interface IStreamEvent {
    html: string;
}

enum StreamEventType {
    Follower,
    Subscriber,
    Cheer
}

abstract class StreamEvent implements IStreamEvent {
    public abstract html: string;

    constructor(public eventType: StreamEventType) { }

    public static LookupIconCss(eventType: StreamEventType): string {
        let iconCss = null;

        switch (eventType) {
            case StreamEventType.Follower:
                iconCss = 'fas fa-heart';
                break;
            case StreamEventType.Subscriber:
                iconCss = 'fas fa-star';
                break;
            default:
                break;
        }

        return iconCss;
    }
}

class FollowerEvent extends StreamEvent {
    public html: string;

    private name: string;

    constructor(follower: any) {
        super(StreamEventType.Follower);

        this.name = follower.name;
        this.html = this.getHtml();
    }

    private getHtml(): string {
        const iconHtml = `<i class="bar-icon ${StreamEvent.LookupIconCss(this.eventType)}"></i>`;
        const spanHtml = `<span class="bar-text">${this.name}</span>`;
        const html = `${iconHtml}${spanHtml}`;

        return html;
    }
}

class SubscriberEvent extends StreamEvent {
    public html: string;

    private name: string;

    private amount: number;

    constructor(subscriber: any) {
        super(StreamEventType.Subscriber);

        this.name = subscriber.name;
        this.amount = subscriber.amount
        this.html = this.getHtml();
    }

    private getHtml(): string {
        const iconHtml = `<i class="bar-icon ${StreamEvent.LookupIconCss(this.eventType)}"></i>`;
        const spanHtml = `<span class="bar-text">${this.name} ${this.getSubAmountString()}</span>`;
        const html = ` ${iconHtml}${spanHtml}`;

        return html;
    }

    private getSubAmountString(): string {
        if (typeof this.amount === 'number' && this.amount > 0) {
            return `X${this.amount.toString()}`;
        } else {
            return '';
        }
    }
}

class CheerEvent extends StreamEvent {
    public html: string;

    public name: string;

    public amount: number;

    constructor(cheer: any) {
        super(StreamEventType.Cheer);

        this.name = cheer.name;
        this.amount = cheer.amount;

        this.html = this.getHtml();
    }

    private getHtml(): string {
        const iconHtml = 
            `<svg class="bar-icon" viewBox="0 0 187.35 242.67">
                <path d="M221.2,159.15l-82.46-29.27a6.63,6.63,0,0,0-4.48,0L51.8,159.15a6.7,6.7,0,0,1-7.83-10l86.95-131a6.7,6.7,0,0,1,11.16,0l86.95,131A6.7,6.7,0,0,1,221.2,159.15Z" transform="translate(-42.83 -15.17)"/>
                <path d="M220.25,195.51l-80.09,61.24a6.7,6.7,0,0,1-7.32,0L52.75,195.51a6.69,6.69,0,0,1,1.42-11.92l80.09-28.44a6.75,6.75,0,0,1,4.48,0l80.09,28.44A6.69,6.69,0,0,1,220.25,195.51Z" transform="translate(-42.83 -15.17)"/>
             </svg>`;

        const spanHtml = `<span class="bar-text">${this.name} ${this.getCheerAmountString()}</span>`;
        const html = `${iconHtml}${spanHtml}`;

        return html;
    }

    private getCheerAmountString(): string {
        if (typeof this.amount === 'number' && this.amount > 0) {
            return `X${this.amount.toString()}`;
        } else {
            return '';
        }
    }
}

class EventManager {
    private static _currentEventIndex = -1;
    
    private static _events: StreamEvent[] = [];

    public static get CurrentEvent(): StreamEvent {
        if (EventManager._events.length === 0) {
            return null;
        }

        if (EventManager._currentEventIndex >= EventManager._events.length) {
            throw new Error(`EventManager.CurrentEvent - '_currentEventIndex' value has become out of bounds.`);
        }

        return EventManager._events[EventManager._currentEventIndex];
    }

    public static get NextEvent(): StreamEvent {
        if (EventManager._events.length === 0) {
            return null;
        }

        EventManager.incrementEventIndex();

        if (EventManager._currentEventIndex >= EventManager._events.length) {
            throw new Error(`EventManager.NextEvent - '_currentEventIndex' value has become out of bounds.`);
        }

        return EventManager._events[EventManager._currentEventIndex];
    }

    public static RegisterEvent(event: StreamEvent): void {
        if (!event) {
            return;
        }

        let index = EventManager._events.findIndex((x) => x.eventType === event.eventType);

        if (index === -1) {
            EventManager._events.push(event);
        } else {
            EventManager._events.splice(index, 1, event);
        }

        if (EventManager._events.length === 1) {
            EventManager._currentEventIndex = 0;
        }
    }

    public static RegisterEvents(events: StreamEvent[]) {
        if (events) {
            events.forEach((event) => EventManager.RegisterEvent(event));
        }
    }

    private static incrementEventIndex(): void  {
        EventManager._currentEventIndex = EventManager._currentEventIndex + 1 >= EventManager._events.length ? 0 : EventManager._currentEventIndex + 1;
    }
}

class AnimationManager {
    public static readonly AnimationPrefix = 'animate__';

    public static readonly HiddenElementClass = 'hidden';

    public static readonly CurrentBarSlideSelector = '.bar-item.slide:first-child';

    public static readonly FadeInCssClasses: string[] = [
        `${AnimationManager.AnimationPrefix}animated`,
        `${AnimationManager.AnimationPrefix}fadeIn`
    ];

    public static readonly FadeOutCssClasses: string[] = [
        `${AnimationManager.AnimationPrefix}animated`,
        `${AnimationManager.AnimationPrefix}fadeOut`
    ];

    public static InitializeEventCycle(timeIn: number, timeDisplay: number, timeOut: number): void {
        AnimationManager.CycleInEvent(EventManager.CurrentEvent, timeIn, timeDisplay, timeOut);
    }

    private static CycleInEvent(event: StreamEvent, timeIn: number, timeDisplay: number, timeOut: number): void {
        if (!event) {
            throw new Error(`AnimationManager.CycleInEvent - 'event' parameter is null or undefined.`);
        }

        AnimationManager.FadeInEvent(event, timeIn);

        setTimeout(
            () => {
                AnimationManager.FadeOutEvent(timeOut);

                setTimeout(
                    () => {
                        let nextEvent = EventManager.NextEvent;
                        AnimationManager.CycleInEvent(nextEvent, timeIn, timeDisplay, timeOut);
                    },
                    timeOut
                );
            },
            timeIn + timeDisplay
        );
    }

    private static FadeInEvent(event: StreamEvent, timeIn: number): void {
        const slideElement = document.querySelector(AnimationManager.CurrentBarSlideSelector);

        slideElement.innerHTML = event.html;
        slideElement.classList.remove(AnimationManager.HiddenElementClass);
        slideElement.classList.add(...AnimationManager.FadeInCssClasses);

        setTimeout(
            () => {
                slideElement.classList.remove(...AnimationManager.FadeInCssClasses);
            },
            timeIn
        );
    }

    private static FadeOutEvent(timeOut: number): void {
        const slideElement = document.querySelector(AnimationManager.CurrentBarSlideSelector);

        slideElement.classList.remove(...AnimationManager.FadeInCssClasses);
        slideElement.classList.add(...AnimationManager.FadeOutCssClasses);

        setTimeout(() => {
            slideElement.classList.add(AnimationManager.HiddenElementClass);
            slideElement.classList.remove(...AnimationManager.FadeOutCssClasses);
        },
        timeOut);
    }
}

class Utilities {
    public static ParseFloatWithDefault(float: string, defaultValue: number): number {
        let result = parseFloat(float);

        return isNaN(result) ? defaultValue : result;
    }

    public static CheerEventIsValid(cheerEvent: CheerEvent): boolean {
        return cheerEvent.name && cheerEvent.amount > 0;
    }
}

window.addEventListener('onEventReceived', function (obj) {

});

window.addEventListener('onWidgetLoad', function (obj) {
    let data = obj['detail']['session']['data'];
    let fieldData = obj['detail']['fieldData'];

    let timeIn = Utilities.ParseFloatWithDefault(fieldData.fadeInAnimationTime, 2) * 1000;
    let timeDisplay = Utilities.ParseFloatWithDefault(fieldData.eventDisplayTime, 10) * 1000;
    let timeOut = Utilities.ParseFloatWithDefault(fieldData.fadeOutAnimationTime, 2) * 1000;

    let latestFollowerEvent: FollowerEvent = new FollowerEvent(data['follower-latest']);
    let latestSubscriberEvent: SubscriberEvent = new SubscriberEvent(data['subscriber-latest']);
    let latestCheerEvent: CheerEvent = new CheerEvent(data['cheer-latest']);

    let events: StreamEvent[] = [latestFollowerEvent, latestSubscriberEvent];

    if (Utilities.CheerEventIsValid(latestCheerEvent)) {
        events.push(latestCheerEvent);
    }
    
    EventManager.RegisterEvents(events);

    AnimationManager.InitializeEventCycle(timeIn, timeDisplay, timeOut);
});