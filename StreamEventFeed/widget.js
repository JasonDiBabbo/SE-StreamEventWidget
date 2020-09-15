/**
 * Rotating Alert Feed v1.0.0
 *
 * - @JasonDiBabbo
 */
var StreamEventType;
(function (StreamEventType) {
    StreamEventType[StreamEventType["Follow"] = 0] = "Follow";
    StreamEventType[StreamEventType["Subscription"] = 1] = "Subscription";
    StreamEventType[StreamEventType["Cheer"] = 2] = "Cheer";
})(StreamEventType || (StreamEventType = {}));
class StreamEvent {
    constructor(eventType) {
        this.eventType = eventType;
    }
    static lookupIconCss(eventType) {
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
    constructor(follower) {
        super(StreamEventType.Follow);
        this.name = follower.name;
        this.html = this.getHtml();
    }
    getHtml() {
        const iconHtml = `<i class="bar-icon ${StreamEvent.lookupIconCss(this.eventType)}"></i>`;
        const spanHtml = `<span class="bar-text">${this.name}</span>`;
        const html = `${iconHtml}${spanHtml}`;
        return html;
    }
}
class SubscriptionEvent extends StreamEvent {
    constructor(subscriber) {
        super(StreamEventType.Subscription);
        this.name = subscriber.name;
        this.amount = subscriber.amount;
        this.html = this.getHtml();
    }
    getHtml() {
        const iconHtml = `<i class="bar-icon ${StreamEvent.lookupIconCss(this.eventType)}"></i>`;
        const spanHtml = `<span class="bar-text">${this.name} ${this.getSubAmountString()}</span>`;
        const html = ` ${iconHtml}${spanHtml}`;
        return html;
    }
    getSubAmountString() {
        if (typeof this.amount === 'number' && this.amount > 1) {
            return `X${this.amount.toString()}`;
        }
        else {
            return '';
        }
    }
}
class CheerEvent extends StreamEvent {
    constructor(cheer) {
        super(StreamEventType.Cheer);
        this.name = cheer.name;
        this.amount = cheer.amount;
        this.html = this.getHtml();
    }
    getHtml() {
        const iconHtml = `<svg class="bar-icon" viewBox="0 0 187.35 242.67">
                <path d="M221.2,159.15l-82.46-29.27a6.63,6.63,0,0,0-4.48,0L51.8,159.15a6.7,6.7,0,0,1-7.83-10l86.95-131a6.7,6.7,0,0,1,11.16,0l86.95,131A6.7,6.7,0,0,1,221.2,159.15Z" transform="translate(-42.83 -15.17)"/>
                <path d="M220.25,195.51l-80.09,61.24a6.7,6.7,0,0,1-7.32,0L52.75,195.51a6.69,6.69,0,0,1,1.42-11.92l80.09-28.44a6.75,6.75,0,0,1,4.48,0l80.09,28.44A6.69,6.69,0,0,1,220.25,195.51Z" transform="translate(-42.83 -15.17)"/>
             </svg>`;
        const spanHtml = `<span class="bar-text">${this.name} ${this.getCheerAmountString()}</span>`;
        const html = `${iconHtml}${spanHtml}`;
        return html;
    }
    getCheerAmountString() {
        if (typeof this.amount === 'number' && this.amount > 0) {
            return `X${this.amount.toString()}`;
        }
        else {
            return '';
        }
    }
}
class EventManager {
    static get currentEvent() {
        if (EventManager.events.length === 0) {
            return null;
        }
        if (EventManager.currentEventIndex >= EventManager.events.length) {
            throw new Error(`EventManager.CurrentEvent - '_currentEventIndex' value has become out of bounds.`);
        }
        return EventManager.events[EventManager.currentEventIndex];
    }
    static get nextEvent() {
        if (EventManager.events.length === 0) {
            return null;
        }
        EventManager.incrementEventIndex();
        if (EventManager.currentEventIndex >= EventManager.events.length) {
            throw new Error(`EventManager.NextEvent - '_currentEventIndex' value has become out of bounds.`);
        }
        return EventManager.events[EventManager.currentEventIndex];
    }
    static registerEvent(event) {
        if (!event) {
            return;
        }
        let index = EventManager.events.findIndex((x) => x.eventType === event.eventType);
        if (index === -1) {
            EventManager.events.push(event);
        }
        else {
            EventManager.events.splice(index, 1, event);
        }
        if (EventManager.events.length === 1) {
            EventManager.currentEventIndex = 0;
        }
    }
    static registerEvents(events) {
        if (events) {
            events.forEach((event) => EventManager.registerEvent(event));
        }
    }
    static incrementEventIndex() {
        EventManager.currentEventIndex = EventManager.currentEventIndex + 1 >= EventManager.events.length ? 0 : EventManager.currentEventIndex + 1;
    }
}
EventManager.currentEventIndex = -1;
EventManager.events = [];
class AnimationManager {
    static get bar() {
        return document.querySelector(AnimationManager.barSelector);
    }
    static get barSlides() {
        return document.querySelectorAll(AnimationManager.barChildrenSelector);
    }
    static initializeEventCycle(timeEventFade, timeEventDisplay) {
        AnimationManager.cycleInEvent(EventManager.currentEvent, timeEventFade, timeEventDisplay);
    }
    static cycleInEvent(event, timeEventFade, timeEventDisplay) {
        AnimationManager.fadeInEvent(event);
        AnimationManager.setTimeout(() => {
            AnimationManager.fadeOutEvent();
            AnimationManager.setTimeout(() => AnimationManager.cycleInEvent(EventManager.nextEvent, timeEventFade, timeEventDisplay), timeEventFade);
        }, timeEventFade + timeEventDisplay);
    }
    static fadeInEvent(event) {
        const slideElement = AnimationManager.barSlides[0];
        slideElement.innerHTML = event.html;
        slideElement.className = 'bar-item slide';
    }
    static fadeOutEvent() {
        AnimationManager.barSlides[0].className = 'bar-item slide invisible';
    }
    static setTimeout(fn, delay) {
        if (AnimationManager.setTimeoutForbidden) {
            return;
        }
        AnimationManager.currentTimeout = setTimeout(fn, delay);
    }
}
AnimationManager.barSelector = '.bar.slide-frame';
AnimationManager.barChildrenSelector = '.bar.slide-frame > .bar-item.slide';
AnimationManager.setTimeoutForbidden = false;
class Utilities {
    static parseFloatWithDefault(float, defaultValue) {
        let result = parseFloat(float);
        return isNaN(result) ? defaultValue : result;
    }
    static cheerEventIsValid(event) {
        return event.name && event.amount > 0;
    }
    static followEventIsValid(event) {
        return !!event.name;
    }
    static subscriptionEventIsValid(event) {
        return event.name && event.amount > 0;
    }
}
window.addEventListener('onEventReceived', function (obj) {
});
let timeEventFade = 2000;
let timeEventDisplay = 10000;
let timeAlertSlide = 750;
let timeAlertFade = 2000;
window.addEventListener('onWidgetLoad', function (obj) {
    let data = obj['detail']['session']['data'];
    let fieldData = obj['detail']['fieldData'];
    timeEventFade = Utilities.parseFloatWithDefault(fieldData.eventCycleFadeTime, 2) * 1000;
    timeEventDisplay = Utilities.parseFloatWithDefault(fieldData.eventCycleDisplayTime, 10) * 1000;
    timeAlertSlide = Utilities.parseFloatWithDefault(fieldData.eventAlertSlideTime, 0.75) * 1000;
    timeAlertFade = Utilities.parseFloatWithDefault(fieldData.eventAlertFadeTime, 2) * 1000;
    let latestFollowEvent = new FollowEvent(data['follower-latest']);
    let latestSubscriptionEvent = new SubscriptionEvent(data['subscriber-latest']);
    let latestCheerEvent = new CheerEvent(data['cheer-latest']);
    let events = [latestFollowEvent, latestSubscriptionEvent];
    if (Utilities.followEventIsValid(latestFollowEvent)) {
        events.push(latestFollowEvent);
    }
    if (Utilities.subscriptionEventIsValid(latestSubscriptionEvent)) {
        events.push(latestSubscriptionEvent);
    }
    if (Utilities.cheerEventIsValid(latestCheerEvent)) {
        events.push(latestCheerEvent);
    }
    EventManager.registerEvents(events);
    AnimationManager.initializeEventCycle(timeEventFade, timeEventDisplay);
});
