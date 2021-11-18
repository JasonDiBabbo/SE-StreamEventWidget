import { SubTier } from './sub-tier';

export type SessionData = {
    'follower-latest': {
        name: string;
    };

    'subscriber-latest': {
        amount: 'gift' | number;
        count?: number;
        gifted?: boolean;
        name: string;
        tier: SubTier;
    };

    'cheer-latest': {
        amount: number;
        name: string;
    };
};
