import ContentGrid from '@/components/ContentGrid';
import DateFormatter from '@/components/DateFormatter';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import PageTitle from '@/components/PageTitle';
import markdownToHtml from '@/lib/markdownToHtml';
import { absoluteUrl } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { OstDocument } from 'outstatic';
import { getDocumentSlugs, load } from 'outstatic/server';
import ProjectBlueVert from '../../../components/ProjectBlueVert';

// import styles from '../../../styles/project.module.css';

type Project = {
  tags: { value: string; label: string }[];
} & OstDocument;

interface Params {
  params: Promise<{
    slug: string;
  }>;
}
export async function generateMetadata(params: Params): Promise<Metadata> {
  const { project } = await getData(
    /* @next-codemod-error 'params' is passed as an argument. Any asynchronous properties of 'props' must be awaited when accessed. */
    params,
  );

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      url: absoluteUrl(`/projects/${project.slug}`),
      images: [
        {
          url: absoluteUrl(project?.coverImage || '/images/og-image.png'),
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: absoluteUrl(project?.coverImage || '/images/og-image.png'),
    },
  };
}

// const additionalImagesSeparate = project.additionalImages.split(',');

export default async function Project(params: Params) {
  const { project, moreProjects, content } = await getData(
    /* @next-codemod-error 'params' is passed as an argument. Any asynchronous properties of 'props' must be awaited when accessed. */
    params,
  );

  return (
    <Layout>
      <div className="w-full mx-auto px-0">
        <Header />
        <div className="mt-12">
          <PageTitle pageTitle={project.title} />
          {/* <div className="inline-block p-4 border mb-8 font-semibold text-lg rounded-sm shadow-sm">
            {project.description}
          </div> */}
          <ProjectBlueVert height={`h-8`} />
          <div className="relative mb-0 sm:mx-0 aspect-16/9">
            <Image
              alt={project.title}
              src={
                project.bigImage
                  ? // ? `/images/projects/${project.bigImage ?? ''}`
                    `/images/projects/${project?.bigImage ?? ''}`
                  : `${project?.coverImage || ''}`
              }
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        <article className="mb-8">
          <div className="grid md:grid-cols-2 gap-6 px-24 py-0">
            <div className="flex flex-col gap-4 pt-5">
              {project.videoUrl ? (
                <div>
                  <iframe
                    className="aspect-16/9 w-full"
                    src={project.videoUrl}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              ) : null}

              {project.additionalImages ? (
                <div className="flex flex-col gap-4">
                  {project.additionalImages.split(',').map((image) => (
                    <img
                      key={image}
                      src={`/images/additional/${image.trim()}`}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <div className="bg-(--color-foreground) px-5 py-3">
                <div
                  className=" text-white text-base"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
              {project.websiteUrl ? (
                <div className=" bg-(--color-foreground)  text-white font-black px-5 py-2 uppercase italic tracking-wide">
                  <a href={project.websiteUrl} target="_blank">
                    {project.websiteLinkText}
                  </a>
                </div>
              ) : null}
              {project.gitHubUrl ? (
                <div className=" bg-(--color-foreground)  text-white font-black px-5 py-2 uppercase italic tracking-wide">
                  <a href={project.gitHubUrl} target="_blank">
                    Visit on Github
                  </a>
                </div>
              ) : null}
              <div className="p-2">
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
              </div>
            </div>
          </div>
        </article>
        {/* <div className="mb-16">
          {moreProjects.length > 0 && (
            <ContentGrid
              title="Other Projects"
              items={moreProjects}
              collection="projects"
            />
          )}
        </div> */}
      </div>
    </Layout>
  );
}

async function getData({ params }: Params) {
  const db = await load();
  const project = await db
    .find<Project>({ collection: 'projects', slug: params.slug }, [
      'title',
      'publishedAt',
      'description',
      'slug',
      'author',
      'content',
      'coverImage',
      'projectTags',
      'websiteUrl',
      'gitHubUrl',
      'videoUrl',
      'additionalImages',
      'bigImage',
      'websiteLinkText',
    ])
    .first();

  if (!project) {
    notFound();
  }

  const content = await markdownToHtml(project.content);

  const moreProjects = await db
    .find({ collection: 'projects', slug: { $ne: params.slug } }, [
      'title',
      'slug',
      'coverImage',
    ])
    .toArray();

  return {
    project,
    content,
    moreProjects,
  };
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs('projects');
  return posts.map((slug) => ({ slug }));
}
