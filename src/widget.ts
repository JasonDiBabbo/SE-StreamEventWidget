import {
    CheerEvent,
    FollowEvent,
    GiftedSubEvent,
    // StreamElementsApi,
    StreamEvent,
    SubEvent,
} from '@models';
import { FieldKeys, FieldStore, Time } from '@utilities';

import { StreamEventBar } from '@components';
import { EventService } from '@services';

// declare const SE_API: StreamElementsApi;

// An array of events that can come to the widget even though the queue may be on hold
// const skippableEvents = ['bot:counter', 'event:test', 'event:skip', 'message'];
// const canSkipEvent: (obj: unknown) => boolean = (obj) => {
//     try {
//         const listener: string = obj['detail']['listener'];
//         return skippableEvents.includes(listener);
//     } catch {
//         return false;
//     }
// };

// let streamEventFeed: StreamEventFeed;

// window.addEventListener('onEventReceived', function (obj) {
// if (canSkipEvent(obj)) {
//     return;
// }
// const listener: string = obj['detail']['listener'];
// const event = obj['detail']['event'];
// if (skippableEvents.indexOf(listener) !== -1) {
//     return;
// }
// if (listener === 'follower-latest') {
//     streamEventFeed.handleEventAlert(new FollowEvent(event.name));
// } else if (listener === 'cheer-latest') {
//     streamEventFeed.handleEventAlert(new CheerEvent(event.name, event.amount));
// } else if (listener === 'subscriber-latest') {
//     if (event.gifted && event.isCommunityGift) {
//         SE_API.resumeQueue();
//     } else if (event.bulkGifted) {
//         streamEventFeed.handleEventAlert(new GiftedSubEvent(event.sender, event.amount));
//     } else if (event.gifted) {
//         streamEventFeed.handleEventAlert(new GiftedSubEvent(event.sender));
//     } else {
//         streamEventFeed.handleEventAlert(new SubEvent(event.name, event.amount));
//     }
// } else if (listener === 'host-latest') {
//     streamEventFeed.handleEventAlert(new HostEvent(event.name, event.amount), false);
// } else if (listener === 'raid-latest') {
//     streamEventFeed.handleEventAlert(new RaidEvent(event.name, event.amount), false);
// } else {
//     SE_API.resumeQueue();
// }
// });

window.addEventListener('onWidgetLoad', function (obj) {
    const data = obj['detail']['session']['data'];
    const fieldData = obj['detail']['fieldData'];

    const eventCycleDisplayTime = Time.toMilliseconds(fieldData.eventCycleDisplayTime);
    const eventAlertDisplayTime = Time.toMilliseconds(fieldData.eventAlertDisplayTime);
    const eventAlertSlideTime = Time.toMilliseconds(fieldData.eventAlertSlideTime);
    const eventAlertFadeTime = Time.toMilliseconds(fieldData.eventAlertFadeTime);

    // Event and alarm timings
    FieldStore.Set(FieldKeys.EventCycleDisplayTime, eventCycleDisplayTime);
    FieldStore.Set(FieldKeys.EventAlertDisplayTime, eventAlertDisplayTime);
    FieldStore.Set(FieldKeys.EventAlertSlideTime, eventAlertSlideTime);
    FieldStore.Set(FieldKeys.EventAlertFadeTime, eventAlertFadeTime);

    // Alert colors
    FieldStore.Set(FieldKeys.FollowAlertColor, fieldData.followAlertColor);
    FieldStore.Set(FieldKeys.SubAlertColor, fieldData.subAlertColor);
    FieldStore.Set(FieldKeys.GiftedSubAlertColor, fieldData.giftedSubAlertColor);
    FieldStore.Set(FieldKeys.TierOneCheerAlertColor, fieldData.tierOneCheerAlertColor);
    FieldStore.Set(FieldKeys.TierTwoCheerAlertColor, fieldData.tierTwoCheerAlertColor);
    FieldStore.Set(FieldKeys.TierThreeCheerAlertColor, fieldData.tierThreeCheerAlertColor);
    FieldStore.Set(FieldKeys.TierFourCheerAlertColor, fieldData.tierFourCheerAlertColor);
    FieldStore.Set(FieldKeys.TierFiveCheerAlertColor, fieldData.tierFiveCheerAlertColor);
    FieldStore.Set(FieldKeys.HostAlertColor, fieldData.hostAlertColor);
    FieldStore.Set(FieldKeys.RaidAlertColor, fieldData.raidAlertColor);

    const followEventData = data['follower-latest'];
    const subscriptionEventData = data['subscriber-latest'];
    const giftedSubscriptionData = data['subscriber-gifted-latest'];
    const cheerEventData = data['cheer-latest'];

    const latestFollowEvent: FollowEvent = new FollowEvent(followEventData.name);
    const latestSubscriptionEvent: SubEvent = new SubEvent(
        subscriptionEventData.name,
        subscriptionEventData.amount
    );
    const latestGiftedSubscriptionEvent = new GiftedSubEvent(
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

    const eventService = new EventService();
    const x = new StreamEventBar(eventService);
    x.addEvents(...events);
    x.beginCycle();

    // streamEventFeed = new StreamEventFeed();

    // streamEventFeed.registerEvents(events);
    // streamEventFeed.displayEvents();
});
