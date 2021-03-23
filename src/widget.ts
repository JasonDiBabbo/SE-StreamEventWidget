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
        getLatestCheerEvent(data),
    ];

    eventService = new EventService();
    alertService = new AlertService();
    streamEventBar = new StreamEventBar(eventService, alertService);

    streamEventBar.addEvents(...events);
    streamEventBar.beginCycle();
});

const initializeFieldStore: (fieldData: FieldData) => void = function (fieldData: FieldData) {
    const eventDisplayTime = Time.toMilliseconds(fieldData.eventDisplayTime as number);
    const alertDisplayTime = Time.toMilliseconds(fieldData.alertDisplayTime as number);
    const alertSlideTime = Time.toMilliseconds(fieldData.alertSlideTime as number);
    const alertFadeTime = Time.toMilliseconds(fieldData.alertFadeTime as number);

    FieldStore.Set(FieldKeys.EventDisplayTime, eventDisplayTime);
    FieldStore.Set(FieldKeys.AlertDisplayTime, alertDisplayTime);
    FieldStore.Set(FieldKeys.AlertSlideTime, alertSlideTime);
    FieldStore.Set(FieldKeys.AlertFadeTime, alertFadeTime);
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
    let latestSubEvent: SubEvent;

    if (subEventData.gifted && typeof subEventData.amount === 'string') {
        latestSubEvent = new SubEvent(subEventData.name, subEventData.count);
    } else {
        latestSubEvent = new SubEvent(subEventData.name, subEventData.amount as number);
    }

    return latestSubEvent;
};

const getLatestCheerEvent: (sessionData: SessionData) => CheerEvent = function (
    sessionData: SessionData
) {
    const cheerEventData = sessionData['cheer-latest'];
    const latestCheerEvent: CheerEvent = new CheerEvent(cheerEventData.name, cheerEventData.amount);
    return latestCheerEvent;
};
