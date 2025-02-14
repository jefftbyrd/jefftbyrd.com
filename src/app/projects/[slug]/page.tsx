import ContentGrid from '@/components/ContentGrid';
import DateFormatter from '@/components/DateFormatter';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import markdownToHtml from '@/lib/markdownToHtml';
import { absoluteUrl } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { OstDocument } from 'outstatic';
import { getDocumentSlugs, load } from 'outstatic/server';
import ProjectBlueVert from '../../../components/ProjectBlueVert';

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
        <div>
          <h1 className="font-primary text-2xl font-bold md:text-4xl mb-2 px-5">
            {project.title}
          </h1>
          {/* <div className="inline-block p-4 border mb-8 font-semibold text-lg rounded-sm shadow-sm">
            {project.description}
          </div> */}
          <ProjectBlueVert height={`h-8`} />
          <div className="relative mb-2 md:mb-4 sm:mx-0 aspect-16/9">
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
          <div className="grid md:grid-cols-2 gap-8">
            <div>
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
              {/* <div className="relative mb-2 md:mb-4 sm:mx-0 aspect-16/9">
                <Image
                  alt={project.title}
                  src={`/images/additional/${project.additionalImages ?? ''}`}
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div> */}
              {project.additionalImages ? (
                <div>
                  {project.additionalImages.split(',').map((image) => (
                    <img
                      key={image}
                      src={`/images/additional/${image.trim()}`}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            <div>
              <div className="max-w-2xl mx-auto bg-(--color-foreground)">
                <div
                  className="prose lg:prose-xl text-white"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
              <div className="max-w-2xl mx-auto bg-(--color-foreground)  text-white">
                <a href={project.websiteUrl} target="_blank">
                  {project.websiteLinkText}
                </a>
              </div>

              <div className="max-w-2xl mx-auto bg-(--color-foreground)  text-white">
                <a href={project.gitHubUrl} target="_blank">
                  Visit on Github
                </a>
              </div>

              {/* <ul>
                {project.additionalImages.split(',').map(({ image }) => (
                  <li key={image}>{image}</li>
                ))}
              </ul> */}

              {/* <ul>
                {project.additionalImages.split(',').map((image) => (
                  return (
                  <li key={image.id}>{image.id}</li>
                  );
                ))}
              </ul> */}

              {/* {project.additionalImages
                .split(',')
                .map((image) => `<li>${image}</li>`)} */}

              {/* <h3>{project.additionalImages.split(',')}</h3> */}
              {/* <ul>
                {
                  project.additionalImages.split(',').map((hero, index) => (
                    <li key={index}>{hero}</li>
                  ))
                  // return <header>{headings}</header>
                }
              </ul> */}
              {/* <ul>
                {
                  project.additionalImages.split(',').map((image) => (
                    <li key={image}>{image}</li>
                  ))
                  // return <header>{headings}</header>
                }
              </ul> */}

              <div className="p-4">
                {Array.isArray(project?.projectTags)
                  ? project.projectTags.map(({ label }) => (
                      <span
                        key={label}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
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
