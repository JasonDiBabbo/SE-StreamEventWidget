import { StreamEventBar } from '@components';
import {
    CheerEvent,
    EventReceivedDetail,
    FieldData,
    FollowEvent,
    GiftedSubEvent,
    HostEvent,
    RaidEvent,
    SessionData,
    StreamElementsApi,
    StreamEvent,
    SubEvent,
    WidgetLoadDetail,
} from '@models';
import { AlertService, EventService } from '@services';
import { FieldKeys, FieldStore, Time } from '@utilities';

declare const SE_API: StreamElementsApi;

class StreamEventWidget {
    private readonly skippableEvents = ['bot:counter', 'event:test', 'event:skip', 'message'];

    private alertService: AlertService;

    private eventService: EventService;

    private bar: StreamEventBar;

    constructor() {
        // TODO: Change services into static utility classes
        // TODO: That way we don't need to save it
    }

    public onEventReceived(detail: EventReceivedDetail): void {
        if (this.canSkipEvent(detail)) {
            return;
        }

        let streamEvent: StreamEvent;
        let persistEvent = true;

        if (detail.listener === 'follower-latest') {
            streamEvent = new FollowEvent(detail.event.name);
        } else if (detail.listener === 'cheer-latest') {
            streamEvent = new CheerEvent(detail.event.name, detail.event.amount as number);
        } else if (detail.listener === 'subscriber-latest') {
            const isResultOfGiftedSub = detail.event.gifted && detail.event.isCommunityGift;
            if (isResultOfGiftedSub) {
                // Do nothing SE_API.resumeQueue();
            } else if (detail.event.bulkGifted) {
                streamEvent = new GiftedSubEvent(
                    detail.event.sender,
                    detail.event.amount as number
                );
            } else if (detail.event.gifted) {
                streamEvent = new GiftedSubEvent(detail.event.sender);
            } else {
                streamEvent = new SubEvent(detail.event.name, detail.event.amount as number);
            }
        } else if (detail.listener === 'host-latest') {
            streamEvent = new HostEvent(detail.event.name, detail.event.amount as number);
            persistEvent = false;
        } else if (detail.listener === 'raid-latest') {
            streamEvent = new RaidEvent(detail.event.name, detail.event.amount as number);
            persistEvent = false;
        }

        if (streamEvent) {
            this.bar.triggerAlert(streamEvent, persistEvent);
        } else {
            SE_API.resumeQueue();
        }
    }

    public onWidgetLoad(detail: WidgetLoadDetail): void {
        const sessionData = detail.session.data;
        const fieldData = detail.fieldData;

        this.loadFieldData(fieldData);

        this.eventService = new EventService();
        this.alertService = new AlertService();
        this.bar = new StreamEventBar(this.eventService, this.alertService);
        this.loadInitialEvents(sessionData);

        this.bar.beginCycle();
    }

    private canSkipEvent(detail: EventReceivedDetail): boolean {
        return this.skippableEvents.includes(detail.listener);
    }

    private loadFieldData(fieldData: FieldData): void {
        const eventDisplayTime = Time.toMilliseconds(fieldData.eventDisplayTime as number);
        const alertDisplayTime = Time.toMilliseconds(fieldData.alertDisplayTime as number);
        const alertSlideTime = Time.toMilliseconds(fieldData.alertSlideTime as number);
        const alertFadeTime = Time.toMilliseconds(fieldData.alertFadeTime as number);

        FieldStore.Set(FieldKeys.EventDisplayTime, eventDisplayTime);
        FieldStore.Set(FieldKeys.AlertDisplayTime, alertDisplayTime);
        FieldStore.Set(FieldKeys.AlertSlideTime, alertSlideTime);
        FieldStore.Set(FieldKeys.AlertFadeTime, alertFadeTime);
    }

    private loadInitialEvents(sessionData: SessionData): void {
        const latestFollowEvent = this.getLatestFollowEvent(sessionData);
        const latestSubEvent = this.getLatestSubEvent(sessionData);
        const latestCheerEvent = this.getLatestCheerEvent(sessionData);

        this.bar.addEvents(latestFollowEvent, latestSubEvent, latestCheerEvent);
    }

    private getLatestCheerEvent(sessionData: SessionData): CheerEvent {
        const cheerEventData = sessionData['cheer-latest'];
        const latestCheerEvent: CheerEvent = new CheerEvent(
            cheerEventData.name,
            cheerEventData.amount
        );
        return latestCheerEvent;
    }

    private getLatestFollowEvent(sessionData: SessionData): FollowEvent {
        const followEventData = sessionData['follower-latest'];
        const latestFollowEvent: FollowEvent = new FollowEvent(followEventData.name);
        return latestFollowEvent;
    }

    private getLatestSubEvent(sessionData: SessionData): SubEvent {
        const subEventData = sessionData['subscriber-latest'];
        let latestSubEvent: SubEvent;

        if (subEventData.gifted && subEventData.amount === 'gift') {
            latestSubEvent = new SubEvent(subEventData.name, subEventData.count);
        } else {
            latestSubEvent = new SubEvent(subEventData.name, subEventData.amount as number);
        }

        return latestSubEvent;
    }
}

const streamEventWidget = new StreamEventWidget();

window.addEventListener('onEventReceived', function (obj) {
    streamEventWidget.onEventReceived((obj as CustomEvent).detail);
});

window.addEventListener('onWidgetLoad', function (obj) {
    streamEventWidget.onWidgetLoad((obj as CustomEvent).detail);
});
