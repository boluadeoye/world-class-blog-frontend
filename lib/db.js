const sql: any = Object.assign(async () => [], {
  query: async () => ({ rows: [] }),
});
export default sql;
export const pool = sql;
export { sql };
