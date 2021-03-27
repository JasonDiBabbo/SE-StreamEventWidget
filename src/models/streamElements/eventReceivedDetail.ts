import { EventData } from './eventData';

/**
 * A typed contract of the detail of a 'onEventReceived' event.
 */
export interface EventReceivedDetail {
    event: EventData;

    listener: string;
}
