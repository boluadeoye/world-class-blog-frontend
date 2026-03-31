import Dexie from 'dexie';

export class SovereignDatabase extends Dexie {
  constructor() {
    super('SovereignStudioV6');
    this.version(1).stores({
      messages: '++id, role, timestamp',
      truthVectors: '++id, query, timestamp'
    });
  }
}

export const sdb = new SovereignDatabase();
