/**
 * Rotating Alert Feed v1.0.0
 * 
 * - @JasonDiBabbo
 */

enum StreamEventType {
    Follow,
    Subscription,
    Cheer
}

abstract class StreamEvent {
    public abstract html: string;

    constructor(public eventType: StreamEventType) { }

    public static lookupIconCss(eventType: StreamEventType): string {
        let iconCss = null;

        switch (eventType) {
            case StreamEventType.Follow:
                iconCss = 'fas fa-heart';
                break;
            case StreamEventType.Subscription:
                iconCss = 'fas fa-star';
                break;
            default:
                break;
        }

        return iconCss;
    }
}

class FollowEvent extends StreamEvent {
    public html: string;

    public name: string;

    constructor(follower: any) {
        super(StreamEventType.Follow);

        this.name = follower.name;
        this.html = this.getHtml();
    }

    private getHtml(): string {
        const iconHtml = `<i class="bar-icon ${StreamEvent.lookupIconCss(this.eventType)}"></i>`;
        const spanHtml = `<span class="bar-text">${this.name}</span>`;
        const html = `${iconHtml}${spanHtml}`;

        return html;
    }
}

class SubscriptionEvent extends StreamEvent {
    public html: string;

    public name: string;

    public amount: number;

    constructor(subscriber: any) {
        super(StreamEventType.Subscription);

        this.name = subscriber.name;
        this.amount = subscriber.amount
        this.html = this.getHtml();
    }

    private getHtml(): string {
        const iconHtml = `<i class="bar-icon ${StreamEvent.lookupIconCss(this.eventType)}"></i>`;
        const spanHtml = `<span class="bar-text">${this.name} ${this.getSubAmountString()}</span>`;
        const html = ` ${iconHtml}${spanHtml}`;

        return html;
    }

    private getSubAmountString(): string {
        if (typeof this.amount === 'number' && this.amount > 1) {
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
    private static currentEventIndex = -1;
    
    private static events: StreamEvent[] = [];

    public static get currentEvent(): StreamEvent {
        if (EventManager.events.length === 0) {
            return null;
        }

        if (EventManager.currentEventIndex >= EventManager.events.length) {
            throw new Error(`EventManager.CurrentEvent - '_currentEventIndex' value has become out of bounds.`);
        }

        return EventManager.events[EventManager.currentEventIndex];
    }

    public static get nextEvent(): StreamEvent {
        if (EventManager.events.length === 0) {
            return null;
        }

        EventManager.incrementEventIndex();

        if (EventManager.currentEventIndex >= EventManager.events.length) {
            throw new Error(`EventManager.NextEvent - '_currentEventIndex' value has become out of bounds.`);
        }

        return EventManager.events[EventManager.currentEventIndex];
    }

    public static registerEvent(event: StreamEvent): void {
        if (!event) {
            return;
        }

        let index = EventManager.events.findIndex((x) => x.eventType === event.eventType);

        if (index === -1) {
            EventManager.events.push(event);
        } else {
            EventManager.events.splice(index, 1, event);
        }

        if (EventManager.events.length === 1) {
            EventManager.currentEventIndex = 0;
        }
    }

    public static registerEvents(events: StreamEvent[]) {
        if (events) {
            events.forEach((event) => EventManager.registerEvent(event));
        }
    }

    private static incrementEventIndex(): void  {
        EventManager.currentEventIndex = EventManager.currentEventIndex + 1 >= EventManager.events.length ? 0 : EventManager.currentEventIndex + 1;
    }
}

class AnimationManager {
    private static readonly animationPrefix = 'animate__';

    private static readonly hiddenElementClass = 'hidden';

    private static readonly currentBarSlideSelector = '.bar-item.slide';

    private static readonly fadeInCssClasses: string[] = [
        `${AnimationManager.animationPrefix}animated`,
        `${AnimationManager.animationPrefix}fadeIn`
    ];

    private static readonly fadeOutCssClasses: string[] = [
        `${AnimationManager.animationPrefix}animated`,
        `${AnimationManager.animationPrefix}fadeOut`
    ];

    public static initializeEventCycle(timeIn: number, timeDisplay: number, timeOut: number): void {
        AnimationManager.cycleInEvent(EventManager.currentEvent, timeIn, timeDisplay, timeOut);
    }

    private static cycleInEvent(event: StreamEvent, timeIn: number, timeDisplay: number, timeOut: number): void {
        if (!event) {
            throw new Error(`AnimationManager.CycleInEvent - 'event' parameter is null or undefined.`);
        }

        AnimationManager.fadeInEvent(event, timeIn);

        setTimeout(
            () => {
                AnimationManager.fadeOutEvent(timeOut);

                setTimeout(
                    () => {
                        let nextEvent = EventManager.nextEvent;
                        AnimationManager.cycleInEvent(nextEvent, timeIn, timeDisplay, timeOut);
                    },
                    timeOut
                );
            },
            timeIn + timeDisplay
        );
    }

    private static fadeInEvent(event: StreamEvent, timeIn: number): void {
        const slideElement = document.querySelector(AnimationManager.currentBarSlideSelector);

        slideElement.innerHTML = event.html;
        slideElement.classList.remove(AnimationManager.hiddenElementClass);
        slideElement.classList.add(...AnimationManager.fadeInCssClasses);

        setTimeout(
            () => {
                slideElement.classList.remove(...AnimationManager.fadeInCssClasses);
            },
            timeIn
        );
    }

    private static fadeOutEvent(timeOut: number): void {
        const slideElement = document.querySelector(AnimationManager.currentBarSlideSelector);

        slideElement.classList.remove(...AnimationManager.fadeInCssClasses);
        slideElement.classList.add(...AnimationManager.fadeOutCssClasses);

        setTimeout(() => {
            slideElement.classList.add(AnimationManager.hiddenElementClass);
            slideElement.classList.remove(...AnimationManager.fadeOutCssClasses);
        },
        timeOut);
    }
}

class Utilities {
    public static parseFloatWithDefault(float: string, defaultValue: number): number {
        let result = parseFloat(float);

        return isNaN(result) ? defaultValue : result;
    }

    public static cheerEventIsValid(event: CheerEvent): boolean {
        return event.name && event.amount > 0;
    }

    public static followEventIsValid(event: FollowEvent): boolean {
        return !!event.name;
    }

    public static subscriptionEventIsValid(event: SubscriptionEvent): boolean {
        return event.name && event.amount > 0;
    }
}

window.addEventListener('onEventReceived', function (obj) {

});

window.addEventListener('onWidgetLoad', function (obj) {
    let data = obj['detail']['session']['data'];
    let fieldData = obj['detail']['fieldData'];

    let timeIn = Utilities.parseFloatWithDefault(fieldData.fadeInAnimationTime, 2) * 1000;
    let timeDisplay = Utilities.parseFloatWithDefault(fieldData.eventDisplayTime, 10) * 1000;
    let timeOut = Utilities.parseFloatWithDefault(fieldData.fadeOutAnimationTime, 2) * 1000;

    let latestFollowEvent: FollowEvent = new FollowEvent(data['follower-latest']);
    let latestSubscriptionEvent: SubscriptionEvent = new SubscriptionEvent(data['subscriber-latest']);
    let latestCheerEvent: CheerEvent = new CheerEvent(data['cheer-latest']);

    let events: StreamEvent[] = [latestFollowEvent, latestSubscriptionEvent];

    if (Utilities.followEventIsValid(latestFollowEvent)) { events.push(latestFollowEvent); }
    if (Utilities.subscriptionEventIsValid(latestSubscriptionEvent)) { events.push(latestSubscriptionEvent); }
    if (Utilities.cheerEventIsValid(latestCheerEvent)) { events.push(latestCheerEvent); }
    
    EventManager.registerEvents(events);

    AnimationManager.initializeEventCycle(timeIn, timeDisplay, timeOut);
});