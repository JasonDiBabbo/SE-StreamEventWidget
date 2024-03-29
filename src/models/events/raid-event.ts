import { FieldKeys, FieldStore } from '@utilities';

import { StreamEvent } from './stream-event';
import { StreamEventType } from './stream-event-type';

export class RaidEvent extends StreamEvent {
    public alertCssClass: string;

    public alertSound: string;

    public html: string;

    constructor(public name: string, public amount: number) {
        super(StreamEventType.Raid);

        if (!name) {
            throw new Error(`Parameter 'name' cannot be null or empty.`);
        }

        if (amount < 1) {
            throw new Error(`Parameter 'amount' cannot be less than 1.`);
        }

        this.html = this.generateHtml();
        this.alertCssClass = 'raid-alert';
        this.alertSound = FieldStore.Get<string>(FieldKeys.RaidAlertSound);
    }

    private generateHtml(): string {
        const hostAmount = `X${this.amount.toString()}`;
        const iconHtml = `<i class="slide-icon fas fa-users"></i>`;
        const textHtml = `<span class="slide-text">${this.name} ${hostAmount}</span>`;
        const html = ` ${iconHtml}${textHtml}`;

        return html;
    }
}
