import { StreamEvent } from './streamEvent';
import { StreamEventType } from './streamEventType';

export class FollowEvent extends StreamEvent {
    public get isValid(): boolean {
        return !!this.html && !!this.name;
    }

    public html: string;

    public name: string;

    constructor(name: string) {
        super(StreamEventType.Follow);

        this.name = name ? name : this.name;
        this.html = this.getHTML();
    }

    protected static SInit = (() => {
        FollowEvent.prototype.name = null;
        FollowEvent.prototype.html = null;
    })();

    private getHTML(): string {
        const iconCss = StreamEvent.lookupIconCSS(this.eventType);

        if (iconCss && this.name) {
            const iconHtml = `<i class="slide-icon ${iconCss}"></i>`;
            const spanHtml = `<span class="slide-text">${this.name}</span>`;
            const html = `${iconHtml}${spanHtml}`;

            return html;
        }

        return null;
    }
}
