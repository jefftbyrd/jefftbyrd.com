import Header from '@/components/Header';
import PageTitle from '@/components/PageTitle';
import ProjectBlueVert from '@/components/ProjectBlueVert';
import Image from 'next/image';
// import 'swiper/css';
import { load } from 'outstatic/server';
import BigMenu from '../../components/BigMenu';
import BlueVert from '../../components/BlueVert';
import ContentGrid from '../../components/ContentGrid';
import styles from '../../components/home.module.css';
import Layout from '../../components/Layout';
import SimpleSlider from '../../components/SimpleSlider';
import markdownToHtml from '../../lib/markdownToHtml';

export default async function Contact() {
  const { content, allPosts, allProjects } = await getData();

  return (
    <Layout>
      <div className="w-full mx-auto px-0">
        <Header />
        <div className="mt-12">
          <PageTitle pageTitle={'Contact'} />
          <ProjectBlueVert height={`h-8`} />
        </div>

        <article className="mb-8">
          <div className="grid md:grid-cols-2 gap-6 px-6 py-0">
            <div className="flex flex-col gap-4 pt-5">
              <ul className="text-8xl flex flex-col gap-10 p-5 text-white italic font-light tracking-wide absolute">
                <li className="">
                  <a
                    href="mailto:jeff.t.byrd@gmail.com"
                    className="block px-8 py-10 bg-(--color-foreground)"
                    target="_blank"
                  >
                    jeff.t.byrd@gmail.com
                  </a>
                </li>
                <li classname="bg-(--color-foreground)">
                  <a
                    href="https://github.com/jefftbyrd"
                    className="block px-8 py-10 bg-(--color-foreground)"
                    target="_blank"
                  >
                    github.com/jefftbyrd
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-1">
              <div className="bg-(--color-foreground) px-5 py-3">
                {/* <div
                  className=" text-white text-base"
                  dangerouslySetInnerHTML={{ __html: content }}
                /> */}
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
    .find({ collection: 'pages', slug: 'contact' }, ['content'])
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
