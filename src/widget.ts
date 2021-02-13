import { StreamEventFeed } from '@components';
import {
    CheerEvent,
    FollowEvent,
    GiftedSubscriptionEvent,
    HostEvent,
    RaidEvent,
    StreamEvent,
    SubscriptionEvent,
} from '@models';
import { FieldKeys, FieldStore, Time } from '@utilities';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare const SE_API: any;
/* eslint-enable @typescript-eslint/no-explicit-any */

// An array of events that can come to the widget even though the queue may be on hold
const skippableEvents = ['bot:counter', 'event:test', 'event:skip', 'message'];
const canSkipEvent: (obj: unknown) => boolean = (obj) => {
    try {
        const listener: string = obj['detail']['listener'];
        return skippableEvents.includes(listener);
    } catch {
        return false;
    }
};

let streamEventFeed: StreamEventFeed;

window.addEventListener('onEventReceived', function (obj) {
    if (canSkipEvent(obj)) {
        return;
    }

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
            streamEventFeed.handleEventAlert(
                new GiftedSubscriptionEvent(event.sender, event.amount)
            );
        } else if (event.gifted) {
            streamEventFeed.handleEventAlert(new GiftedSubscriptionEvent(event.sender));
        } else {
            streamEventFeed.handleEventAlert(new SubscriptionEvent(event.name, event.amount));
        }
    } else if (listener === 'host-latest') {
        streamEventFeed.handleEventAlert(new HostEvent(event.name, event.amount), false);
    } else if (listener === 'raid-latest') {
        streamEventFeed.handleEventAlert(new RaidEvent(event.name, event.amount), false);
    } else {
        SE_API.resumeQueue();
    }
});

window.addEventListener('onWidgetLoad', function (obj) {
    const data = obj['detail']['session']['data'];
    const fieldData = obj['detail']['fieldData'];

    const eventCycleDisplayTime = Time.toMilliseconds(fieldData.eventCycleDisplayTime);
    const eventAlertDisplayTime = Time.toMilliseconds(fieldData.eventAlertDisplayTime);
    const eventAlertSlideTime = Time.toMilliseconds(fieldData.eventAlertSlideTime);
    const eventAlertFadeTime = Time.toMilliseconds(fieldData.eventAlertFadeTime);

    FieldStore.Set(FieldKeys.EventCycleDisplayTime, eventCycleDisplayTime);
    FieldStore.Set(FieldKeys.EventAlertDisplayTime, eventAlertDisplayTime);
    FieldStore.Set(FieldKeys.EventAlertSlideTime, eventAlertSlideTime);
    FieldStore.Set(FieldKeys.EventAlertFadeTime, eventAlertFadeTime);

    const followEventData = data['follower-latest'];
    const subscriptionEventData = data['subscriber-latest'];
    const giftedSubscriptionData = data['subscriber-gifted-latest'];
    const cheerEventData = data['cheer-latest'];

    const latestFollowEvent: FollowEvent = new FollowEvent(followEventData.name);
    const latestSubscriptionEvent: SubscriptionEvent = new SubscriptionEvent(
        subscriptionEventData.name,
        subscriptionEventData.amount
    );
    const latestGiftedSubscriptionEvent = new GiftedSubscriptionEvent(
        giftedSubscriptionData.sender,
        giftedSubscriptionData.amount
    );
    const latestCheerEvent: CheerEvent = new CheerEvent(cheerEventData.name, cheerEventData.amount);

    const events: StreamEvent[] = [];

    if (latestFollowEvent.isValid) {
        events.push(latestFollowEvent);
    }

    if (latestSubscriptionEvent.isValid) {
        events.push(latestSubscriptionEvent);
    }

    if (latestGiftedSubscriptionEvent.isValid) {
        events.push(latestGiftedSubscriptionEvent);
    }

    if (latestCheerEvent.isValid) {
        events.push(latestCheerEvent);
    }

    streamEventFeed = new StreamEventFeed();

    streamEventFeed.registerEvents(events);
    streamEventFeed.displayEvents();
});
