import Header from '@/components/Header';
import PageTitle from '@/components/PageTitle';
import { absoluteUrl } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import { load } from 'outstatic/server';
import BlueAbsolute from '../../components/BlueAbsolute';
import Layout from '../../components/Layout';
import markdownToHtml from '../../lib/markdownToHtml';

type Props = {
  link: string;
  text: string;
};

const ContactLink = (props: Props) => {
  return (
    <li className="">
      <a
        href={props.link}
        className="bg-(--color-vivid) scale-100 hover:scale-[1.02] active:scale-[0.97] hover:text-white motion-safe:transform-gpu transition-all duration-100 motion-reduce:hover:scale-100 overflow-hidden block px-4 lg:px-8 py-6 lg:py-10 mx-6 lg:mx-0 shadow-[6px_6px_0_var(--color-background),12px_12px_0_var(--color-foreground)] hover:shadow-[-6px_-6px_0_var(--color-background),-12px_-12px_0_var(--color-foreground)]"
        target="_blank"
      >
        &gt; {props.text}
      </a>
    </li>
  );
};

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

export default async function Contact() {
  const { page, content } = await getData();

  return (
    <Layout>
      {/* <BlueAbsolute /> */}
      <div className="w-full mx-auto px-0">
        <Header />
        <div className="relative pb-12">
          <PageTitle pageTitle={'Contact'} />
          <BlueAbsolute />
        </div>

        <article className="mb-8">
          <div className="grid lg:grid-cols-3">
            <div></div>
            <div className="flex flex-col gap-4 pt-5">
              <ul className="text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl flex flex-col gap-10 lg:p-5  text-(--color-foreground) font-medium tracking-wider lg:absolute">
                <ContactLink
                  link={`mailto:jeff@jefftbyrd.com`}
                  text={`jeff@jefftbyrd.com`}
                />
                <ContactLink
                  link={`https://github.com/jefftbyrd`}
                  text={`github.com/jefftbyrd`}
                />
              </ul>
              <div></div>
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
    .find({ collection: 'pages', slug: 'contact' }, [
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

  // const allProjects = await db
  //   .find({ collection: 'projects' }, ['title', 'slug', 'coverImage'])
  //   .sort({ publishedAt: -1 })
  //   .toArray();

  return {
    page,
    content,
    // allPosts,
    // allProjects,
  };
}
