import { FieldStore, FieldKeys } from '@utilities';

import { StreamEvent } from './stream-event';
import { StreamEventType } from './stream-event-type';

/**
 * The class definition of a Twitch cheer event
 */
export class CheerEvent extends StreamEvent {
    public alertSound: string;

    public html: string;

    constructor(public name: string, public amount: number) {
        super(StreamEventType.Cheer);

        if (!name) {
            throw new Error(`Parameter 'name' cannot be null or empty.`);
        }

        if (amount < 1) {
            throw new Error(`Parameter 'amount' cannot be less than 1.`);
        }

        this.html = this.generateHtml();
        this.alertSound = FieldStore.Get<string>(FieldKeys.CheerAlertSound);
    }

    private generateHtml(): string {
        const cheerAmount = `X${this.amount.toString()}`;
        const iconHtml = `<svg class="slide-icon" viewBox="0 0 187.35 242.67">
                <path d="M221.2,159.15l-82.46-29.27a6.63,6.63,0,0,0-4.48,0L51.8,159.15a6.7,6.7,0,0,1-7.83-10l86.95-131a6.7,6.7,0,0,1,11.16,0l86.95,131A6.7,6.7,0,0,1,221.2,159.15Z" transform="translate(-42.83 -15.17)"/>
                <path d="M220.25,195.51l-80.09,61.24a6.7,6.7,0,0,1-7.32,0L52.75,195.51a6.69,6.69,0,0,1,1.42-11.92l80.09-28.44a6.75,6.75,0,0,1,4.48,0l80.09,28.44A6.69,6.69,0,0,1,220.25,195.51Z" transform="translate(-42.83 -15.17)"/>
            </svg>`;

        const textHtml = `<span class="slide-text">${this.name} ${cheerAmount}</span>`;
        const html = `${iconHtml}${textHtml}`;

        return html;
    }
}
