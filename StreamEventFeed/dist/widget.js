'use strict';

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
        }
        return iconCss;
    }
}

class CheerEvent extends StreamEvent {
    constructor(name, amount) {
        super(StreamEventType.Cheer);
        this.name = name ? name : this.name;
        this.amount = amount && amount > 0 ? amount : this.amount;
        this.html = this.getHtml();
    }
    get isValid() {
        return !!this.html && !!this.name && !!this.amount && this.amount > 0;
    }
    getHtml() {
        const cheerAmount = this.getCheerAmountString();
        if (cheerAmount) {
            const iconHtml = `<svg class="bar-icon" viewBox="0 0 187.35 242.67">
                <path d="M221.2,159.15l-82.46-29.27a6.63,6.63,0,0,0-4.48,0L51.8,159.15a6.7,6.7,0,0,1-7.83-10l86.95-131a6.7,6.7,0,0,1,11.16,0l86.95,131A6.7,6.7,0,0,1,221.2,159.15Z" transform="translate(-42.83 -15.17)"/>
                <path d="M220.25,195.51l-80.09,61.24a6.7,6.7,0,0,1-7.32,0L52.75,195.51a6.69,6.69,0,0,1,1.42-11.92l80.09-28.44a6.75,6.75,0,0,1,4.48,0l80.09,28.44A6.69,6.69,0,0,1,220.25,195.51Z" transform="translate(-42.83 -15.17)"/>
             </svg>`;
            const spanHtml = `<span class="bar-text">${this.name} ${cheerAmount}</span>`;
            const html = `${iconHtml}${spanHtml}`;
            return html;
        }
        return null;
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
CheerEvent.SInit = (() => {
    CheerEvent.prototype.name = null;
    CheerEvent.prototype.amount = 0;
    CheerEvent.prototype.html = null;
})();

class FollowEvent extends StreamEvent {
    constructor(name) {
        super(StreamEventType.Follow);
        this.name = name ? name : this.name;
        this.html = this.getHtml();
    }
    get isValid() {
        return !!this.html && !!this.name;
    }
    getHtml() {
        const iconCss = StreamEvent.lookupIconCss(this.eventType);
        if (iconCss && this.name) {
            const iconHtml = `<i class="bar-icon ${iconCss}"></i>`;
            const spanHtml = `<span class="bar-text">${this.name}</span>`;
            const html = `${iconHtml}${spanHtml}`;
            return html;
        }
        return null;
    }
}
FollowEvent.SInit = (() => {
    FollowEvent.prototype.name = null;
    FollowEvent.prototype.html = null;
})();

class StreamEventFeedBar {
    get bar() {
        return document.querySelector('.bar');
    }
    get currentSlide() {
        const slides = this.bar.children;
        return slides[0];
    }
    addSlide(slide) {
        this.bar.appendChild(slide);
    }
    animateSlideDownOut(slide, requestAnimationReflow = false) {
        if (requestAnimationReflow) {
            this.requestBrowserAnimation(slide);
        }
        slide.classList.add('offscreen-bottom');
    }
    animateSlideUpIn(slide, requestAnimationReflow = false) {
        if (requestAnimationReflow) {
            this.requestBrowserAnimation(slide);
        }
        slide.classList.remove('offscreen-bottom');
    }
    animateSlideUpOut(slide, requestAnimationReflow = false) {
        if (requestAnimationReflow) {
            this.requestBrowserAnimation(slide);
        }
        slide.classList.add('offscreen-top');
    }
    createEventAlertSlide(event) {
        const content = document.createElement('div');
        content.classList.add('bar-content');
        content.innerHTML = event.html;
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.appendChild(content);
        switch (event.eventType) {
            case StreamEventType.Cheer:
                break;
            case StreamEventType.Follow:
                slide.classList.add('follow-event-alert');
                break;
            case StreamEventType.Subscription:
                break;
        }
        return slide;
    }
    resetSlideStyles(slide) {
        slide.classList.value = 'slide';
    }
    requestBrowserAnimation(element) {
        void element.offsetWidth;
    }
}

class StreamEventFeed {
    constructor(params) {
        if (params) {
            this.timeEventDisplay = params.timeEventDisplay && params.timeEventDisplay > 0 ? params.timeEventDisplay : this.timeEventDisplay;
            this.timeEventAlertSlide = params.timeEventAlertSlide && params.timeEventAlertSlide > 0 ? params.timeEventAlertSlide : this.timeEventAlertSlide;
            this.timeEventAlertFade = params.timeEventAlertFade && params.timeEventAlertFade > 0 ? params.timeEventAlertFade : this.timeEventAlertFade;
        }
        this.bar = new StreamEventFeedBar();
    }
    get currentEvent() {
        const event = this.events[this.currentEventIndex];
        if (!event) {
            throw new Error('');
        }
        return event;
    }
    get nextEvent() {
        this.currentEventIndex = this.calculateNextEventIndex();
        const event = this.events[this.currentEventIndex];
        if (!event) {
            throw new Error('');
        }
        return event;
    }
    displayEvents() {
        const currentBarSlide = this.bar.currentSlide;
        const currentBarSlideContent = currentBarSlide.children[0];
        currentBarSlide.addEventListener('transitionend', (event) => {
            const property = event.propertyName;
            if (property === 'opacity') {
                if (currentBarSlideContent.style.opacity === '1') {
                    setTimeout(() => this.hideElement(currentBarSlideContent), this.timeEventDisplay);
                }
                else {
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
    handleEventAlert(event) {
        clearTimeout(this.currentEventAlertTimeout);
        const newSlide = this.bar.createEventAlertSlide(event);
        this.bar.animateSlideDownOut(newSlide);
        this.bar.addSlide(newSlide);
        this.bar.animateSlideUpOut(this.bar.currentSlide);
        this.bar.animateSlideUpIn(newSlide, true);
        this.currentEventAlertTimeout = setTimeout(() => {
            this.bar.currentSlide.remove();
            this.bar.resetSlideStyles(newSlide);
            this.currentEventAlertTimeout = setTimeout(() => {
                this.registerEvent(event);
                this.displayEvents();
            }, this.timeEventAlertFade);
        }, this.timeEventAlertSlide);
    }
    registerEvent(event) {
        if (!event) {
            return;
        }
        const originalEventIndex = this.events.findIndex((x) => x.eventType === event.eventType);
        if (originalEventIndex === -1) {
            this.currentEventIndex = this.events.push(event) - 1;
        }
        else {
            let newEventIndex;
            if (originalEventIndex > this.currentEventIndex) {
                this.events.splice(originalEventIndex, 1);
                newEventIndex = this.currentEventIndex === this.events.length - 1 ? 0 : this.currentEventIndex + 1;
                this.events.splice(newEventIndex, 0, event);
            }
            else if (originalEventIndex < this.currentEventIndex) {
                this.events.splice(originalEventIndex, 1);
                newEventIndex = this.currentEventIndex - 1 === 0 ? this.events.length - 1 : this.currentEventIndex - 2;
                this.events.splice(newEventIndex, 0, event);
            }
            else {
                this.events.splice(originalEventIndex, 1, event);
                newEventIndex = originalEventIndex;
            }
            this.currentEventIndex = newEventIndex;
        }
    }
    registerEvents(events) {
        if (events) {
            events.forEach((event) => this.registerEvent(event));
        }
    }
    calculateNextEventIndex() {
        return this.currentEventIndex === this.events.length - 1 ? 0 : this.currentEventIndex + 1;
    }
    hideElement(element) {
        if (element) {
            element.style.opacity = '0';
        }
    }
    revealElement(element) {
        if (element) {
            element.style.opacity = '1';
        }
    }
}
StreamEventFeed.SInit = (() => {
    StreamEventFeed.prototype.timeEventDisplay = 10000;
    StreamEventFeed.prototype.timeEventAlertSlide = 750;
    StreamEventFeed.prototype.timeEventAlertFade = 2000;
    StreamEventFeed.prototype.currentEventIndex = -1;
    StreamEventFeed.prototype.events = [];
})();

class SubscriptionEvent extends StreamEvent {
    constructor(name, amount) {
        super(StreamEventType.Subscription);
        this.name = name ? name : this.name;
        this.amount = amount && amount > 0 ? amount : this.amount;
        this.html = this.getHtml();
    }
    get isValid() {
        return !!this.html && !!this.name && !!this.amount && this.amount > 0;
    }
    getHtml() {
        const iconCss = StreamEvent.lookupIconCss(this.eventType);
        const subAmount = this.getSubAmountString();
        if (!!iconCss && !!this.name && !!subAmount) {
            const iconHtml = `<i class="bar-icon ${iconCss}"></i>`;
            const spanHtml = `<span class="bar-text">${this.name} ${this.getSubAmountString()}</span>`;
            const html = ` ${iconHtml}${spanHtml}`;
            return html;
        }
        return null;
    }
    getSubAmountString() {
        if (!!this.amount && this.amount > 0) {
            return `X${this.amount.toString()}`;
        }
        else {
            return '';
        }
    }
}
SubscriptionEvent.SInit = (() => {
    SubscriptionEvent.prototype.name = null;
    SubscriptionEvent.prototype.amount = 0;
    SubscriptionEvent.prototype.html = null;
})();

let timeEventDisplay;
let timeEventAlertSlide;
let timeEventAlertFade;
let streamEventFeed;
window.addEventListener('onEventReceived', function (obj) {
    const listener = obj['detail']['listener'];
    const event = obj['detail']['event'];
    switch (listener) {
        case 'follower-latest':
            streamEventFeed.handleEventAlert(new FollowEvent(event.name));
            break;
    }
});
window.addEventListener('onWidgetLoad', function (obj) {
    const data = obj['detail']['session']['data'];
    const fieldData = obj['detail']['fieldData'];
    if (isNaN(fieldData.eventCycleDisplayTime) || fieldData.eventCycleDisplayTime < 0) {
        throw new Error(`onWidgetLoad::Field data parameter 'eventCycleDisplayTime' has to be a positive number.`);
    }
    if (isNaN(fieldData.eventAlertSlideTime) || fieldData.eventAlertSlideTime < 0) {
        throw new Error(`onWidgetLoad::Field data parameter 'eventAlertSlideTime' has to be a positive number.`);
    }
    if (isNaN(fieldData.eventAlertFadeTime) || fieldData.eventAlertFadeTime < 0) {
        throw new Error(`onWidgetLoad::Field data parameter 'eventAlertFadeTime' has to be a positive number.`);
    }
    timeEventDisplay = fieldData.eventCycleDisplayTime * 1000;
    timeEventAlertSlide = fieldData.eventAlertSlideTime * 1000;
    timeEventAlertFade = fieldData.eventAlertFadeTime * 1000;
    const followEventData = data['follower-latest'];
    const subscriptionEventData = data['subscriber-latest'];
    const cheerEventData = data['cheer-latest'];
    const latestFollowEvent = new FollowEvent(followEventData.name);
    const latestSubscriptionEvent = new SubscriptionEvent(subscriptionEventData.name, subscriptionEventData.amount);
    const latestCheerEvent = new CheerEvent(cheerEventData.name, cheerEventData.amount);
    const events = [];
    if (latestFollowEvent.isValid) {
        events.push(latestFollowEvent);
    }
    if (latestSubscriptionEvent.isValid) {
        events.push(latestSubscriptionEvent);
    }
    if (latestCheerEvent.isValid) {
        events.push(latestCheerEvent);
    }
    streamEventFeed = new StreamEventFeed({
        timeEventAlertFade,
        timeEventAlertSlide,
        timeEventDisplay
    });
    streamEventFeed.registerEvents(events);
    streamEventFeed.displayEvents();
});
