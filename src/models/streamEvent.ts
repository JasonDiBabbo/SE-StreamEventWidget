import { StreamEventType } from './streamEventType';

export abstract class StreamEvent {
    public abstract get isValid(): boolean;

    public abstract html: string;

    constructor(public eventType: StreamEventType) { }

    public static lookupIconCSS(eventType: StreamEventType): string {
        let iconCSS = '';

        switch (eventType) {
            case StreamEventType.Follow:
                iconCSS = 'fas fa-heart';
                break;
            case StreamEventType.Subscription:
                iconCSS = 'fas fa-star';
                break;
            case StreamEventType.GiftedSubscription:
                iconCSS = 'fas fa-gift';
                break;
            case StreamEventType.Host:
                iconCSS = 'fas fa-desktop';
                break;
            case StreamEventType.Raid:
                iconCSS = 'fas fa-users';
                break;
            default:
                break;
        }

        return iconCSS;
    }
}
