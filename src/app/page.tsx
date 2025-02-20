import { load } from 'outstatic/server';
import BigMenu from '../components/BigMenu';
import BlueVert from '../components/BlueVert';
import Layout from '../components/Layout';
import Logo from '../components/Logo';
import SimpleSlider from '../components/SimpleSlider';
import markdownToHtml from '../lib/markdownToHtml';
import styles from '../styles/home.module.css';

export default async function Index() {
  const { content, allPosts, allProjects } = await getData();

  return (
    <Layout>
      <BlueVert height={`h-14`} />
      <div className="max-w-none mx-auto px-0">
        <section className="mt-16 mb-16 md:mb-12">
          <Logo />
          <h2 className={styles.subtitle}>
            Web developer, composer & sound designer
          </h2>
        </section>
        <BlueVert height={`h-8`} />
        <SimpleSlider />
        <BlueVert height={`h-14`} />
        <BigMenu />
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
