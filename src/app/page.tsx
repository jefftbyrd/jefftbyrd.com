import { load } from 'outstatic/server';
import HomeFeaturedProject from '../components/HomeFeaturedProject';
import HomeMenuItem from '../components/HomeMenuItem';
import Layout from '../components/Layout';
import Logo from '../components/Logo';
import markdownToHtml from '../lib/markdownToHtml';

export default async function Index() {
  // const { content, allPosts, allProjects } = await getData();

  return (
    <Layout>
      <div
        className={`bg-(--color-foreground) w-full md:w-xl md:sticky top-0 -z-100 md:h-6 h-3 justify-self-center`}
      />
      <div className="max-w-none mx-auto px-0">
        <section className="md:mt-8 mt-2 lg:mb-16 md:mb-8">
          <Logo />
        </section>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-7 md:gap-4 px-4 md:px-24 align-items-end fixed bottom-0">
        <div className="flex flex-col gap-2 lg:mb-18 md:col-span-4 justify-center">
          <HomeFeaturedProject
            url={`/projects/earthsong/`}
            image={`/images/featured/earthsong-featured.webp`}
            delayTime={0}
          />
          <HomeFeaturedProject
            url={`/projects/vector/`}
            image={`/images/featured/vector-1.webp`}
            delayTime={0.2}
          />
        </div>

        <div className="">
          <div className="grid grid-cols-3 gap-2 md:gap-4 bottom-0 md:w-1/3 md:col-span-3 w-full">
            <HomeMenuItem title={`Projects`} delayTime={0} />
            <HomeMenuItem title={`About`} delayTime={0.2} />
            <HomeMenuItem title={`Contact`} delayTime={0.4} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// async function getData() {
//   const db = await load();

//   const page = await db
//     .find({ collection: 'pages', slug: 'home' }, ['content'])
//     .first();

//   const content = await markdownToHtml(page.content);

//   const allPosts = await db
//     .find({ collection: 'posts' }, [
//       'title',
//       'publishedAt',
//       'slug',
//       'coverImage',
//       'description',
//       'tags',
//     ])
//     .sort({ publishedAt: -1 })
//     .toArray();

//   const allProjects = await db
//     .find({ collection: 'projects' }, ['title', 'slug', 'coverImage'])
//     .sort({ publishedAt: -1 })
//     .toArray();

//   return {
//     content,
//     allPosts,
//     allProjects,
//   };
// }
