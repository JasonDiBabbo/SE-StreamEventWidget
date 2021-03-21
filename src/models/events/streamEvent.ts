import { StreamEventType } from './streamEventType';

export abstract class StreamEvent {
    public abstract html: string;

    constructor(public eventType: StreamEventType) {}
}
