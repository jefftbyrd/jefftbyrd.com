'use client';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react';
// import { load } from 'outstatic/server';
import BigMenu from '../components/BigMenu';
import BlueVert from '../components/BlueVert';
import HeaderNew from '../components/HeaderNew';
import Layout from '../components/Layout';
import Logo from '../components/Logo';
import markdownToHtml from '../lib/markdownToHtml';
import styles from '../styles/home.module.css';

const MenuItem = (props) => {
  return (
    <motion.div
      className={`${styles.menuItem} bg-(--color-foreground) pb-5`}
      // hover:pb-30 transition-all
      // initial={{ opacity: 0, scale: 0.5 }}
      // animate={{ opacity: 1, scale: 1 }}
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.8,
        delay: `${props.delay}`,
        ease: [0, 0.71, 0.2, 1.01],
        // type: 'spring',
        // stiffness: 100,
      }}

      // whileHover={{ backgroundColor: "rgba(220, 220, 220, 1)" }}
      // hover={{padding-bottom: 30px}}
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

const FeaturedProject = (props) => {
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
          delay: `${props.delay}`,
          ease: [0, 0.71, 0.2, 1.01],
          // type: 'spring',
          // stiffness: 100,
        }}
      />
    </motion.a>
  );
};

export default async function Index() {
  // const { content, allPosts, allProjects } = await getData();

  return (
    <Layout>
      <BlueVert height={`h-6`} />
      <div className="max-w-none mx-auto px-0">
        <section className="mt-8 mb-16 md:mb-8">
          <Logo />
        </section>
      </div>

      <div className="grid grid-cols-7 gap-4 px-24 align-items-start relative">
        <div className="col-span-4">
          <div className="grid gap-4 mb-4">
            <FeaturedProject
              url={`/images/earthsong-slide.webp`}
              image={`/images/earthsong-slide.webp`}
              delay={0}
            />
            <FeaturedProject
              url={`/images/vector-slide.webp`}
              image={`/images/vector-slide.webp`}
              delay={0.2}
            />
          </div>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-4 fixed h-max bottom-0 w-1/3 ">
            <MenuItem title={`Projects`} delay={0} />
            <MenuItem title={`About`} delay={0.2} />
            <MenuItem title={`Contact`} delay={0.4} />
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
