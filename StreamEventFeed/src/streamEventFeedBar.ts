import { StreamEvent } from './streamEvent';
import { StreamEventType } from './streamEventType';

export class StreamEventFeedBar {
    private get bar(): HTMLElement {
        return document.querySelector('.bar');
    }

    public get currentSlide(): HTMLElement {
        const slides = this.bar.children;

        return slides[0] as HTMLElement;
    }

    public addSlide(slide: HTMLElement): void {
        this.bar.appendChild(slide);
    }

    public createEventAlertSlide(event: StreamEvent): HTMLElement {
        const content = document.createElement('div');
        content.classList.add('bar-content');
        content.innerHTML = event.html;

        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.appendChild(content);

        switch (event.eventType) {
            case StreamEventType.Cheer:
                break;
            case StreamEventType.Follow:
                slide.classList.add('follow-event-alert');
                break;
            case StreamEventType.Subscription:
                break;
            default:
                break;
        }

        return slide;
    }

    public resetSlideStyles(slide: HTMLElement): void {
        slide.classList.value = 'slide'
    }
}