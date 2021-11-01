import { SubTier } from './sub-tier';

export type EventData = {
    amount: 'gift' | number;
    bulkGifted?: boolean;
    count?: number;
    gifted?: boolean;
    isCommunityGift?: boolean;
    name: string;
    sender?: string;
    tier: SubTier;
};
