import Header from '@/components/Header';
import PageTitle from '@/components/PageTitle';
import ProjectBlueVert from '@/components/ProjectBlueVert';
import Image from 'next/image';
// import 'swiper/css';
import { load } from 'outstatic/server';
import BigMenu from '../../components/BigMenu';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import Slider from 'react-slick';
import BlueVert from '../../components/BlueVert';
import ContentGrid from '../../components/ContentGrid';
import styles from '../../components/home.module.css';
import Layout from '../../components/Layout';
import SimpleSlider from '../../components/SimpleSlider';
import markdownToHtml from '../../lib/markdownToHtml';

export default async function About() {
  const { content, allPosts, allProjects } = await getData();

  return (
    <Layout>
      <div className="w-full mx-auto px-0">
        <Header />
        <div className="mt-12">
          <PageTitle pageTitle={'About'} />
          {/* <ProjectBlueVert height={`h-8`} /> */}
        </div>

        <article className="mb-8">
          <div className="grid md:grid-cols-2 gap-6 px-12  py-0">
            <div className="flex flex-col gap-4 pt-5">
              <div className="relative mb-2 md:mb-4 sm:mx-0 aspect-square">
                <Image
                  alt="Jeff T Byrd"
                  src="/images/jefftbyrd-3.webp"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="bg-(--color-foreground) px-5 py-3">
                <div
                  className=" text-white text-base"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>

              {/* <div className="p-2">
                {Array.isArray(project?.projectTags)
                  ? project.projectTags.map(({ label }) => (
                      <span
                        key={label}
                        className="inline-block uppercase bg-white rounded-full px-3 py-1 text-md font-medium text-(--color-background) mr-2 mb-2"
                      >
                        {label}
                      </span>
                    ))
                  : null}
              </div> */}
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}

async function getData() {
  const db = await load();

  const page = await db
    .find({ collection: 'pages', slug: 'about' }, ['content'])
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
