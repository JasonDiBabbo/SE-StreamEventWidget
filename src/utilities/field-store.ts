import { FieldData } from '@models';

/**
 * The typed contract of a field data setting.
 */
interface FieldDataSetting {
    /**
     * The data type of the field data setting.
     */
    type: 'string' | 'number';

    /**
     * The string key of the field data setting.
     *
     * This corresponds to the key used in the 'widget.json' file.
     */
    objectKey: string;
}

/**
 * Predefined keys for getting and setting widget fields in the store
 */
export class FieldKeys {
    public static FeedAlertFadeTime = 'feedAlertFadeTime';
    public static FeedAlertDisplayTime = 'feedAlertDisplayTime';
    public static FeedAlertEnterTime = 'feedAlertEnterTime';
    public static FeedEventDisplayTime = 'feedEventDisplayTime';
    public static TierOneCheerAlertSound = 'tierOneCheerAlertSound';
    public static TierTwoCheerAlertSound = 'tierTwoCheerAlertSound';
    public static TierThreeCheerAlertSound = 'tierThreeCheerAlertSound';
    public static TierFourCheerAlertSound = 'tierFourCheerAlertSound';
    public static TierFiveCheerAlertSound = 'tierFiveCheerAlertSound';
    public static FollowAlertSound = 'followAlertSound';
    public static SubAlertSound = 'subAlertSound';
    public static GiftedSubAlertSound = 'giftedSubAlertSound';
    public static PrimeSubAlertSound = 'primeSubAlertSound';
    public static RaidAlertSound = 'raidAlertSound';
}

const fieldDataSettings: FieldDataSetting[] = [
    {
        objectKey: FieldKeys.FeedAlertFadeTime,
        type: 'number',
    },
    {
        objectKey: FieldKeys.FeedAlertDisplayTime,
        type: 'number',
    },
    {
        objectKey: FieldKeys.FeedAlertEnterTime,
        type: 'number',
    },
    {
        objectKey: FieldKeys.TierOneCheerAlertSound,
        type: 'string',
    },
    {
        objectKey: FieldKeys.TierTwoCheerAlertSound,
        type: 'string',
    },
    {
        objectKey: FieldKeys.TierThreeCheerAlertSound,
        type: 'string',
    },
    {
        objectKey: FieldKeys.TierFourCheerAlertSound,
        type: 'string',
    },
    {
        objectKey: FieldKeys.TierFiveCheerAlertSound,
        type: 'string',
    },
    {
        objectKey: FieldKeys.FeedEventDisplayTime,
        type: 'number',
    },
    {
        objectKey: FieldKeys.FollowAlertSound,
        type: 'string',
    },
    {
        objectKey: FieldKeys.GiftedSubAlertSound,
        type: 'string',
    },
    {
        objectKey: FieldKeys.RaidAlertSound,
        type: 'string',
    },
    {
        objectKey: FieldKeys.SubAlertSound,
        type: 'string',
    },
    {
        objectKey: FieldKeys.GiftedSubAlertSound,
        type: 'string',
    },
    {
        objectKey: FieldKeys.PrimeSubAlertSound,
        type: 'string',
    },
];

/**
 * A static data store for widget fields
 */
export class FieldStore {
    private static fieldData: { [key: string]: unknown } = {};

    /**
     * Initializes the field store with settings from the field data object.
     */
    public static Initialize(fieldData: FieldData): void {
        for (const setting of fieldDataSettings) {
            const settingExists = Object.prototype.hasOwnProperty.call(
                fieldData,
                setting.objectKey
            );

            if (!settingExists) {
                throw new Error(`Setting '${setting.objectKey}' not found in field data.`);
            }

            const settingValue = fieldData[setting.objectKey];
            const settingValueIsNullOrUndefined =
                settingValue === null || settingValue === undefined;

            if (settingValueIsNullOrUndefined) {
                throw new Error(`Setting '${setting.objectKey}' value is null or undefined.`);
            }

            switch (setting.type) {
                case 'number':
                    FieldStore.Set(setting.objectKey, fieldData[setting.objectKey] as number);
                    break;
                case 'string':
                default:
                    FieldStore.Set(setting.objectKey, fieldData[setting.objectKey] as string);
                    break;
            }
        }
    }

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
