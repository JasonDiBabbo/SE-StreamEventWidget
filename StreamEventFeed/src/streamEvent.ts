import { StreamEventType } from './streamEventType';

export abstract class StreamEvent {
    public abstract get isValid(): boolean;

    public abstract html: string;

    constructor(public eventType: StreamEventType) { }

    public static lookupIconCss(eventType: StreamEventType): string {
        let iconCss = null;

        switch (eventType) {
            case StreamEventType.Follow:
                iconCss = 'fas fa-heart';
                break;
            case StreamEventType.Subscription:
                iconCss = 'fas fa-star';
                break;
            default:
                break;
        }

        return iconCss;
    }
}
