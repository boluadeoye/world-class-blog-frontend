import sql from './db';

export async function logEvent(type, identifier, details = {}, status = 'SUCCESS') {
  try {
    await sql`
      INSERT INTO system_logs (event_type, user_identifier, details, status)
      VALUES (${type}, ${identifier}, ${JSON.stringify(details)}, ${status})
    `;
  } catch (error) {
    console.error("LOGGING_FAILURE:", error);
  }
}
