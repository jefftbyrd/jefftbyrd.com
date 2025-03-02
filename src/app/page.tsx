'use client';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react';
// import { load } from 'outstatic/server';
import Layout from '../components/Layout';
import Logo from '../components/Logo';
import markdownToHtml from '../lib/markdownToHtml';
import styles from '../styles/home.module.css';

type PropsMenuItem = {
  delayTime: number;
  title: string;
};

type PropsFeaturedProject = {
  delayTime: number;
  url: string;
  image: string;
};

const MenuItem = (props: PropsMenuItem) => {
  return (
    <motion.div
      className={`${styles.menuItem} bg-(--color-foreground) pb-8 lg:text-[4.1em] text-6xl uppercase tracking-[-15px] md:tracking-[-28px]`}
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.8,
        delay: props.delayTime,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <motion.a
        href={`/${props.title.toLowerCase()}`}
        className=" w-full text-center grid items-center"
        whileHover={{
          paddingBottom: 100,
          color: '#fff',
          transition: { duration: 0.2, delay: 0 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        {props.title}
      </motion.a>
    </motion.div>
  );
};

const FeaturedProject = (props: PropsFeaturedProject) => {
  return (
    <motion.a
      className="origin-right"
      href={props.url}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2, delay: 0 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.img
        src={props.image}
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{
          duration: 0.5,
          delay: props.delayTime,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      />
    </motion.a>
  );
};

export default async function Index() {
  // const { content, allPosts, allProjects } = await getData();

  return (
    <Layout>
      <div
        className={`bg-(--color-foreground) w-xl sticky top-0 -z-100 md:h-6 h-2 justify-self-center`}
      />
      <div className="max-w-none mx-auto px-0">
        <section className="md:mt-8 mt-2 lg:mb-16 md:mb-8">
          <Logo />
        </section>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-7 md:gap-4 px-4 md:px-24 align-items-start relative">
        <div className="md:col-span-4">
          <div className="grid gap-2 lg:mb-18">
            <FeaturedProject
              url={`/projects/earthsong/`}
              image={`/images/featured/earthsong-featured.webp`}
              delayTime={0}
            />
            <FeaturedProject
              url={`/projects/vector/`}
              image={`/images/featured/vector-1.webp`}
              delayTime={0.2}
            />
          </div>
        </div>
        <div className="md:col-span-3 w-max">
          <div className="grid grid-cols-3 gap-2 md:gap-4 fixed h-max bottom-0 md:w-1/3">
            <MenuItem title={`Projects`} delayTime={0} />
            <MenuItem title={`About`} delayTime={0.2} />
            <MenuItem title={`Contact`} delayTime={0.4} />
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
