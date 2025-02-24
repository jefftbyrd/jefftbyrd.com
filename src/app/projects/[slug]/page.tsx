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
import AdditionalImages from '../../../components/AdditionalImages';
import EmbedBandcamp from '../../../components/EmbedBandcamp';
import EmbedSpotify from '../../../components/EmbedSpotify';
import EmbedVimeo from '../../../components/EmbedVimeo';
import EmbedYoutube from '../../../components/EmbedYoutube';
import ProjectBlueVert from '../../../components/ProjectBlueVert';
import styles from '../../../styles/projectSingle.module.css';

type Project = {
  tags: { value: string; label: string }[];
  additionalImages?: string;
  websiteUrl?: string;
  websiteLinkText?: string;
  gitHubUrl?: string;
  bigVideo?: boolean;
  videoUrl?: string;
  vimeoUrl?: string;
} & OstDocument;

interface Params {
  params: {
    slug: string;
  };
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
        <div className="mt-12 relative">
          <PageTitle pageTitle={project.title} />
          <ProjectBlueVert height={`h-16`} />
        </div>

        <div className="sm:mx-0 aspect-16/9 overflow-hidden relative">
          {project.bigVideo && project.videoUrl ? (
            <EmbedYoutube youtubeEmbedUrl={project.videoUrl} />
          ) : null}
          {project.bigVideo && project.vimeoUrl ? (
            <EmbedVimeo
              vimeoEmbedUrl={project.vimeoUrl}
              title={project.title}
            />
          ) : null}
          {!project.bigVideo ? (
            <Image
              src={
                project.bigImage
                  ? // ? `/images/projects/${project.bigImage ?? ''}`
                    `/images/projects/${project?.bigImage ?? ''}`
                  : `${project?.coverImage || ''}`
              }
              alt={`Cover Image for ${project.title}`}
              className="aspect-16/9 object-cover object-center w-full h-auto md:w-full scale-103 hover:scale-[1.0] motion-safe:transform-gpu transition duration-2000 motion-reduce:hover:scale-100 hover:shadow-sm overflow-hidden"
              fill
              priority
            />
          ) : null}
        </div>

        <article className="mb-8">
          <div className="grid md:grid-cols-2 gap-6 px-24 py-0">
            <div className="flex flex-col gap-4 pt-5">
              {project.bandcampEmbedUrl ? (
                <EmbedBandcamp bandcampEmbedUrl={project.bandcampEmbedUrl} />
              ) : null}
              {project.spotifyEmbedUrl ? (
                <EmbedSpotify spotifyEmbedUrl={project.spotifyEmbedUrl} />
              ) : null}

              {project.videoUrl && !project.bigVideo ? (
                <EmbedYoutube youtubeEmbedUrl={project.videoUrl} />
              ) : null}

              {project.vimeoUrl && !project.bigVideo ? (
                <EmbedVimeo
                  vimeoEmbedUrl={project.vimeoUrl}
                  title={project.title}
                />
              ) : null}

              {project.additionalImages ? (
                <AdditionalImages images={project.additionalImages} />
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <div className="bg-(--color-foreground) px-5 py-3">
                <div
                  className={`text-white text-base my-4 projectContent`}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                {/* <div className="w-full h-full">
                  <iframe
                    // style="border: 0; width: 100%; height: 120px;"
                    className="w-full h-[500px]"
                    src="https://bandcamp.com/EmbeddedPlayer/album=1918482317/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=true/artwork=small/transparent=true/"
                    seamless
                  >
                    <a href="https://fortevilfruit.bandcamp.com/album/nighty-night">
                      Nighty Night by Jeff T Byrd
                    </a>
                  </iframe>
                </div> */}
                {/* <div className="w-full h-full">
                  <iframe
                    // style={{ border: '0', width: '350px', height: '654px' }}
                    className="w-full h-[900px]"
                    src="https://bandcamp.com/EmbeddedPlayer/album=1918482317/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/"
                    seamless
                  ></iframe>
                </div> */}
              </div>
              {project.websiteUrl ? (
                <div
                  className={` ${styles.bigLink} bg-(--color-foreground)  text-white font-medium uppercase tracking-wide text-3xl hover:scale-105 origin-left transition-all ease-in-out`}
                >
                  <a
                    className="block px-5 py-3"
                    href={project.websiteUrl ?? '#'}
                    target="_blank"
                  >
                    &gt; {project.websiteLinkText ?? 'Visit the website'}
                  </a>
                </div>
              ) : null}
              {project.gitHubUrl ? (
                <div
                  className={`${styles.bigLink} bg-(--color-foreground)  text-white font-medium uppercase tracking-wide text-3xl hover:scale-105 origin-left transition-all ease-in-out`}
                >
                  <a
                    className="block px-5 py-3"
                    href={project.gitHubUrl ?? '#'}
                    target="_blank"
                  >
                    &gt; Visit on Github
                  </a>
                </div>
              ) : null}
              <div className="p-2">
                {Array.isArray(project?.projectTags)
                  ? project.projectTags.map(({ label }) => (
                      <span
                        key={label}
                        className="inline-block uppercase bg-white rounded-full px-3 py-1 text-md font-medium text-xl text-(--color-background) mr-2 mb-2"
                      >
                        {label}
                      </span>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </article>
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
      'vimeoUrl',
      'bigVideo',
      'bandcampEmbedUrl',
      'spotifyEmbedUrl',
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
