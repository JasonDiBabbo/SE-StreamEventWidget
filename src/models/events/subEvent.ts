import { StreamEvent } from './streamEvent';
import { StreamEventType } from './streamEventType';

export class SubEvent extends StreamEvent {
    public html: string;

    constructor(public name: string, public amount: number) {
        super(StreamEventType.Subscription);

        if (!name) {
            throw new Error(`Parameter 'name' cannot be null or empty.`);
        }

        if (amount < 1) {
            throw new Error(`Parameter 'amount' cannot be less than 1.`);
        }

        this.html = this.generateHtml();
    }

    private generateHtml(): string {
        const subAmount = `X${this.amount.toString()}`;
        const iconHtml = `<i class="slide-icon fas fa-star"></i>`;
        const textHtml = `<span class="slide-text">${this.name} ${subAmount}</span>`;
        const html = ` ${iconHtml}${textHtml}`;

        return html;
    }
}
