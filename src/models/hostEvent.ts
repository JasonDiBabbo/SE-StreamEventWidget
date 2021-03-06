import { StreamEvent } from './streamEvent';
import { StreamEventType } from './streamEventType';

export class HostEvent extends StreamEvent {
    public get isValid(): boolean {
        return !!this.html && !!this.name && !!this.amount && this.amount > 0;
    }

    public html: string;

    public name: string;

    public amount: number;

    constructor(name: string, amount: number) {
        super(StreamEventType.Host);

        this.name = name ? name : this.name;
        this.amount = amount && amount > 0 ? amount : this.amount;

        this.html = this.getHTML();
    }

    protected static SInit = (() => {
        HostEvent.prototype.name = null;
        HostEvent.prototype.amount = 0;
        HostEvent.prototype.html = null;
    })();


    private getHTML(): string {
        const iconCSS = StreamEvent.lookupIconCSS(this.eventType);
        const hostAmount = this.getHostAmountString();

        if (!!iconCSS && !!this.name) {
            const iconHtml = `<i class="bar-icon ${iconCSS}"></i>`;
            const spanHtml = `<span class="bar-text">${this.name} ${hostAmount}</span>`;
            const html = ` ${iconHtml}${spanHtml}`;

            return html;
        }

        return null;
    }

    private getHostAmountString(): string {
        if (!!this.amount && this.amount > 0) {
            return `X${this.amount.toString()}`;
        }

        return '';
    }
}