import { StreamEvent } from '@models';

/**
 * A service for providing managing stream events
 */
export class EventService {
    private events: StreamEvent[] = [];

    private eventIndex = -1;

    /**
     * Gets the current event
     *
     * @returns The current stream event
     */
    public getCurrentEvent(): StreamEvent {
        if (this.events.length > 0 && this.eventIndex >= 0) {
            return this.events[this.eventIndex];
        } else {
            throw new Error('There are no events.');
        }
    }

    /**
     * Gets the next event
     *
     * @returns The next stream event
     */
    public getNextEvent(): StreamEvent {
        if (this.events.length > 0 && this.eventIndex >= 0) {
            this.advanceEventIndex();
            return this.events[this.eventIndex];
        } else {
            throw new Error('There are no events.');
        }
    }

    /**
     * Registers a stream event with the service
     *
     * @param event The stream event
     */
    public registerEvent(event: StreamEvent): void {
        if (!event) {
            throw new Error(`Parameter 'event' cannot be null or undefined.`);
        }

        const index = this.events.findIndex((x) => x.type === event.type);

        if (index !== -1) {
            this.events.splice(index, 1);
        }

        this.events.push(event);
        this.eventIndex = this.events.length - 1;
    }

    /**
     * Advances the index of the current event
     */
    private advanceEventIndex(): void {
        if (this.eventIndex < 0) {
            this.eventIndex = 0;
        } else if (this.eventIndex + 1 === this.events.length) {
            this.eventIndex = 0;
        } else {
            this.eventIndex += 1;
        }
    }
}
