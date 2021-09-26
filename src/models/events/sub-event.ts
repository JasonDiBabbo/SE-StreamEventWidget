import { FieldKeys, FieldStore } from '@utilities';

import { StreamEvent } from './stream-event';
import { StreamEventType } from './stream-event-type';
import { SubTier } from './sub-tier';

export class SubEvent extends StreamEvent {
    public alertSound: string;

    public html: string;

    constructor(public name: string, public amount: number, public tier: SubTier) {
        super(StreamEventType.Subscription);

        if (!name) {
            throw new Error(`Parameter 'name' cannot be null, empty or undefined..`);
        }

        if (amount < 1) {
            throw new Error(`Parameter 'amount' cannot be less than 1.`);
        }

        if (!tier) {
            throw new Error(`Parameter 'tier' cannot be null, empty or undefined.`);
        }

        this.html = this.generateHtml();
        this.alertSound = FieldStore.Get<string>(FieldKeys.SubAlertSound);
    }

    private generateHtml(): string {
        const subAmount = `X${this.amount.toString()}`;

        let iconHtml: string;

        if (this.tier === 'prime') {
            iconHtml = `<svg class="slide-icon" viewBox="0 0 200.9 124.26">
            <path d="M187.63,120.42H13.27c-5.1,0-9.22-4.14-9.2-9.24L4.4,22.26c0.01-1.85,2.22-2.81,3.58-1.55L45.17,55.4
                c0.84,0.78,2.15,0.76,2.96-0.06L98.18,4.78c1.25-1.26,3.28-1.26,4.53,0l49.57,50.07c1.08,1.09,2.83,1.12,3.95,0.08l35.5-33.12
                c1.81-1.69,4.76-0.41,4.77,2.06l0.33,87.3C196.85,116.28,192.73,120.42,187.63,120.42z"/>
            </svg>`;
        } else {
            iconHtml = `<i class="slide-icon fas fa-star"></i>`;
        }

        const textHtml = `<span class="slide-text">${this.name} ${subAmount}</span>`;
        const html = ` ${iconHtml}${textHtml}`;

        return html;
    }
}
