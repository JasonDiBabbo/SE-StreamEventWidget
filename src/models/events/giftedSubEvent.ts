import { StreamEvent } from './streamEvent';
import { StreamEventType } from './streamEventType';

export class GiftedSubEvent extends StreamEvent {
    public html: string;

    constructor(public name: string, public amount?: number) {
        super(StreamEventType.GiftedSubscription);

        if (!name) {
            throw new Error(`Parameter 'name' cannot be null or empty.`);
        }

        this.amount = amount ?? 1;
        this.html = this.generateHtml();
    }

    private generateHtml(): string {
        const giftedSubsAmount = `X${this.amount.toString()}`;
        const iconHtml = `<i class="slide-icon fas fa-gift"></i>`;
        const textHtml = `<span class="slide-text">${this.name} ${giftedSubsAmount}</span>`;
        const html = ` ${iconHtml}${textHtml}`;

        return html;
    }
}
