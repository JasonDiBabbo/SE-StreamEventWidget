import { FieldData } from './fieldData';

/**
 * A typed contract of the detail of a 'onWidgetLoad' event.
 */
export interface WidgetLoadDetail {
    fieldData: FieldData;

    session: { data: { [index: string]: unknown } };
}
