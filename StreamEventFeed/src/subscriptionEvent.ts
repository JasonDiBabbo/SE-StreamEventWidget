import { StreamEvent } from './streamEvent';
import { StreamEventType } from './streamEventType';

export class SubscriptionEvent extends StreamEvent {
    public get isValid(): boolean {
        return !!this.html && !!this.name && !!this.amount && this.amount > 0;
    }

    public html: string;

    public name: string;

    public amount: number;

    constructor(name: string, amount: number) {
        super(StreamEventType.Subscription);

        this.name = name ? name : this.name;
        this.amount = amount && amount > 0 ? amount : this.amount;
        
        this.html = this.getHtml();
    }

    protected static SInit = (() => {
        SubscriptionEvent.prototype.name = null;
        SubscriptionEvent.prototype.amount = 0;
        SubscriptionEvent.prototype.html = null;
    })();

    private getHtml(): string {
        const iconCss = StreamEvent.lookupIconCss(this.eventType);
        const subAmount = this.getSubAmountString();

        if (!!iconCss && !!this.name && !!subAmount) {
            const iconHtml = `<i class="bar-icon ${iconCss}"></i>`;
            const spanHtml = `<span class="bar-text">${this.name} ${this.getSubAmountString()}</span>`;
            const html = ` ${iconHtml}${spanHtml}`;

            return html;
        }

        return null;
    }

    private getSubAmountString(): string {
        if (!!this.amount && this.amount > 0) {
            return `X${this.amount.toString()}`;
        } else {
            return '';
        }
    }
}