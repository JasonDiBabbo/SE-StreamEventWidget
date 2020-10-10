import { CheerEvent } from './cheerEvent';
import { StreamEvent } from './streamEvent';
import { StreamEventType } from './streamEventType';

export class StreamEventFeedBar {
    private get bar(): HTMLElement {
        return document.querySelector('.bar');
    }

    public get currentSlide(): HTMLElement {
        return this.slides[0] as HTMLElement;
    }

    public get slides(): HTMLCollection {
        return this.bar.children;
    }

    public addSlide(slide: HTMLElement): void {
        this.bar.appendChild(slide);
    }

    public animateSlideDownOut(slide: HTMLElement, requestAnimationReflow: boolean = false): void {
        if (requestAnimationReflow) {
            this.requestBrowserAnimation(slide);
        }
        
        slide.classList.add('offscreen-bottom');
    }

    public animateSlideUpIn(slide: HTMLElement, requestAnimationReflow: boolean = false): void {
        if (requestAnimationReflow) {
            this.requestBrowserAnimation(slide);
        }

        slide.classList.remove('offscreen-bottom');
    }

    public animateSlideUpOut(slide: HTMLElement, requestAnimationReflow: boolean = false): void {
        if (requestAnimationReflow) {
            this.requestBrowserAnimation(slide);
        }

        slide.classList.add('offscreen-top');
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
                slide.classList.add(this.getCheerEventAlertCSS(event as CheerEvent));
                break;
            case StreamEventType.Follow:
                slide.classList.add('follow-event-alert');
                break;
            case StreamEventType.Subscription:
                slide.classList.add('sub-event-alert');
                break;
            case StreamEventType.GiftedSubscription:
                slide.classList.add('gifted-sub-event-alert');
                break;
            default:
                break;
        }

        return slide;
    }

    public resetSlideStyles(slide: HTMLElement): void {
        slide.classList.value = 'slide'
    }

    private getCheerEventAlertCSS(event: CheerEvent): string {
        if (event.amount < 1) {
            return null;
        }

        if (event.amount < 100) {
            return 'cheer-event-alert-tier-1';
        } else if (event.amount < 1000) {
            return 'cheer-event-alert-tier-2';
        } else if (event.amount < 5000) {
            return 'cheer-event-alert-tier-3';
        } else if (event.amount < 10000) {
            return 'cheer-event-alert-tier-4';
        } else {
            return 'cheer-event-alert-tier-5';
        }
    }

    private requestBrowserAnimation(element: HTMLElement): void {
        void element.offsetWidth;
    }
}