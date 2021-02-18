import { StreamEvent } from './streamEvent';
import { StreamEventType } from './streamEventType';

export class GiftedSubEvent extends StreamEvent {
    public get isValid(): boolean {
        return !!this.html && !!this.name;
    }

    public html: string;

    public name: string;

    public amount: number;

    constructor(name: string, amount?: number) {
        super(StreamEventType.GiftedSubscription);

        this.name = name ? name : this.name;
        this.amount = amount && amount > 0 ? amount : this.amount;

        this.html = this.getHTML();
    }

    protected static SInit = (() => {
        GiftedSubEvent.prototype.name = null;
        GiftedSubEvent.prototype.amount = 0;
        GiftedSubEvent.prototype.html = null;
    })();

    private getHTML(): string {
        const iconCSS = StreamEvent.lookupIconCSS(this.eventType);
        const giftedSubsAmount = this.getGiftedSubCountString();

        if (!!iconCSS && !!this.name) {
            const iconHtml = `<i class="bar-icon ${iconCSS}"></i>`;
            const spanHtml = `<span class="bar-text">${this.name} ${giftedSubsAmount}</span>`;
            const html = ` ${iconHtml}${spanHtml}`;

            return html;
        }

        return null;
    }

    private getGiftedSubCountString(): string {
        if (!!this.amount && this.amount > 1) {
            return `X${this.amount.toString()}`;
        }

        return '';
    }
}
