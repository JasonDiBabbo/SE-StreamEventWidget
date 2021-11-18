import { FieldData } from './field-data';
import { SessionData } from './session-data';

/**
 * A typed contract of the detail of a 'onWidgetLoad' event.
 */
export interface WidgetLoadDetail {
    /**
     * The widget load event field data.
     */
    fieldData: FieldData;

    /**
     * The widget load session data.
     */
    session: { data: SessionData };
}
