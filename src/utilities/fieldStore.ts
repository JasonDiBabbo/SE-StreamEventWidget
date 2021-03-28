/**
 * A static data store for widget fields.
 */
export class FieldStore {
    private static fieldData: { [key: string]: unknown } = {};

    /**
     * Gets a field value.
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
     * Sets a field value.
     *
     * @param key
     * @param value
     */
    public static Set(key: string, value: unknown): void {
        this.fieldData[key] = value;
    }
}

/**
 * Predefined keys for storing widget fields in the field store.
 */
export class FieldKeys {
    public static AlertFadeTime = 'AlertFadeTime';
    public static AlertDisplayTime = 'AlertDisplayTime';
    public static AlertSlideTime = 'AlertSlideTime';
    public static CheerAlertSound = 'CheerAlertSound';
    public static EventDisplayTime = 'EventDisplayTime';
    public static FollowAlertSound = 'FollowAlertSound';
    public static HostAlertSound = 'HostAlertSound';
    public static GiftedSubAlertSound = 'GiftedSubAlertSound';
    public static RaidAlertSound = 'RaidAlertSound';
    public static SubAlertSound = 'SubAlertSound';
    public static TipAlertSound = 'TipAlertSound';
}
