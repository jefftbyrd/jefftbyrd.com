import Header from '@/components/Header';
import ProjectBlueVert from '@/components/ProjectBlueVert';
import { load } from 'outstatic/server';
import BlueAbsolute from '../../components/BlueAbsolute';
import BlueMinimum from '../../components/BlueMinimum';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import ProjectGrid from '../../components/ProjectGrid';
import markdownToHtml from '../../lib/markdownToHtml';

export default async function Projects() {
  // const { content, allPosts, allProjects } = await getData();
  const { content, allProjects } = await getData();

  return (
    <Layout>
      <div className="w-full mx-auto px-0 pb-16">
        <Header />
        {/* <HeaderNew /> */}
        <div className="relative pb-6">
          {/* <BlueMinimum /> */}
          <PageTitle pageTitle={`Projects`} />
          <BlueAbsolute />
        </div>
        {/* <BlueAbsolute /> */}
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
    .find({ collection: 'pages', slug: 'projects' }, ['content'])
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
    content,
    // allPosts,
    allProjects,
  };
}
