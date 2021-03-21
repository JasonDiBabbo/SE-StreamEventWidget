import { StreamEvent } from './streamEvent';
import { StreamEventType } from './streamEventType';

export class FollowEvent extends StreamEvent {
    public html: string;

    constructor(public name: string) {
        super(StreamEventType.Follow);

        if (!name) {
            throw new Error(`Parameter 'name' cannot be null or empty.`);
        }

        this.html = this.generateHtml();
    }

    private generateHtml(): string {
        const iconHtml = `<i class="slide-icon fas fa-heart"></i>`;
        const textHtml = `<span class="slide-text">${this.name}</span>`;
        const html = `${iconHtml}${textHtml}`;

        return html;
    }
}
