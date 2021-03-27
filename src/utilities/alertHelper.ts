import { CheerEvent, Slide, SlideContent, StreamEvent, StreamEventType } from '@models';

/**
 * A helper class for working with alerts.
 */
export class AlertHelper {
    /**
     * Creates an alert slide.
     *
     * @param event The alert event.
     * @returns A slide HTML element.
     */
    public static createAlertSlide(event: StreamEvent): Slide {
        const content: SlideContent = document.createElement('div');
        content.classList.add('slide-content');
        content.innerHTML = event.html;

        const slide: Slide = document.createElement('div');
        slide.classList.add('slide');
        slide.appendChild(content);

        const alertCssClass = this.lookupAlertCssClass(event);
        slide.classList.add(alertCssClass);

        return slide;
    }

    /**
     * Looks up a corresponding CSS class for an event.
     *
     * @param event The alert event.
     * @returns A CSS class of the alert.
     */
    private static lookupAlertCssClass(event: StreamEvent): string {
        if (!event) {
            throw new Error(`Parameter 'event' cannot be null or undefined.`);
        }

        let cssClass: string;
        switch (event.type) {
            case StreamEventType.Cheer:
                cssClass = this.lookupCheerAlertCssClass((event as CheerEvent).amount);
                break;
            case StreamEventType.Follow:
                cssClass = 'follow-alert';
                break;
            case StreamEventType.GiftedSubscription:
                cssClass = 'gifted-sub-alert';
                break;
            case StreamEventType.Host:
                cssClass = 'host-alert';
                break;
            case StreamEventType.Raid:
                cssClass = 'raid-alert';
                break;
            case StreamEventType.Subscription:
                cssClass = 'sub-alert';
                break;
            default:
                break;
        }

        return cssClass;
    }

    /**
     * Looks up a corresponding CSS class for a cheer event.
     *
     * @param amount The amount of bits of the cheer.
     * @returns A CSS class of the alert.
     */
    private static lookupCheerAlertCssClass(amount: number): string {
        if (amount <= 0) {
            throw new Error(`Parameter 'amount' cannot be less than or equal to 0.`);
        }

        if (amount < 100) {
            return 'cheer-alert-tier-1';
        } else if (amount < 1000) {
            return 'cheer-alert-tier-2';
        } else if (amount < 5000) {
            return 'cheer-alert-tier-3';
        } else if (amount < 10000) {
            return 'cheer-alert-tier-4';
        } else {
            return 'cheer-alert-tier-5';
        }
    }
}
