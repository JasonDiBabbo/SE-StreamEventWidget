/**
 * Rotating Alert Feed v1.0.0
 *
 * - @JasonDiBabbo
 */
var StreamEventType;
(function (StreamEventType) {
    StreamEventType[StreamEventType["Follower"] = 0] = "Follower";
    StreamEventType[StreamEventType["Subscriber"] = 1] = "Subscriber";
})(StreamEventType || (StreamEventType = {}));
class StreamEvent {
    constructor(eventType, iconCssClass) {
        this.eventType = eventType;
        this.iconCssClass = iconCssClass;
    }
}
class FollowerEvent extends StreamEvent {
    constructor(follower) {
        super(StreamEventType.Follower, 'fas fa-heart');
        this.name = follower.name;
        this.html = this.getHtml();
    }
    getHtml() {
        const iconHtml = `<i class="bar-icon ${this.iconCssClass}"></i>`;
        const spanHtml = `<span class="bar-text">${this.name}</span>`;
        const html = `${iconHtml}${spanHtml}`;
        return html;
    }
}
class SubscriberEvent extends StreamEvent {
    constructor(subscriber) {
        super(StreamEventType.Subscriber, 'fas fa-star');
        this.name = subscriber.name;
        this.amount = subscriber.amount;
        this.html = this.getHtml();
    }
    getHtml() {
        const iconHtml = `<i class="bar-icon ${this.iconCssClass}"></i>`;
        const spanHtml = `<span class="bar-text">${this.name} ${this.getSubDurationString()}</span>`;
        const html = ` ${iconHtml}${spanHtml}`;
        return html;
    }
    getSubDurationString() {
        if (typeof this.amount === 'number' && this.amount > 0) {
            return `X${this.amount.toString()}`;
        }
        else {
            return '';
        }
    }
}
class EventManager {
    static get CurrentEvent() {
        if (EventManager._events.length === 0) {
            return null;
        }
        if (EventManager._currentEventIndex >= EventManager._events.length) {
            throw new Error(`EventManager.CurrentEvent - '_currentEventIndex' value has become out of bounds.`);
        }
        return EventManager._events[EventManager._currentEventIndex];
    }
    static get NextEvent() {
        if (EventManager._events.length === 0) {
            return null;
        }
        EventManager.incrementEventIndex();
        if (EventManager._currentEventIndex >= EventManager._events.length) {
            throw new Error(`EventManager.NextEvent - '_currentEventIndex' value has become out of bounds.`);
        }
        return EventManager._events[EventManager._currentEventIndex];
    }
    static RegisterEvent(event) {
        if (!event) {
            return;
        }
        let index = EventManager._events.findIndex((x) => x.eventType === event.eventType);
        if (index === -1) {
            EventManager._events.push(event);
        }
        else {
            EventManager._events.splice(index, 1, event);
        }
        if (EventManager._events.length === 1) {
            EventManager._currentEventIndex = 0;
        }
    }
    static RegisterEvents(events) {
        if (events) {
            events.forEach((event) => EventManager.RegisterEvent(event));
        }
    }
    static incrementEventIndex() {
        EventManager._currentEventIndex = EventManager._currentEventIndex + 1 >= EventManager._events.length ? 0 : EventManager._currentEventIndex + 1;
    }
}
EventManager._currentEventIndex = -1;
EventManager._events = [];
class AnimationManager {
    static InitializeEventCycle(timeIn, timeDisplay, timeOut) {
        AnimationManager.CycleInEvent(EventManager.CurrentEvent, timeIn, timeDisplay, timeOut);
    }
    static CycleInEvent(event, timeIn, timeDisplay, timeOut) {
        if (!event) {
            throw new Error(`AnimationManager.CycleInEvent - 'event' parameter is null or undefined.`);
        }
        AnimationManager.FadeInEvent(event, timeIn);
        setTimeout(() => {
            AnimationManager.FadeOutEvent(timeOut);
            setTimeout(() => {
                let nextEvent = EventManager.NextEvent;
                AnimationManager.CycleInEvent(nextEvent, timeIn, timeDisplay, timeOut);
            }, timeOut);
        }, timeIn + timeDisplay);
    }
    static FadeInEvent(event, timeIn) {
        $(AnimationManager.CurrentBarSlideSelector)
            .html(event.html)
            .removeClass(AnimationManager.HiddenElementClass)
            .addClass(AnimationManager.FadeInCssClasses);
        setTimeout(() => {
            $(AnimationManager.CurrentBarSlideSelector)
                .removeClass(AnimationManager.FadeInCssClasses);
        }, timeIn);
    }
    static FadeOutEvent(timeOut) {
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
AnimationManager.AnimationPrefix = 'animate__';
AnimationManager.HiddenElementClass = 'hidden';
AnimationManager.CurrentBarSlideSelector = '.bar-item.slide:first-child';
AnimationManager.FadeInCssClasses = [
    `${AnimationManager.AnimationPrefix}animated`,
    `${AnimationManager.AnimationPrefix}fadeIn`
];
AnimationManager.FadeOutCssClasses = [
    `${AnimationManager.AnimationPrefix}animated`,
    `${AnimationManager.AnimationPrefix}fadeOut`
];
window.addEventListener('onEventReceived', function (obj) {
});
window.addEventListener('onWidgetLoad', function (obj) {
    let data = obj["detail"]["session"]["data"];
    let fieldData = obj["detail"]["fieldData"];
    /* UI Parameters */
    let timeIn = parseFloat(fieldData.fadeInAnimationTime) * 1000;
    if (isNaN(timeIn)) {
        timeIn = 2000;
    }
    let timeDisplay = parseFloat(fieldData.eventDisplayTime) * 1000;
    if (isNaN(timeDisplay)) {
        timeDisplay = 4000;
    }
    let timeOut = parseFloat(fieldData.fadeOutAnimationTime) * 1000;
    if (isNaN(timeOut)) {
        timeOut = 2000;
    }
    let latestFollower = data["follower-latest"];
    let latestSubscriber = data["subscriber-latest"];
    let latestFollowerEvent = new FollowerEvent(latestFollower);
    let latestSubscriberEvent = new SubscriberEvent(latestSubscriber);
    let events = [latestFollowerEvent, latestSubscriberEvent];
    EventManager.RegisterEvents(events);
    AnimationManager.InitializeEventCycle(timeIn, timeDisplay, timeOut);
});
