import Dexie, { type Table } from 'dexie';
export interface Message { id?: number; role: string; content: string; timestamp: number; }
export class SovereignDatabase extends Dexie {
  messages!: Table<Message>;
  constructor() {
    super('SovereignStudioV6');
    this.version(1).stores({ messages: '++id, role, timestamp' });
  }
}
export const sdb = new SovereignDatabase();
