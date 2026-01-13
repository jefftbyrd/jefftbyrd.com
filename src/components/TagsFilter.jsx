'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
import ProjectGrid from './ProjectGrid';

const TagsFilter = ({ allProjects }) => {
  const [tagFilter, setTagFilter] = useState('all');
  let filteredProjects = allProjects;
  if (tagFilter === 'all') {
    filteredProjects = allProjects;
  } else
    filteredProjects = allProjects.filter((project) => {
      let selected = project.projectTags.some(({ value }) =>
        value.includes(`${tagFilter}`),
      );
      return selected;
    });
  console.log('tagFilter', tagFilter);
  const TagItem = (props) => {
    return (
      <motion.button
        className={`${
          props.tagValue === tagFilter
            ? `bg-(--color-vivid) text-black`
            : 'bg-(--color-foreground)'
        } uppercase inline-block rounded-full px-3 py-1 text-md font-medium cursor-pointer scale-100 hover:scale-[1.15] hover:mx-4 active:scale-[0.97] transition-all tracking-wide shadow-[0px_0px_0px_2px_var(--color-background),0px_0px_0px_5px_var(--color-foreground),0px_0px_0px_6px_var(--color-vivid)]`}
        formAction={() => setTagFilter(props.tagValue)}
      >
        {props.tagLabel}
      </motion.button>
    );
  };

  return (
    <div className="relative ">
      <section>
        <form className="flex mt-10 flex-wrap gap-5 lg:gap-4 mx-4 lg:mx-0 text-white ">
          <TagItem tagLabel="All" tagValue="all" />
          <TagItem tagLabel="Composer" tagValue="soundtrack" />
          <TagItem tagLabel="Sound Designer" tagValue="soundDesign" />
          <TagItem tagLabel="Code" tagValue="code" />
          <TagItem tagLabel="Albums" tagValue="album" />
          <TagItem tagLabel="Music Videos" tagValue="musicVideo" />
          <TagItem tagLabel="Audio Post" tagValue="audioPost" />
          <TagItem tagLabel="Short Films" tagValue="shortFilm" />
          <TagItem tagLabel="Graphic Design" tagValue="design" />
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
