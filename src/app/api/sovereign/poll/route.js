import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('jobId');

  if (!jobId) return NextResponse.json({ error: 'MISSING_JOB_ID' }, { status: 400 });

  const job = global.sovereignJobs?.get(jobId);

  if (!job) {
    return NextResponse.json({ status: 'not_found' });
  }

  if (job.status === 'done' || job.status === 'error') {
    // Clean up memory
    global.sovereignJobs.delete(jobId);
  }

  return NextResponse.json(job);
}
