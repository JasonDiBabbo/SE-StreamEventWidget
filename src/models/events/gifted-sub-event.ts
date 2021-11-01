import { FieldKeys, FieldStore } from '@utilities';

import { StreamEvent } from './stream-event';
import { StreamEventType } from './stream-event-type';

export class GiftedSubEvent extends StreamEvent {
    public alertCssClass: string;

    public alertSound: string;

    public html: string;

    constructor(public name: string, public amount?: number) {
        super(StreamEventType.GiftedSubscription);

        if (!name) {
            throw new Error(`Parameter 'name' cannot be null or empty.`);
        }

        if (!amount) {
            this.amount = 1;
        }

        this.html = this.generateHtml();
        this.alertCssClass = 'gifted-sub-alert';
        this.alertSound = FieldStore.Get<string>(FieldKeys.GiftedSubAlertSound);
    }

    private generateHtml(): string {
        const giftedSubsAmount = `X${this.amount.toString()}`;
        const iconHtml = `<i class="slide-icon fas fa-gift"></i>`;
        const textHtml = `<span class="slide-text">${this.name} ${giftedSubsAmount}</span>`;
        const html = ` ${iconHtml}${textHtml}`;

        return html;
    }
}
