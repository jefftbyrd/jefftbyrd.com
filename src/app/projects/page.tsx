import Header from '@/components/Header';
// import TagsFilter from '@/components/TagsFilter';
import { absoluteUrl } from '@/lib/utils';
import { Metadata } from 'next';
import { load } from 'outstatic/server';
// import { useRef, useState } from 'react';
import BlueAbsolute from '../../components/BlueAbsolute';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import ProjectGrid from '../../components/ProjectGrid';
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
  // const { content, allPosts, allProjects } = await getData();
  const { page, content, allProjects, allCode, allTags } = await getData();

  return (
    <Layout>
      <div className="w-full mx-auto px-0 pb-4 lg:pb-16">
        <Header />
        <div className="relative pb-0 lg:pb-4">
          <PageTitle pageTitle={page.title} />
          <BlueAbsolute />
        </div>
        <div className="lg:px-16">
          {/* {allProjects.length > 0 && (
            <TagsList
              title="Projects"
              items={musicVideos}
              collection="projects"
            />
          )} */}

          <TagsFilter allProjects={allProjects} />

          {/* {allTags.map((item) => (
            <span
              key={item.id}
              className="inline-block uppercase bg-white rounded-full px-4 py-2 text-md font-medium text-xl text-(--color-foreground) mr-2 mb-2 "
            >
              {item[0].label}
            </span>
          ))} */}

          {/* {allProjects.map((project) => {
            <div>{project.title}</div>;
            // project.projectTags.map(({ label }) => (
            //   <span key={label}>
            //     {label} {project.title}
            //   </span>
            // ));
          })} */}

          {/* {allProjects.length > 0 && (
            <ProjectGrid
              title="Projects"
              items={allProjects}
              collection="projects"
            />
          )} */}
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
    .find(
      {
        collection: 'projects',
        // projectTags: [{ value: 'soundDesign' }, { value: 'soundtrack' }],
        // projectTags: [{ value: 'soundtrack' }],
        // projectTags: [
        //   { value: 'soundtrack', label: 'Soundtrack' },
        //   // { label: 'Sound Design', value: 'soundDesign' },
        // ],
      },
      [
        'title',
        'slug',
        'coverImage',
        'projectOrder',
        'projectTags',
        'description',
      ],
    )
    .sort({ projectOrder: -1 })
    .toArray();

  const allCode = allProjects.filter((project) => {
    // console.log(eachVal);
    let selected = project.projectTags.some(({ value }) =>
      value.includes('code'),
    );
    return selected;
  });

  // const allCode2 = allProjects.filter((project) =>
  //   project.projectTags.some(({ value }) =>
  //     project.projectTags.includes('code'),
  //   ),
  // );

  // const allCode3 = allProjects.filter((project) =>
  //   checkedTags.some((tag) => project.projectTags.includes(tag)),
  // );

  // console.log(output);
  // console.log('projectTags', Projects.projectTags);

  const allTags = allProjects.map((project) => project.projectTags);
  // console.log('allTags', allTags);

  // const allTags = allProjects.filter((project) => {
  //   project.projectTags.map(({ label }) => (
  //       <span
  //         key={label}

  //       >
  //         {label}
  //       </span>
  //     ))
  //   : null}

  // result = allProjects.flatMap(({ some_data }) =>
  //   Object.keys(some_data)
  //     .filter((k) => k.startsWith('color_'))
  //     .map((k) => some_data[k].value),
  // );

  // const desiredOutput = allProjects
  //   .map(({ projectTags }) =>
  //     Object.entries(projectTags)
  //       .filter(([key, { value }]) => key.startsWith('value'))
  //       .map(([key, { value }]) => value),
  //   )
  //   .flat();
  // console.log('desiredOutput', desiredOutput);
  // console.log('allProjects', allProjects);

  const musicVideos = await db
    .find({ collection: 'projects', projectTags: 'musicVideo' }, [
      'title',
      'slug',
      'coverImage',
      'projectOrder',
      'projectTags',
      'description',
    ])
    .toArray();

  // console.log('allSoundtracks', allSoundtracks);

  return {
    page,
    content,
    // allPosts,
    allProjects,
    // musicVideos,
    allCode,
    allTags,
    // allSoundtracks,
  };
}
