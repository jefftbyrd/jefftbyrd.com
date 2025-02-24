import Header from '@/components/Header';
import PageTitle from '@/components/PageTitle';
import ProjectBlueVert from '@/components/ProjectBlueVert';
import Image from 'next/image';
import { load } from 'outstatic/server';
import BlueAbsolute from '../../components/BlueAbsolute';
import BlueVert from '../../components/BlueVert';
import BlueVertGrid from '../../components/BlueVertGrid';
import Layout from '../../components/Layout';
import SimpleSlider from '../../components/SimpleSlider';
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
        className="scale-100 hover:scale-[1.02] active:scale-[0.97] hover:text-white motion-safe:transform-gpu transition-all duration-100 motion-reduce:hover:scale-100 overflow-hidden block px-8 py-10 bg-(--color-foreground) shadow-[6px_6px_0_var(--color-background),12px_12px_0_var(--color-foreground)] hover:shadow-[-6px_-6px_0_var(--color-background),-12px_-12px_0_var(--color-foreground)]"
        target="_blank"
      >
        &gt; {props.text}
      </a>
    </li>
  );
};

export default async function Contact() {
  const { content, allPosts, allProjects } = await getData();

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
          <div className="grid md:grid-cols-3">
            <div></div>
            <div className="flex flex-col gap-4 pt-5">
              <ul className="text-6xl flex flex-col gap-10 p-5 text-(--color-vivid) font-medium tracking-wider absolute">
                <ContactLink
                  link={`mailto:jefftbyrd@gmail.com`}
                  text={`jefftbyrd@gmail.com`}
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
