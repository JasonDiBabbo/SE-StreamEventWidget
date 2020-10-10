import { StreamEvent } from './streamEvent';
import { StreamEventType } from './streamEventType';

export class CheerEvent extends StreamEvent {
    public get isValid(): boolean {
        return !!this.html && !!this.name && !!this.amount && this.amount > 0;
    }

    public html: string;

    public name: string;

    public amount: number;

    constructor(name: string, amount: number) {
        super(StreamEventType.Cheer);

        this.name = name ? name : this.name;
        this.amount = amount && amount > 0 ? amount : this.amount;

        this.html = this.getHTML();
    }

    protected static SInit = (() => {
        CheerEvent.prototype.name = null;
        CheerEvent.prototype.amount = 0;
        CheerEvent.prototype.html = null;
    })();

    private getHTML(): string {
        const cheerAmount = this.getCheerAmountString();

        if (cheerAmount) {
            const iconHtml =
                `<svg class="bar-icon" viewBox="0 0 187.35 242.67">
                <path d="M221.2,159.15l-82.46-29.27a6.63,6.63,0,0,0-4.48,0L51.8,159.15a6.7,6.7,0,0,1-7.83-10l86.95-131a6.7,6.7,0,0,1,11.16,0l86.95,131A6.7,6.7,0,0,1,221.2,159.15Z" transform="translate(-42.83 -15.17)"/>
                <path d="M220.25,195.51l-80.09,61.24a6.7,6.7,0,0,1-7.32,0L52.75,195.51a6.69,6.69,0,0,1,1.42-11.92l80.09-28.44a6.75,6.75,0,0,1,4.48,0l80.09,28.44A6.69,6.69,0,0,1,220.25,195.51Z" transform="translate(-42.83 -15.17)"/>
             </svg>`;

            const spanHtml = `<span class="bar-text">${this.name} ${cheerAmount}</span>`;
            const html = `${iconHtml}${spanHtml}`;

            return html;
        }

        return null;
    }

    private getCheerAmountString(): string {
        if (typeof this.amount === 'number' && this.amount > 0) {
            return `X${this.amount.toString()}`;
        } else {
            return '';
        }
    }
}