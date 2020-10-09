import { CheerEvent } from './cheerEvent';
import { FollowEvent } from './followEvent';
import { StreamEvent } from './streamEvent';
import { StreamEventFeed } from './streamEventFeed';
import { SubscriptionEvent } from './subscriptionEvent'

let timeEventDisplay: number;
let timeEventAlertDisplay: number;
let timeEventAlertSlide: number;
let timeEventAlertFade: number;

let streamEventFeed: StreamEventFeed;

window.addEventListener('onEventReceived', function (obj) {
    const listener: string = obj['detail']['listener'];
    const event = obj['detail']['event'];

    switch (listener) {
        case 'follower-latest':
            streamEventFeed.handleEventAlert(new FollowEvent(event.name));
            break;
        case 'subscriber-latest':
            streamEventFeed.handleEventAlert(new SubscriptionEvent(event.name, event.amount));
            break;
        case 'cheer-latest':
            streamEventFeed.handleEventAlert(new CheerEvent(event.name, event.amount));
            break;
        default:
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

    if (isNaN(fieldData.eventAlertDisplayTime) || fieldData.eventAlertDisplayTime < 0) {
        throw new Error(`onWidgetLoad::Field data parameter 'eventAlertDisplayTime' has to be a positive number.`);
    }

    timeEventDisplay = fieldData.eventCycleDisplayTime * 1000;
    timeEventAlertSlide = fieldData.eventAlertSlideTime * 1000;
    timeEventAlertFade = fieldData.eventAlertFadeTime * 1000;
    timeEventAlertDisplay = fieldData.eventAlertDisplayTime * 1000;

    const followEventData = data['follower-latest'];
    const subscriptionEventData = data['subscriber-latest'];
    const cheerEventData = data['cheer-latest'];

    const latestFollowEvent: FollowEvent = new FollowEvent(followEventData.name);
    const latestSubscriptionEvent: SubscriptionEvent = new SubscriptionEvent(subscriptionEventData.name, subscriptionEventData.amount);
    const latestCheerEvent: CheerEvent = new CheerEvent(cheerEventData.name, cheerEventData.amount);

    const events: StreamEvent[] = [];

    if (latestFollowEvent.isValid) { events.push(latestFollowEvent); }
    if (latestSubscriptionEvent.isValid) { events.push(latestSubscriptionEvent); }
    if (latestCheerEvent.isValid) { events.push(latestCheerEvent); }

    streamEventFeed = new StreamEventFeed({
        timeEventAlertDisplay,
        timeEventAlertFade,
        timeEventAlertSlide,
        timeEventDisplay
    });

    streamEventFeed.registerEvents(events);
    streamEventFeed.displayEvents();
});