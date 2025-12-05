export default function Schema({ post }) {
  const siteUrl = "https://boluadeoye.com.ng";
  const personName = "Boluwatife Adeoye";
  
  // 1. The "Person" Schema (Establishes You as an Entity)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personName,
    "url": siteUrl,
    "jobTitle": "Software Engineer",
    "sameAs": [
      "https://github.com/yourusername",
      "https://linkedin.com/in/yourusername",
      "https://twitter.com/yourusername"
    ],
    "knowsAbout": ["Software Engineering", "React Server Components", "AI Integration", "System Architecture"]
  };

  // 2. The "Article" Schema (If on a post page)
  let articleSchema = null;
  if (post) {
    articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.meta?.cover || `${siteUrl}/og-image.jpg`,
      "author": {
        "@type": "Person",
        "name": personName
      },
      "datePublished": post.created_at,
      "dateModified": post.updated_at || post.created_at,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${siteUrl}/post/${post.slug}`
      }
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
    </>
  );
}
