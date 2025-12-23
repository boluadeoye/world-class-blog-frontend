import { ImageResponse } from 'next/og';
import { fetchLatestArticles } from '../../../../lib/homeData';

export const runtime = 'edge';
export const alt = 'Article Cover';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }) {
  const allPosts = await fetchLatestArticles(100).catch(() => []);
  const post = allPosts.find((p) => p.slug === params.slug);
  const title = post?.title || "Engineering & Strategy";
  const category = post?.meta?.category || "Article";
  let coverImage = post?.meta?.cover || post?.cover_image_url;
  if (coverImage && coverImage.startsWith("/")) {
    coverImage = `https://boluadeoye.com.ng${coverImage}`;
  }

  return new ImageResponse(
    (
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#020617', position: 'relative' }}>
        {coverImage ? (
          <img src={coverImage} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
        ) : (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' }} />
        )}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, #000000 10%, transparent 100%)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', padding: '60px', zIndex: 10 }}>
          <div style={{ backgroundColor: '#f59e0b', color: '#000', padding: '10px 24px', borderRadius: '50px', fontSize: '20px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px', width: 'fit-content', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            {category}
          </div>
          <div style={{ fontSize: '72px', fontFamily: 'serif', color: 'white', lineHeight: 1.1, fontWeight: 900, textShadow: '0 4px 30px rgba(0,0,0,0.9)', maxWidth: '90%', marginBottom: '40px' }}>
            {title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderTop: '2px solid rgba(255,255,255,0.3)', paddingTop: '30px', width: '100%' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', color: '#000' }}>BA</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: '#fff', fontSize: '24px', fontWeight: 700 }}>Boluwatife Adeoye</div>
              <div style={{ color: '#cbd5e1', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1px' }}>Senior Full-Stack Engineer</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
