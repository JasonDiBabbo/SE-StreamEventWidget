/**
 * A typed contract of the details of a 'onWidgetLoad' event.
 */
export interface WidgetLoadDetails {
    fieldData: { [index: string]: string | number };

    session: { data: { [index: string]: unknown } };
}
