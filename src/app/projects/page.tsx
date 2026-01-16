import Header from '@/components/Header';
import { absoluteUrl } from '@/lib/utils';
import { Metadata } from 'next';
import { load } from 'outstatic/server';
import BlueAbsolute from '../../components/BlueAbsolute';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import ProjectsFiltered from '../../components/ProjectsFiltered';
import TagsFilter from '../../components/TagsFilter';
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

export default async function Projects() {
  const { page, allProjects } = await getData();

  return (
    <Layout>
      <div className="w-full mx-auto px-0 pb-4 lg:pb-16">
        <Header />
        <div className="relative pb-0 lg:pb-4">
          <PageTitle pageTitle={page.title} />
          <BlueAbsolute />
        </div>
        <div className=" projectsPage">
          <section className="mt-15">
            <div className="projectSection">
              <h2>Featured Work</h2>
              <span>
                Composer for narrative audio storytelling — podcasts,
                documentaries, and interactive media.
              </span>
              {/* <span>Professional narrative audio & web development</span> */}
            </div>
            <ProjectsFiltered
              allProjects={allProjects}
              section="featured"
              grid={3}
            />
          </section>

          <section>
            <h2>Narrative Audio</h2>
            <span>Additional documentary, film, and series work</span>
            <ProjectsFiltered
              allProjects={allProjects}
              section="additional"
              grid={5}
            />
          </section>

          <section>
            <h2>Web Development</h2>
            <ProjectsFiltered
              allProjects={allProjects}
              section="code"
              grid={3}
            />
          </section>

          <section>
            <h2>Music & Performance</h2>
            <span>Solo albums and experimental work with Budokan Boys</span>
            <ProjectsFiltered
              allProjects={allProjects}
              section="personal"
              grid={4}
            />
          </section>

          <section>
            <h2>Short Films & Music Videos</h2>
            <ProjectsFiltered
              allProjects={allProjects}
              section="weird"
              grid={4}
            />
          </section>
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
      'badge',
      'section',
    ])
    .first();

  const content = await markdownToHtml(page.content);

  const allProjects = await db
    .find(
      {
        collection: 'projects',
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
