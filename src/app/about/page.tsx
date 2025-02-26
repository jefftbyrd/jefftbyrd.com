import Header from '@/components/Header';
import PageTitle from '@/components/PageTitle';
import ProjectBlueVert from '@/components/ProjectBlueVert';
import Image from 'next/image';
// import 'swiper/css';
import { load } from 'outstatic/server';
import BigMenu from '../../components/BigMenu';
import BlueAbsolute from '../../components/BlueAbsolute';
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
      {/* <BlueAbsolute /> */}
      <div className="w-full mx-auto px-0">
        <Header />
        <div className="relative pb-12">
          <PageTitle pageTitle={'About'} />
          <BlueAbsolute />
        </div>

        <article className="mb-8">
          <div className="grid md:grid-cols-2 gap-6 px-16  py-0">
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

            <div className="px-5 relative">
              <div className=" fixed mr-30 grid gap-8 -mt-4">
                <div
                  className=" text-white text-base"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                <div>
                  <iframe
                    className="aspect-16/9 w-full"
                    src="https://www.youtube.com/embed/BZF5gsD8GCw?si=5YFsY1HLJbFH70tN"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
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
