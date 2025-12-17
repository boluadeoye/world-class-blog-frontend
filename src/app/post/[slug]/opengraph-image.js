import { ImageResponse } from 'next/og';
import { fetchLatestArticles } from '../../../lib/homeData';

export const runtime = 'edge';
export const alt = 'Article Preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }) {
  // 1. Fetch the specific post data
  const allPosts = await fetchLatestArticles(100).catch(() => []);
  const post = allPosts.find((p) => p.slug === params.slug);
  
  const title = post?.title || "Engineering & Strategy";
  const category = post?.meta?.category || "Editorial";
  // Use the post cover, or a fallback if missing
  const coverImage = post?.meta?.cover || post?.cover_image_url;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backgroundColor: '#020617',
          position: 'relative',
        }}
      >
        {/* === 1. THE COVER IMAGE (Background) === */}
        {coverImage && (
          <img
            src={coverImage}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        {/* === 2. CINEMATIC GRADIENT OVERLAY === */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)',
          }}
        />

        {/* === 3. BRANDING & TEXT === */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          padding: '60px', 
          zIndex: 10,
          gap: '20px'
        }}>
          {/* Category Chip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 24px',
            background: '#f59e0b', // Amber
            borderRadius: '50px',
            color: '#000',
            fontSize: '20px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            width: 'fit-content',
          }}>
            {category}
          </div>

          {/* Title */}
          <div style={{
            fontSize: '70px',
            fontFamily: 'serif',
            color: 'white',
            lineHeight: 1.1,
            fontWeight: 600,
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            maxWidth: '90%',
          }}>
            {title}
          </div>

          {/* Footer / Author */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            marginTop: '20px',
            borderTop: '2px solid rgba(255,255,255,0.3)',
            paddingTop: '30px',
            width: '100%'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#000'
            }}>BA</div>
            <div style={{ color: '#e2e8f0', fontSize: '28px', fontFamily: 'sans-serif', fontWeight: 500 }}>
              Boluwatife Adeoye
            </div>
            <div style={{ color: '#94a3b8', fontSize: '28px', fontFamily: 'sans-serif', marginLeft: 'auto' }}>
              boluadeoye.com.ng
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
