import Header from '@/components/Header';
import ProjectBlueVert from '@/components/ProjectBlueVert';
// import 'swiper/css';
import { load } from 'outstatic/server';
import BigMenu from '../../components/BigMenu';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import Slider from 'react-slick';
import BlueVert from '../../components/BlueVert';
import styles from '../../components/home.module.css';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import ProjectGrid from '../../components/ProjectGrid';
import SimpleSlider from '../../components/SimpleSlider';
import markdownToHtml from '../../lib/markdownToHtml';

export default async function Projects() {
  const { content, allPosts, allProjects } = await getData();

  return (
    <Layout>
      <div className="w-full mx-auto px-0">
        <Header />
        <div className="mt-12">
          <PageTitle pageTitle={`Projects`} />
          {/* <div className="inline-block p-4 border mb-8 font-semibold text-lg rounded-sm shadow-sm">
            {project.description}
          </div> */}
          <ProjectBlueVert height={`h-8`} />
        </div>
        <div className="px-12">
          {allProjects.length > 0 && (
            <ProjectGrid
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
    .find({ collection: 'pages', slug: 'projects' }, ['content'])
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
