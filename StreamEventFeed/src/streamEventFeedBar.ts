export class StreamEventFeedBar {
    public get currentSlide(): Element {
        const bar = document.querySelector('.bar');
        const slides = bar.children;

        return slides[0];
    }
}