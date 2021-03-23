export type SessionData = {
    'follower-latest': {
        name: string;
    };

    'subscriber-latest': {
        name: string;
        gifted?: boolean;
        amount: string | number;
        count?: number;
        tier: string;
    };

    'cheer-latest': {
        name: string;
        amount: number;
    };
};
