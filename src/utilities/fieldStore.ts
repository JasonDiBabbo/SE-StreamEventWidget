/**
 * Offers a static data store for widget fields
 */
export class FieldStore {
    private static fieldData: { [key: string]: unknown } = {};

    /**
     * Gets a field value
     *
     * @param key
     */
    public static Get<T>(key: string): T {
        const exists = Object.prototype.hasOwnProperty.call(this.fieldData, key);

        if (!exists) {
            return undefined;
        }

        return this.fieldData[key] as T;
    }

    /**
     * Sets a field value
     *
     * @param key
     * @param value
     */
    public static Set(key: string, value: unknown): void {
        this.fieldData[key] = value;
    }
}

/**
 * Predefined keys for storing widget fields in the field store
 */
export class FieldKeys {
    public static EventCycleDisplayTime = 'EventCycleDisplayTime';
    public static EventAlertSlideTime = 'EventAlertSlideTime';
    public static EventAlertFadeTime = 'EventAlertFadeTime';
    public static EventAlertDisplayTime = 'EventAlertDisplayTime';
}
