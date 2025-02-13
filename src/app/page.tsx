// import 'swiper/css';
import { load } from 'outstatic/server';
import BigMenu from '../components/BigMenu';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import Slider from 'react-slick';
import BlueVert from '../components/BlueVert';
import ContentGrid from '../components/ContentGrid';
import styles from '../components/home.module.css';
import Layout from '../components/Layout';
import SimpleSlider from '../components/SimpleSlider';
import markdownToHtml from '../lib/markdownToHtml';

export default async function Index() {
  const { content, allPosts, allProjects } = await getData();

  return (
    <Layout>
      <BlueVert height={`h-14`} />
      {/* <div className="max-w-6xl mx-auto px-5"> */}
      <div className="max-w-none mx-auto px-0">
        <section className="mt-16 mb-16 md:mb-12">
          {/* <div
            className="prose lg:prose-2xl home-intro"
            dangerouslySetInnerHTML={{ __html: content }}
          /> */}
          <h1 className={styles.logo}>
            Jeff <span className={styles.bump}>T</span> Byrd
          </h1>
          <h2 className={styles.subtitle}>
            Web developer, composer & sound designer
          </h2>
        </section>
        <BlueVert height={`h-6`} />

        <SimpleSlider />
        <BlueVert height={`h-14`} />
        <BigMenu />
        <div className="px-12">
          {allPosts.length > 0 && (
            <ContentGrid
              title="Posts"
              items={allPosts}
              collection="posts"
              priority
            />
          )}
          {allProjects.length > 0 && (
            <ContentGrid
              title="Projects"
              items={allProjects}
              collection="projects"
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

async function getData() {
  const db = await load();

  const page = await db
    .find({ collection: 'pages', slug: 'home' }, ['content'])
    .first();

  const content = await markdownToHtml(page.content);

  const allPosts = await db
    .find({ collection: 'posts' }, [
      'title',
      'publishedAt',
      'slug',
      'coverImage',
      'description',
      'tags',
    ])
    .sort({ publishedAt: -1 })
    .toArray();

  const allProjects = await db
    .find({ collection: 'projects' }, ['title', 'slug', 'coverImage'])
    .sort({ publishedAt: -1 })
    .toArray();

  return {
    content,
    allPosts,
    allProjects,
  };
}
