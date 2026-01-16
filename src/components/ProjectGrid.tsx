import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import type { OstDocument } from 'outstatic';
import styles from '../styles/projects.module.css';

type Item = {
  tags?: { value: string; label: string }[];
  badge?: string;
} & OstDocument;

type Props = {
  collection: 'posts' | 'projects';
  title?: string;
  items: Item[];
  priority?: boolean;
  gridCols?: number;
};

const ProjectGrid = ({
  title = 'More',
  items,
  collection,
  priority = false,
  gridCols = 3,
}: Props) => {
  // Map grid column numbers to Tailwind classes
  const gridClassMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  };

  // Get the appropriate grid class or default to 3 columns
  const gridClass = gridClassMap[gridCols] || gridClassMap[3];

  return (
    <div className="relative">
      <section id={collection}>
        <div
          className={`grid ${gridClass} mx-4 lg:mx-0 sm:gap-x-6 lg:gap-x-12 gap-y-4 sm:gap-y-6 lg:gap-y-10 pt-8`}
        >
          {items.map((item, id) => (
            <AnimatePresence mode="popLayout">
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <Link href={`/${collection}/${item.slug}`}>
                  <div
                    className={`${styles.projectLink} cursor-pointer bg-lightPink project-card md:w-full scale-100 hover:scale-[1.02] active:scale-[0.97] origin-top-left motion-safe:transform-gpu transition-all duration-100 motion-reduce:hover:scale-100 overflow-hidden sm:shadow-[6px_6px_0_var(--color-background),12px_12px_0_var(--color-foreground)] sm:hover:shadow-[-6px_-6px_0_var(--color-background),-12px_-12px_0_var(--color-foreground)]`}
                  >
                    <div className={styles.gridItem}>
                      <div className="relative w-full aspect-square">
                        {item.badge && (
                          <p className="border-1 border-white/50 bg-foreground absolute z-100 m-2  text-white uppercase font-medium py-2 px-3 tracking-widest shadow-md  text-sm">
                            {item.badge}
                          </p>
                        )}
                        <Image
                          src={item.coverImage ?? ''}
                          alt={`Cover Image for ${item.title}`}
                          className={`${styles.projectImage} object-cover object-center`}
                          fill
                          sizes="(min-width: 3840px) 100vw, (min-width: 2560px) 850px, (min-width: 1920px) 800px, (min-width: 1280px) 430px, (min-width: 768px) 350px, 100vw"
                          priority={priority && id <= 2}
                          quality={75}
                        />
                      </div>
                      {collection === 'projects' && (
                        <div className="px-4 pt-3 pb-3">
                          <h3
                            className={`${styles.projectTitle} bg-opacity-0 text-left whitespace-normal font-semibold tracking-wide text-3xl xl:text-xl 2xl:text-2xl leading-9`}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={`${styles.projectDescription} bg-opacity-0 text-left whitespace-normal font-normal tracking-wide text-sm`}
                          >
                            {item.description}
                          </p>
                        </div>
                      )}
                      {/* {collection === 'projects' && (
                        <div
                          className={`${styles.projectTags} absolute bottom-4 left-5 translate-y-0 -translate-x-0`}
                        >
                          {Array.isArray(item?.projectTags)
                            ? item.projectTags.map(({ label }) => (
                                <span
                                  key={label}
                                  className="uppercase inline-block bg-white rounded-full px-3 py-1 text-md font-semibold text-((gray-700) mr-2 mb-2)"
                                >
                                  {label}
                                </span>
                              ))
                            : null}
                        </div>
                      )} */}
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectGrid;
