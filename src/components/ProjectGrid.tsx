import Image from 'next/image';
import Link from 'next/link';
import type { OstDocument } from 'outstatic';
import BlueVertGrid from '../components/BlueVertGrid';
import styles from '../styles/projects.module.css';

type Item = {
  tags?: { value: string; label: string }[];
} & OstDocument;

type Props = {
  collection: 'posts' | 'projects';
  title?: string;
  items: Item[];
  priority?: boolean;
};

const ProjectGrid = ({
  title = 'More',
  items,
  collection,
  priority = false,
}: Props) => {
  return (
    <div className="relative">
      <BlueVertGrid height={'h-screen'} />
      <section id={collection}>
        {/* <h2 className="mb-8 text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
        {title}
      </h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 lg:gap-x-8 gap-y-5 sm:gap-y-6 lg:gap-y-8 mb-8 pt-6">
          {items.map((item, id) => (
            <Link key={item.slug} href={`/${collection}/${item.slug}`}>
              <div
                className={`${styles.projectLink} cursor-pointer project-card md:w-full scale-100 hover:scale-[1.02] active:scale-[0.97] origin-top-left motion-safe:transform-gpu transition duration-100 motion-reduce:hover:scale-100 overflow-hidden shadow-[6px_6px_0_var(--color-background),12px_12px_0_var(--color-foreground)] hover:shadow-[-6px_-6px_0_var(--color-background),-12px_-12px_0_var(--color-foreground)]`}
              >
                <div className="sm:mx-0 bg-(--color-foreground)">
                  <Image
                    src={item.coverImage ?? ''}
                    alt={`Cover Image for ${item.title}`}
                    className={`${styles.projectImage} object-cover object-center w-full h-auto`}
                    width={0}
                    height={0}
                    sizes="(min-width: 768px) 347px, 192px"
                    priority={priority && id <= 2}
                  />
                  {collection === 'projects' && (
                    <h2
                      // className={`${styles.projectTitle} text-white p-2 bg-opacity-0 text-left whitespace-normal font-semibold uppercase tracking-wide text-3xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2`}
                      className={`${styles.projectTitle} text-white p-2 bg-opacity-0 text-left whitespace-normal font-semibold tracking-wide text-4xl uppercase absolute top-2 left-2 -translate-y-0 -translate-x-0 leading-14`}
                    >
                      {item.title}
                    </h2>
                  )}
                  {collection === 'projects' && (
                    <div
                      className={`${styles.projectTags} absolute bottom-2 left-4 translate-y-0 -translate-x-0`}
                    >
                      {Array.isArray(item?.projectTags)
                        ? item.projectTags.map(({ label }) => (
                            <span
                              key={label}
                              className="uppercase inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                            >
                              {label}
                            </span>
                          ))
                        : null}
                    </div>
                  )}
                </div>
                {/* {collection === 'projects' && (
                  <div className="p-4">
                    {Array.isArray(item?.projectTags)
                      ? item.projectTags.map(({ label }) => (
                          <span
                            key={label}
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                          >
                            {label}
                          </span>
                        ))
                      : null}
                  </div>
                )} */}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectGrid;
