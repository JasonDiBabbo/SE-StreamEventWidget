export type EventData = {
    amount: 'gift' | number;
    bulkGifted?: boolean;
    count?: number;
    gifted?: boolean;
    isCommunityGift?: boolean;
    name: string;
    sender?: string;
    tier: '1000' | '2000' | '3000' | 'prime';
};
