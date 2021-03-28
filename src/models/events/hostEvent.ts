import { FieldKeys, FieldStore } from '@utilities';

import { StreamEvent } from './streamEvent';
import { StreamEventType } from './streamEventType';

export class HostEvent extends StreamEvent {
    public alertSound: string;

    public html: string;

    constructor(public name: string, public amount: number) {
        super(StreamEventType.Host);

        if (!name) {
            throw new Error(`Parameter 'name' cannot be null or empty.`);
        }

        if (amount < 1) {
            throw new Error(`Parameter 'amount' cannot be less than 1.`);
        }

        this.html = this.generateHtml();
        this.alertSound = FieldStore.Get<string>(FieldKeys.HostAlertSound);
    }

    private generateHtml(): string {
        const hostAmount = `X${this.amount.toString()}`;
        const iconHtml = `<i class="slide-icon fas fa-desktop"></i>`;
        const textHtml = `<span class="slide-text">${this.name} ${hostAmount}</span>`;
        const html = ` ${iconHtml}${textHtml}`;

        return html;
    }
}
