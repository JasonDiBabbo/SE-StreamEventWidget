import { Slide, SlideContent, StreamEvent } from '@models';

/**
 * A helper class for managing alerts
 */
export class AlertHelper {
    /**
     * Creates an alert slide
     *
     * @param event The alert event
     * @returns A slide HTML element
     */
    public static createAlertSlide(event: StreamEvent): Slide {
        const content: SlideContent = document.createElement('div');
        content.classList.add('slide-content');
        content.innerHTML = event.html;

        const slide: Slide = document.createElement('div');
        slide.classList.add('slide');
        slide.appendChild(content);

        slide.classList.add(event.alertCssClass);

        return slide;
    }
}
