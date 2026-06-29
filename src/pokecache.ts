type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
    #cache = new Map<string, CacheEntry<unknown>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val,
        });
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);

        if (!entry) {
            return undefined;
        }

        const isExpired = Date.now() - entry.createdAt >= this.#interval;

        if (isExpired) {
            this.#cache.delete(key);
            return undefined;
        }

        return entry.val as T;
    }

    #reap(): void {
        const cutoff = Date.now() - this.#interval;

        for (const [key, entry] of this.#cache) {
            if (entry.createdAt <= cutoff) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }

    stopReapLoop(): void {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}