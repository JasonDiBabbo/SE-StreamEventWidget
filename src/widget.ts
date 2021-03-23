import { StreamEventBar } from '@components';
import {
    CheerEvent,
    FieldData,
    FollowEvent,
    GiftedSubEvent,
    HostEvent,
    RaidEvent,
    SessionData,
    StreamElementsApi,
    StreamEvent,
    SubEvent,
} from '@models';
import { AlertService, EventService } from '@services';
import { FieldKeys, FieldStore, Time } from '@utilities';

declare const SE_API: StreamElementsApi;
const skippableEvents = ['bot:counter', 'event:test', 'event:skip', 'message'];
const canSkipEvent: (obj: unknown) => boolean = (obj) => {
    try {
        const listener: string = obj['detail']['listener'];
        return skippableEvents.includes(listener);
    } catch {
        return false;
    }
};

let eventService: EventService;
let alertService: AlertService;
let streamEventBar: StreamEventBar;

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
        streamEventBar.triggerAlert(new FollowEvent(event.name));
    } else if (listener === 'cheer-latest') {
        streamEventBar.triggerAlert(new CheerEvent(event.name, event.amount));
    } else if (listener === 'subscriber-latest') {
        if (event.gifted && event.isCommunityGift) {
            SE_API.resumeQueue();
        } else if (event.bulkGifted) {
            streamEventBar.triggerAlert(new GiftedSubEvent(event.sender, event.amount));
        } else if (event.gifted) {
            streamEventBar.triggerAlert(new GiftedSubEvent(event.sender));
        } else {
            streamEventBar.triggerAlert(new SubEvent(event.name, event.amount));
        }
    } else if (listener === 'host-latest') {
        streamEventBar.triggerAlert(new HostEvent(event.name, event.amount), false);
    } else if (listener === 'raid-latest') {
        streamEventBar.triggerAlert(new RaidEvent(event.name, event.amount), false);
    } else {
        SE_API.resumeQueue();
    }
});

window.addEventListener('onWidgetLoad', function (obj) {
    const data = obj['detail']['session']['data'];
    const fieldData: FieldData = obj['detail']['fieldData'];

    initializeFieldStore(fieldData);

    const events: StreamEvent[] = [
        getLatestFollowEvent(data),
        getLatestSubEvent(data),
        getLatestGiftedSubEvent(data),
        getLatestCheerEvent(data),
    ];

    eventService = new EventService();
    alertService = new AlertService();
    streamEventBar = new StreamEventBar(eventService, alertService);

    streamEventBar.addEvents(...events);
    streamEventBar.beginCycle();
});

const initializeFieldStore: (fieldData: FieldData) => void = function (fieldData: FieldData) {
    const eventCycleDisplayTime = Time.toMilliseconds(fieldData.eventCycleDisplayTime as number);
    const eventAlertDisplayTime = Time.toMilliseconds(fieldData.eventAlertDisplayTime as number);
    const eventAlertSlideTime = Time.toMilliseconds(fieldData.eventAlertSlideTime as number);
    const eventAlertFadeTime = Time.toMilliseconds(fieldData.eventAlertFadeTime as number);

    FieldStore.Set(FieldKeys.EventCycleDisplayTime, eventCycleDisplayTime);
    FieldStore.Set(FieldKeys.EventAlertDisplayTime, eventAlertDisplayTime);
    FieldStore.Set(FieldKeys.EventAlertSlideTime, eventAlertSlideTime);
    FieldStore.Set(FieldKeys.EventAlertFadeTime, eventAlertFadeTime);
};

const getLatestFollowEvent: (sessionData: SessionData) => FollowEvent = function (
    sessionData: SessionData
) {
    const followEventData = sessionData['follower-latest'];
    const latestFollowEvent: FollowEvent = new FollowEvent(followEventData.name);
    return latestFollowEvent;
};

const getLatestSubEvent: (sessionData: SessionData) => SubEvent = function (
    sessionData: SessionData
) {
    const subEventData = sessionData['subscriber-latest'];
    const latestSubEvent: SubEvent = new SubEvent(subEventData.name, subEventData.amount);
    return latestSubEvent;
};

const getLatestGiftedSubEvent: (sessionData: SessionData) => GiftedSubEvent = function (
    sessionData: SessionData
) {
    const giftedSubData = sessionData['subscriber-gifted-latest'];
    const latestGiftedSubEvent: GiftedSubEvent = new GiftedSubEvent(
        giftedSubData.name,
        giftedSubData.amount
    );
    return latestGiftedSubEvent;
};

const getLatestCheerEvent: (sessionData: SessionData) => CheerEvent = function (
    sessionData: SessionData
) {
    const cheerEventData = sessionData['cheer-latest'];
    const latestCheerEvent: CheerEvent = new CheerEvent(cheerEventData.name, cheerEventData.amount);
    return latestCheerEvent;
};
