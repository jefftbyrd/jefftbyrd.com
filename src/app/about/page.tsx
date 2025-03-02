// import DateFormatter from '@/components/DateFormatter';
import Header from '@/components/Header';
import PageTitle from '@/components/PageTitle';
import { absoluteUrl } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
// import { notFound } from 'next/navigation';
import { OstDocument } from 'outstatic';
import { getDocumentSlugs, load } from 'outstatic/server';
import BlueAbsolute from '../../components/BlueAbsolute';
import Layout from '../../components/Layout';
import markdownToHtml from '../../lib/markdownToHtml';

type Post = {
  tags: { value: string; label: string }[];
} & OstDocument;

interface Params {
  params: {
    slug: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getData();
  /* @next-codemod-error 'params' is passed as an argument. Any asynchronous properties of 'props' must be awaited when accessed. */
  // params,
  // page,

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

export default async function About() {
  const { content, page } = await getData();

  return (
    <Layout>
      <div className="w-full mx-auto px-0">
        <Header />
        <div className="relative pb-12">
          <PageTitle pageTitle={page.title} />
          <BlueAbsolute />
        </div>

        <article className="mb-8">
          <div className="grid md:grid-cols-2 gap-6 lg:px-16 py-0">
            <div className="flex flex-col gap-4">
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

            <div className="lg:px-5 relative">
              <div className="px-4 md:px-0 lg:fixed gap-5 lg:mr-30 grid lg:gap-8 -mt-4 w-90 sm:w-auto">
                <div
                  className=" text-white text-base"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                <div>
                  <iframe
                    className="aspect-16/9 w-full"
                    src="https://www.youtube.com/embed/BZF5gsD8GCw?si=5YFsY1HLJbFH70tN"
                    title="YouTube video player"
                    // frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
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
    .find({ collection: 'pages', slug: 'about' }, [
      'content',
      'title',
      'slug',
      'coverImage',
      'description',
    ])
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
    page,
    content,
    // allPosts,
    // allProjects,
  };
}
