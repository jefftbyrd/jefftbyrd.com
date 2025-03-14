'use client';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react';
// import { absoluteUrl } from '@/lib/utils';
// import { Metadata } from 'next';
// import { load } from 'outstatic/server';
import HomeFeaturedProject from '../components/HomeFeaturedProject';
import HomeMenuItem from '../components/HomeMenuItem';
import Layout from '../components/Layout';
import Logo from '../components/Logo';

// import markdownToHtml from '../lib/markdownToHtml';

// export async function generateMetadata(): Promise<Metadata> {
//   const { page } = await getData();
//   /* @next-codemod-error 'params' is passed as an argument. Any asynchronous properties of 'props' must be awaited when accessed. */

//   if (!page) {
//     return {};
//   }

//   return {
//     title: page.title + ` | Jeff T Byrd`,
//     description: page.description,
//     openGraph: {
//       title: page.title,
//       description: page.description,
//       type: 'article',
//       url: absoluteUrl(`/${page.slug}`),
//       images: [
//         {
//           url: absoluteUrl(page?.coverImage || '/images/jefftbyrd.png'),
//           width: 1200,
//           height: 630,
//           alt: page.title,
//         },
//       ],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: page.title,
//       description: page.description,
//       images: absoluteUrl(page?.coverImage || '/images/jefftbyrd.png'),
//     },
//   };
// }

export default async function Index() {
  // const { page, content } = await getData();
  // const { content } = await getData();

  return (
    <Layout>
      <div className="max-w-none mx-auto px-0 grid">
        <div className="bg-(--color-foreground) w-full lg:w-xl lg:sticky top-0 -z-100 lg:h-6 h-3 justify-self-center" />
        <section className="md:mt-8 mt-2 lg:mb-16 md:mb-8 z-100 relative">
          <Logo />
        </section>
      </div>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-7 lg:gap-4 px-4 lg:px-24 align-items-end fixed lg:static bottom-0">
        <div className="flex flex-col gap-2 lg:gap-4 lg:mb-18 lg:col-span-4 justify-center">
          <motion.div
            initial={{ y: -1000 }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="w-0 h-0 border-x-[50px] border-x-transparent border-t-[65px] border-t-(--color-foreground) self-center lg:border-x-[100px] lg:border-t-[120px] xl:border-x-[150px] xl:border-t-[200px]"
          />
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
          <div className="grid grid-cols-3 gap-2 lg:gap-4 bottom-0 lg:w-1/3 lg:col-span-3 w-full lg:fixed">
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

//   // const page = await db
//   //   .find({ collection: 'pages', slug: 'home' }, [
//   //     'content',
//   //     'title',
//   //     'slug',
//   //     'coverImage',
//   //     'description',
//   //   ])
//   //   .first();

//   // const content = await markdownToHtml(page.content);

//   //   const allPosts = await db
//   //     .find({ collection: 'posts' }, [
//   //       'title',
//   //       'publishedAt',
//   //       'slug',
//   //       'coverImage',
//   //       'description',
//   //       'tags',
//   //     ])
//   //     .sort({ publishedAt: -1 })
//   //     .toArray();

//   //   const allProjects = await db
//   //     .find({ collection: 'projects' }, ['title', 'slug', 'coverImage'])
//   //     .sort({ publishedAt: -1 })
//   //     .toArray();

//   return {
//     // page,
//     // content,
//     // allPosts,
//     // allProjects,
//   };
// }
