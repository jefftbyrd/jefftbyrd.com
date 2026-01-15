'use client';
import ProjectGrid from './ProjectGrid';

const ProjectsFiltered = ({ allProjects, section = 'featured', grid = 3 }) => {
  const filteredProjects = allProjects.filter((project) => {
    // More defensive checking
    if (!project) return false;
    if (!project.section) return false;
    if (!Array.isArray(project.section)) return false;
    if (project.section.length === 0) return false;

    return project.section.some((item) => {
      return item && item.value && item.value.includes(section);
    });
  });

  return (
    <div className="relative">
      {filteredProjects.length > 0 && (
        <ProjectGrid
          title="Projects"
          items={filteredProjects}
          collection="projects"
          gridCols={grid}
        />
      )}
    </div>
  );
};

export default ProjectsFiltered;
