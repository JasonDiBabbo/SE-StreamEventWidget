import { StreamEvent } from './streamEvent';
import { StreamEventType } from './streamEventType';

export class SubEvent extends StreamEvent {
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

        this.html = this.getHTML();
    }

    protected static SInit = (() => {
        SubEvent.prototype.name = null;
        SubEvent.prototype.amount = 0;
        SubEvent.prototype.html = null;
    })();

    private getHTML(): string {
        const iconCSS = StreamEvent.lookupIconCSS(this.eventType);
        const subAmount = this.getSubAmountString();

        if (!!iconCSS && !!this.name) {
            const iconHtml = `<i class="slide-icon ${iconCSS}"></i>`;
            const spanHtml = `<span class="slide-text">${this.name} ${subAmount}</span>`;
            const html = ` ${iconHtml}${spanHtml}`;

            return html;
        }

        return null;
    }

    private getSubAmountString(): string {
        if (!!this.amount && this.amount > 1) {
            return `X${this.amount.toString()}`;
        }

        return '';
    }
}
