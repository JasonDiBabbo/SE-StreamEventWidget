import { CheerEvent } from './cheerEvent';
import { FollowEvent } from './followEvent';
import { GiftedSubscriptionEvent } from './giftedSubscriptionEvent';
import { StreamEvent } from './streamEvent';
import { StreamEventFeed } from './streamEventFeed';
import { SubscriptionEvent } from './subscriptionEvent'

declare var SE_API: any;

// An array of events that can come to the widget even though the queue may be on hold
const skippableEvents =[
    'bot:counter',
    'event:test',
    'event:skip',
    'message'
];

let timeEventDisplay: number;
let timeEventAlertDisplay: number;
let timeEventAlertSlide: number;
let timeEventAlertFade: number;

let streamEventFeed: StreamEventFeed;

window.addEventListener('onEventReceived', function (obj) {
    const listener: string = obj['detail']['listener'];
    const event = obj['detail']['event'];

    if (skippableEvents.indexOf(listener) !== -1) {
        return;
    }

    if (listener === 'follower-latest') {
        streamEventFeed.handleEventAlert(new FollowEvent(event.name));
    } else if (listener === 'cheer-latest') {
        streamEventFeed.handleEventAlert(new CheerEvent(event.name, event.amount));
    } else if (listener === 'subscriber-latest') {
        if (event.gifted && event.isCommunityGift) {
            SE_API.resumeQueue();
        } else if (event.bulkGifted) {
            streamEventFeed.handleEventAlert(new GiftedSubscriptionEvent(event.sender, event.amount));
        } else if (event.gifted) {
            streamEventFeed.handleEventAlert(new GiftedSubscriptionEvent(event.sender));
        } else {
            streamEventFeed.handleEventAlert(new SubscriptionEvent(event.name, event.amount));
        }
    } else {
        SE_API.resumeQueue();
    }
});

window.addEventListener('onWidgetLoad', function (obj) {
    const data = obj['detail']['session']['data'];
    const fieldData = obj['detail']['fieldData'];

    timeEventDisplay = fieldData.eventCycleDisplayTime * 1000;
    timeEventAlertSlide = fieldData.eventAlertSlideTime * 1000;
    timeEventAlertFade = fieldData.eventAlertFadeTime * 1000;
    timeEventAlertDisplay = fieldData.eventAlertDisplayTime * 1000;

    const followEventData = data['follower-latest'];
    const subscriptionEventData = data['subscriber-latest'];
    const giftedSubscriptionData = data['subscriber-gifted-latest'];
    const cheerEventData = data['cheer-latest'];

    const latestFollowEvent: FollowEvent = new FollowEvent(followEventData.name);
    const latestSubscriptionEvent: SubscriptionEvent = new SubscriptionEvent(subscriptionEventData.name, subscriptionEventData.amount);
    const latestGiftedSubscriptionEvent = new GiftedSubscriptionEvent(giftedSubscriptionData.sender, giftedSubscriptionData.amount);
    const latestCheerEvent: CheerEvent = new CheerEvent(cheerEventData.name, cheerEventData.amount);

    const events: StreamEvent[] = [];

    if (latestFollowEvent.isValid) { events.push(latestFollowEvent); }
    if (latestSubscriptionEvent.isValid) { events.push(latestSubscriptionEvent); }
    if (latestGiftedSubscriptionEvent.isValid) { events.push(latestGiftedSubscriptionEvent); }
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