import { ImageResponse } from 'next/og';
import { fetchLatestArticles } from '../../../lib/homeData';

export const runtime = 'edge';
export const alt = 'Boluwatife Adeoye - Article';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }) {
  // Fetch post data
  const allPosts = await fetchLatestArticles(100).catch(() => []);
  const post = allPosts.find((p) => p.slug === params.slug);
  const title = post?.title || "Engineering & Strategy";
  const category = post?.meta?.category || "Editorial";

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#020617',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Background Gradient/Noise Simulation */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-20%',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />

        {/* Header: Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: 'serif',
          }}>BA</div>
          <div style={{ color: '#94a3b8', fontSize: '24px', fontFamily: 'sans-serif', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Boluwatife Adeoye
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px' }}>
          <div style={{
            padding: '8px 24px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50px',
            color: '#fbbf24',
            fontSize: '18px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            width: 'fit-content',
          }}>
            {category}
          </div>
          <div style={{
            fontSize: '72px',
            fontFamily: 'serif',
            color: 'white',
            lineHeight: 1.1,
            fontWeight: 600,
            textShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}>
            {title}
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          width: '100%', 
          borderTop: '2px solid rgba(255,255,255,0.1)', 
          paddingTop: '30px',
          display: 'flex', 
          justifyContent: 'space-between',
          color: '#64748b',
          fontSize: '20px',
          fontFamily: 'sans-serif'
        }}>
          <span>boluadeoye.com.ng</span>
          <span>Read time: {post?.readTime || "5 min"}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
