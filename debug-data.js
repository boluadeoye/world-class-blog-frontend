const { fetchLatestArticles, fetchFeaturedVideo } = require('./src/lib/homeData');
async function run() {
  try {
    const posts = await fetchLatestArticles(1);
    const video = await fetchFeaturedVideo();
    console.log("POST SAMPLE:", JSON.stringify(posts[0], null, 2));
    console.log("VIDEO SAMPLE:", JSON.stringify(video, null, 2));
  } catch (e) { console.error(e); }
}
run();
