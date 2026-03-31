import Dexie, { type Table } from 'dexie';

export interface Message {
  id?: number;
  role: 'user' | 'assistant' | 'system' | 'critic';
  content: string;
  timestamp: number;
}

export interface TruthVector {
  id?: number;
  query: string;
  sourceUrl: string;
  markdown: string;
  timestamp: number;
}

export class SovereignDatabase extends Dexie {
  messages!: Table<Message>;
  truthVectors!: Table<TruthVector>;

  constructor() {
    super('SovereignStudioV6');
    this.version(1).stores({
      messages: '++id, role, timestamp',
      truthVectors: '++id, query, timestamp'
    });
  }
}

export const sdb = new SovereignDatabase();
