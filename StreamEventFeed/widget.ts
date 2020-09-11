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
    Subscriber
}

abstract class StreamEvent implements IStreamEvent {
    public abstract html: string;

    constructor(public eventType: StreamEventType, protected iconCssClass: string) { }
}

class FollowerEvent extends StreamEvent {
    public html: string;

    constructor(private followerName: string) {
        super(StreamEventType.Follower, 'fas fa-heart');

        this.html = this.getHtml();
    }

    private getHtml(): string {
        const iconHtml = `<i class="bar-icon ${this.iconCssClass}"></i>`;
        const spanHtml = `<span class="bar-text">${this.followerName}</span>`;
        const html = `${iconHtml}${spanHtml}`;

        return html;
    }
}

class SubscriberEvent extends StreamEvent {
    public html: string;

    constructor(private subscriberName: string) {
        super(StreamEventType.Subscriber, 'fas fa-star');

        this.html = this.getHtml();
    }

    private getHtml(): string {
        const iconHtml = `<i class="bar-icon ${this.iconCssClass}"></i>`;
        const spanHtml = `<span class="bar-text">${this.subscriberName}</span>`;
        const html = ` ${iconHtml}${spanHtml}`;

        return html;
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
        $(AnimationManager.CurrentBarSlideSelector)
            .html(event.html)
            .removeClass(AnimationManager.HiddenElementClass)
            .addClass(AnimationManager.FadeInCssClasses);

        setTimeout(
            () => {
                $(AnimationManager.CurrentBarSlideSelector)
                    .removeClass(AnimationManager.FadeInCssClasses);
            },
            timeIn
        );
    }

    private static FadeOutEvent(timeOut: number): void {
        $(AnimationManager.CurrentBarSlideSelector)
            .removeClass(AnimationManager.FadeInCssClasses)
            .addClass(AnimationManager.FadeOutCssClasses);

        setTimeout(() => {
            $(AnimationManager.CurrentBarSlideSelector)
                .addClass(AnimationManager.HiddenElementClass)
                .removeClass(AnimationManager.FadeOutCssClasses);
        }, timeOut);
    }
}

declare var $: any;

window.addEventListener('onEventReceived', function (obj) {

});

window.addEventListener('onWidgetLoad', function (obj) {
    let data = obj["detail"]["session"]["data"];
    let fieldData = obj["detail"]["fieldData"];

    /* UI Parameters */
    
    let timeIn = parseFloat(fieldData.fadeInAnimationTime) * 1000;
    if (isNaN(timeIn)) { timeIn = 2000; }

    let timeDisplay = parseFloat(fieldData.eventDisplayTime) * 1000;
    if (isNaN(timeDisplay)) { timeDisplay = 4000; }

    let timeOut = parseFloat(fieldData.fadeOutAnimationTime) * 1000;
    if (isNaN(timeOut)) { timeOut = 2000; }

    let latestFollower = data["follower-latest"];
    let latestSubscriber = data["subscriber-latest"];

    let latestFollowerEvent: FollowerEvent = new FollowerEvent(latestFollower.name);
    let latestSubscriberEvent: SubscriberEvent = new SubscriberEvent(latestSubscriber.name);

    let events: StreamEvent[] = [latestFollowerEvent, latestSubscriberEvent];
    EventManager.RegisterEvents(events);

    AnimationManager.InitializeEventCycle(timeIn, timeDisplay, timeOut);
});