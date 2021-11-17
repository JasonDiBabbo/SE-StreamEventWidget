import { EventFeed } from '@components';
import {
    CheerEvent,
    EventData,
    EventReceivedDetail,
    FollowEvent,
    GiftedSubEvent,
    RaidEvent,
    SessionData,
    StreamElementsApi,
    StreamEvent,
    SubEvent,
    WidgetLoadDetail,
} from '@models';
import { AudioService, EventService } from '@services';
import { FieldKeys, FieldStore, Time } from '@utilities';

declare const SE_API: StreamElementsApi;

export class StreamEventWidget {
    private readonly skippableEvents = ['bot:counter', 'event:test', 'event:skip', 'message'];

    private readonly window: Window;

    private readonly document: Document;

    private audioService: AudioService;

    private eventService: EventService;

    private eventFeed: EventFeed;

    constructor() {
        if (!globalThis.window) {
            throw new Error(`Global 'window' object was null or undefined.`);
        }

        if (!document) {
            throw new Error(`Global 'document' object was null or undefined.`);
        }

        this.window = globalThis.window;
        this.document = document;
        this.setupEventListeners();
    }

    private canSkipEvent(detail: EventReceivedDetail): boolean {
        return this.skippableEvents.includes(detail.listener);
    }

    private getLatestCheerEvent(sessionData: SessionData): CheerEvent {
        try {
            const eventData = sessionData['cheer-latest'];
            const event: CheerEvent = new CheerEvent(eventData.name, eventData.amount);
            return event;
        } catch {
            return null;
        }
    }

    private getLatestFollowEvent(sessionData: SessionData): FollowEvent {
        try {
            const eventData = sessionData['follower-latest'];
            const event: FollowEvent = new FollowEvent(eventData.name);
            return event;
        } catch {
            return null;
        }
    }

    private getLatestSubEvent(sessionData: SessionData): SubEvent {
        try {
            const eventData = sessionData['subscriber-latest'];
            const event =
                eventData.gifted && eventData.amount === 'gift'
                    ? new SubEvent(eventData.name, eventData.count, eventData.tier)
                    : new SubEvent(eventData.name, eventData.amount as number, eventData.tier);
            return event;
        } catch {
            return null;
        }
    }

    private handleNewCheerEvent(eventData: EventData): StreamEvent {
        return new CheerEvent(eventData.name, eventData.amount as number);
    }

    private handleNewFollowerEvent(eventData: EventData): StreamEvent {
        return new FollowEvent(eventData.name);
    }

    private handleRaidEvent(eventData: EventData): StreamEvent {
        return new RaidEvent(eventData.name, eventData.amount as number);
    }

    private handleNewSubscriberEvent(eventData: EventData): StreamEvent {
        const isResultOfGiftedSub = eventData.gifted && eventData.isCommunityGift;

        if (isResultOfGiftedSub) {
            // Subs that were the result of a gifting

            return null;
        } else if (eventData.bulkGifted) {
            // A user gifted multiple subs at once

            return new GiftedSubEvent(eventData.sender, eventData.amount as number);
        } else if (eventData.gifted) {
            // A user gifted a single sub

            return new GiftedSubEvent(eventData.sender);
        } else {
            // A user subscribed
            // i.e. Tier 1, 2, 3 or Prime

            return new SubEvent(eventData.name, eventData.amount as number, eventData.tier);
        }
    }

    private initializeAudio(): void {
        const audioElement = this.document.getElementById('alert-audio') as HTMLAudioElement;
        this.audioService = new AudioService(audioElement);
    }

    private initializeEvents(sessionData: SessionData): void {
        this.eventService = new EventService();

        const latestFollowEvent = this.getLatestFollowEvent(sessionData);
        const latestSubEvent = this.getLatestSubEvent(sessionData);
        const latestCheerEvent = this.getLatestCheerEvent(sessionData);

        if (latestFollowEvent) {
            this.eventService.registerEvent(latestFollowEvent);
        }

        if (latestSubEvent) {
            this.eventService.registerEvent(latestSubEvent);
        }

        if (latestCheerEvent) {
            this.eventService.registerEvent(latestCheerEvent);
        }
    }

    private onEventReceived(obj: CustomEvent): void {
        const detail = obj.detail as EventReceivedDetail;

        if (this.canSkipEvent(detail)) {
            return;
        }

        let streamEvent: StreamEvent;
        let persistEvent = true;

        switch (detail.listener) {
            case 'follower-latest':
                streamEvent = this.handleNewFollowerEvent(detail.event);
                break;
            case 'cheer-latest':
                streamEvent = this.handleNewCheerEvent(detail.event);
                break;
            case 'subscriber-latest':
                streamEvent = this.handleNewSubscriberEvent(detail.event);
                break;
            case 'raid-latest':
                streamEvent = this.handleRaidEvent(detail.event);
                persistEvent = false;
                break;
            default:
                break;
        }

        if (streamEvent) {
            if (persistEvent) {
                this.eventService.registerEvent(streamEvent);
            }

            this.eventFeed.triggerAlert(streamEvent);
            this.audioService.playAudio(streamEvent.alertSound);
        } else {
            SE_API.resumeQueue();
        }
    }

    private onWidgetLoad(obj: CustomEvent): void {
        const detail = obj.detail as WidgetLoadDetail;
        const sessionData = detail.session.data;
        const fieldData = detail.fieldData;

        FieldStore.Initialize(fieldData);

        this.initializeAudio();
        this.initializeEvents(sessionData);

        this.eventFeed = new EventFeed(this.eventService);
        this.eventFeed.start();
    }

    private setupEventListeners(): void {
        this.window.addEventListener('onEventReceived', (obj) =>
            this.onEventReceived(obj as CustomEvent)
        );
        this.window.addEventListener('onWidgetLoad', (obj) =>
            this.onWidgetLoad(obj as CustomEvent)
        );
    }
}

const streamEventWidget = new StreamEventWidget();
