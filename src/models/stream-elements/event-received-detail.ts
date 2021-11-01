import { EventData } from './event-data';

/**
 * A contract for the detail of an 'onEventReceived' event.
 */
export interface EventReceivedDetail {
    event: EventData;

    listener: string;
}
