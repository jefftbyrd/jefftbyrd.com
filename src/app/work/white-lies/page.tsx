import Header from '@/components/Header';
import { absoluteUrl } from '@/lib/utils';
import { Metadata } from 'next';
import { load } from 'outstatic/server';
import BlueAbsolute from '../../../components/BlueAbsolute';
import Layout from '../../../components/Layout';
import PageTitle from '../../../components/PageTitle';
import ProjectsFiltered from '../../../components/ProjectsFiltered';
import Reel from '../../../components/Reel';
import TagsFilter from '../../../components/TagsFilter';
import markdownToHtml from '../../../lib/markdownToHtml';

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getData();
  /* @next-codemod-error 'params' is passed as an argument. Any asynchronous properties of 'props' must be awaited when accessed. */

  if (!page) {
    return {};
  }

  return {
    title: 'White Lies',
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
      url: absoluteUrl(`/${page.slug}`),
      images: [
        {
          url: absoluteUrl(page?.coverImage || '/images/jefftbyrd.png'),
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: absoluteUrl(page?.coverImage || '/images/jefftbyrd.png'),
    },
  };
}

export default async function Testing() {
  const { page, allProjects } = await getData();
  return (
    <Layout>
      <div className="w-full mx-auto px-0 pb-4 lg:pb-16">
        <Header />
        <div className="relative pb-0 lg:pb-4">
          <PageTitle pageTitle="White Lies" />
          <BlueAbsolute />
        </div>
        <div className=" projectsPage px-2">
          <section className="mt-15">
            <div className="projectSection gap-5 flex-col flex">
              {/* <h2>Testing</h2> */}
              <p>
                White Lies is an investigative narrative podcast from NPR
                examining race, historical memory, and injustice in the American
                South. Season 1 was a Pulitzer Prize finalist and reached #1 on
                Apple Podcasts.
              </p>
              <p>
                I composed the original soundtrack for all three seasons,
                working closely with the producers to develop a sonic identity
                for the series across its run.
              </p>
            </div>
          </section>
        </div>
        <div className="gap-6 lg:gap-12 landing flex flex-col pb-24">
          <div className="px-8 lg:px-36 lg:gap-24 flex flex-col">
            <Reel />
          </div>
        </div>
      </div>
    </Layout>
  );
}

async function getData() {
  const db = await load();

  const page = await db
    .find({ collection: 'pages', slug: 'work' }, [
      'content',
      'title',
      'slug',
      'coverImage',
      'description',
      'badge',
      'section',
    ])
    .first();

  const content = await markdownToHtml(page.content);

  const allProjects = await db
    .find(
      {
        collection: 'work',
      },
      [
        'title',
        'slug',
        'coverImage',
        'projectOrder',
        'projectTags',
        'description',
        'badge',
        'section',
      ],
    )
    .sort({ projectOrder: -1 })
    .toArray();

  return {
    page,
    content,
    allProjects,
  };
}
