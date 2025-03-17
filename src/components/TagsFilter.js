'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
// import type { OstDocument } from 'outstatic';
import styles from '../styles/projects.module.css';
import ProjectGrid from './ProjectGrid';

const TagsFilter = ({ allProjects }) => {
  const [tagFilter, setTagFilter] = useState('all');
  let filteredProjects = allProjects;
  if (tagFilter === 'all') {
    filteredProjects = allProjects;
  } else
    filteredProjects = allProjects.filter((project) => {
      // console.log(eachVal);
      let selected = project.projectTags.some(({ value }) =>
        value.includes(`${tagFilter}`),
      );
      return selected;
    });
  console.log('tagFilter', tagFilter);
  const TagItem = (props) => {
    return (
      <button
        className="uppercase inline-block bg-white rounded-full px-3 py-1 text-md font-semibold text-((gray-700) mr-2 mb-2) cursor-pointer"
        formAction={() => setTagFilter(props.tagValue)}
      >
        {props.tagLabel}
      </button>
    );
  };

  return (
    <div className="relative">
      <section>
        <form className="flex">
          <TagItem tagLabel="All" tagValue="all" />
          <TagItem tagLabel="Code" tagValue="code" />
          <TagItem tagLabel="Sound Design" tagValue="soundDesign" />
          <TagItem tagLabel="Music Video" tagValue="musicVideo" />
          {/* <TagItem tagLabel="Music" tagValue="music" /> */}
          <TagItem tagLabel="Album" tagValue="album" />
          <TagItem tagLabel="Soundtrack" tagValue="soundtrack" />
          <TagItem tagLabel="Audio Post" tagValue="audioPost" />
          <TagItem tagLabel="Short Film" tagValue="shortFilm" />
          <TagItem tagLabel="Design" tagValue="design" />
        </form>
      </section>
      {allProjects.length > 0 && (
        <ProjectGrid
          title="Projects"
          items={filteredProjects}
          collection="projects"
        />
      )}
    </div>
  );
};

export default TagsFilter;
