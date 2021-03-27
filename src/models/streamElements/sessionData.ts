export type SessionData = {
    'follower-latest': {
        name: string;
    };

    'subscriber-latest': {
        amount: 'gift' | number;
        count?: number;
        gifted?: boolean;
        name: string;
        tier: '1000' | '2000' | '3000' | 'prime';
    };

    'cheer-latest': {
        amount: number;
        name: string;
    };
};
