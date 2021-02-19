/**
 * Utility methods to ensure values meet various requirements
 */
export class Ensure {
    /**
     * Ensures that a value is not null or undefined
     *
     * @param value
     * @param name
     */
    public static IsNotNullOrUndefined(value: unknown, name: string = null): void {
        if (!value) {
            throw new Error(`Input value ${name ? "'" + name + "'" : ''} is null or undefined.`);
        }
    }

    /**
     * Ensures that a numeric value is greater than zero.
     *
     * @param value
     * @param name
     */
    public static IsGreaterThanZero(value: number, name: string = null): void {
        if (value <= 0) {
            throw new Error(
                `Input value ${name ? "'" + name + "'" : ''} is less than or equal to zero.`
            );
        }
    }
}
