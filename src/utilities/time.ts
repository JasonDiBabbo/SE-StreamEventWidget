/**
 * Utility methods for working with time
 */
export class Time {
    /**
     * Converts seconds to milliseconds
     *
     * @param seconds
     * @returns milliseconds
     */
    public static toMilliseconds(seconds: number): number {
        return seconds * 1000;
    }

    /**
     * Converts milliseconds to seconds
     *
     * @param milliseconds
     * @returns seconds
     */
    public static toSeconds(milliseconds: number): number {
        return milliseconds / 1000;
    }
}
