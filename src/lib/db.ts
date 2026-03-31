import Dexie, { type Table } from 'dexie';

export interface Message {
  id?: number;
  role: 'user' | 'assistant' | 'system' | 'critic';
  content: string;
  timestamp: number;
  model?: string;
}

export interface TruthVector {
  id?: number;
  query: string;
  sourceUrl: string;
  markdown: string;
  timestamp: number;
}

export interface ProjectState {
  id?: number;
  name: string;
  fileTree: Record<string, string>;
  updatedAt: number;
}

export class SovereignDatabase extends Dexie {
  messages!: Table<Message>;
  truthVectors!: Table<TruthVector>;
  projects!: Table<ProjectState>;

  constructor() {
    super('SovereignStudioV6');
    this.version(1).stores({
      messages: '++id, role, timestamp',
      truthVectors: '++id, query, timestamp',
      projects: '++id, name, updatedAt'
    });
  }
}

export const db = new SovereignDatabase();
