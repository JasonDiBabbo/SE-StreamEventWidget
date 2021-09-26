import { StreamEventType } from './stream-event-type';

export abstract class StreamEvent {
    public abstract alertSound: string;

    public abstract html: string;

    constructor(public type: StreamEventType) {}
}
