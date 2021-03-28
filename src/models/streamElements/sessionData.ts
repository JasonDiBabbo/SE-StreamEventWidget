import { SubTier } from '../events/subTier';

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
