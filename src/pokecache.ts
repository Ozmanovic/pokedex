import { ShallowLocations, Location } from "./pokeapi.js";

export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};
export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val: val,
    });
  }
get<T>(key: string): T | undefined {
  const entry = this.#cache.get(key);
  if (entry) {
    // Check if expired
    if (entry.createdAt < Date.now() - this.#interval) {
      this.#cache.delete(key); // Remove the expired entry immediately
      return undefined;
    }
    return entry.val;
  } else {
    return undefined;
  }
}

  #reap(): void {
    const currentCach = this.#cache
    currentCach.forEach((value, key) => {
      if (value.createdAt < (Date.now() - this.#interval)) {
        currentCach.delete(key)
      }
    });
  }
  #startReapLoop() {
    const reapIntervalID = setInterval(() => this.#reap(), this.#interval);
    this.#reapIntervalId = reapIntervalID
  }
  stopReapLoop() {
    clearInterval(this.#reapIntervalId)
    this.#reapIntervalId = undefined
  }
}
