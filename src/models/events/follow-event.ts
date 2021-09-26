import { FieldStore, FieldKeys } from '@utilities';

import { StreamEvent } from './stream-event';
import { StreamEventType } from './stream-event-type';

export class FollowEvent extends StreamEvent {
    public alertSound: string;

    public html: string;

    constructor(public name: string) {
        super(StreamEventType.Follow);

        if (!name) {
            throw new Error(`Parameter 'name' cannot be null or empty.`);
        }

        this.html = this.generateHtml();
        this.alertSound = FieldStore.Get<string>(FieldKeys.FollowAlertSound);
    }

    private generateHtml(): string {
        const iconHtml = `<i class="slide-icon fas fa-heart"></i>`;
        const textHtml = `<span class="slide-text">${this.name}</span>`;
        const html = `${iconHtml}${textHtml}`;

        return html;
    }
}
