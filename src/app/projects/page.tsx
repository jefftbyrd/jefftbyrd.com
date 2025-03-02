import Header from '@/components/Header';
import ProjectBlueVert from '@/components/ProjectBlueVert';
import { absoluteUrl } from '@/lib/utils';
import { Metadata } from 'next';
import { load } from 'outstatic/server';
import BlueAbsolute from '../../components/BlueAbsolute';
import BlueMinimum from '../../components/BlueMinimum';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import ProjectGrid from '../../components/ProjectGrid';
import markdownToHtml from '../../lib/markdownToHtml';

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getData();
  /* @next-codemod-error 'params' is passed as an argument. Any asynchronous properties of 'props' must be awaited when accessed. */

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
      url: absoluteUrl(`/${page.slug}`),
      images: [
        {
          url: absoluteUrl(page?.coverImage || '/images/og-image.png'),
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
      images: absoluteUrl(page?.coverImage || '/images/og-image.png'),
    },
  };
}

export default async function Projects() {
  // const { content, allPosts, allProjects } = await getData();
  const { page, content, allProjects } = await getData();

  return (
    <Layout>
      <div className="w-full mx-auto px-0 pb-4 lg:pb-16">
        <Header />
        <div className="relative pb-6">
          <PageTitle pageTitle={page.title} />
          <BlueAbsolute />
        </div>
        <div className="lg:px-16">
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
    .find({ collection: 'pages', slug: 'projects' }, [
      'content',
      'title',
      'slug',
      'coverImage',
      'description',
    ])
    .first();

  const content = await markdownToHtml(page.content);

  // const allPosts = await db
  //   .find({ collection: 'posts' }, [
  //     'title',
  //     'publishedAt',
  //     'slug',
  //     'coverImage',
  //     'description',
  //     'tags',
  //   ])
  //   .sort({ publishedAt: -1 })
  //   .toArray();

  const allProjects = await db
    .find({ collection: 'projects' }, [
      'title',
      'slug',
      'coverImage',
      'projectOrder',
      'projectTags',
      'description',
    ])
    .sort({ projectOrder: -1 })
    .toArray();

  return {
    page,
    content,
    // allPosts,
    allProjects,
  };
}
