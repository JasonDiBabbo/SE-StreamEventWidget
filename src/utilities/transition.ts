/**
 * Utility methods for working with CSS transitions
 */
export class Transition {
    /**
     * Wraps a CSS property transition in a promise
     *
     * @param element
     * @param property
     * @param value
     */
    public static toPromise(element: HTMLElement, property: string, value: string): Promise<void> {
        if (!element || !property || !value) {
            return Promise.reject();
        }

        if (element.style[property] === value) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            const handler = (event: TransitionEvent) => {
                if (event.propertyName === property) {
                    element.removeEventListener('transitionend', handler);
                    resolve();
                }
            };

            element.addEventListener('transitionend', handler);
            element.style[property] = value;
        });
    }
}
