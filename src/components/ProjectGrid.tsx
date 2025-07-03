import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import type { OstDocument } from 'outstatic';
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
      <section id={collection}>
        <div className="grid grid-cols-1 mx-4 lg:mx-0 sm:grid-cols-2 xl:grid-cols-3 sm:gap-x-6 lg:gap-x-8 gap-y-4 sm:gap-y-6 lg:gap-y-8 pt-8">
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
                    className={`${styles.projectLink} cursor-pointer project-card md:w-full scale-100 hover:scale-[1.02] active:scale-[0.97] origin-top-left motion-safe:transform-gpu transition-all duration-100 motion-reduce:hover:scale-100 overflow-hidden sm:shadow-[6px_6px_0_var(--color-background),12px_12px_0_var(--color-foreground)] sm:hover:shadow-[-6px_-6px_0_var(--color-background),-12px_-12px_0_var(--color-foreground)]`}
                  >
                    <div className={styles.gridItem}>
                      <div className="relative w-full aspect-square">
                        <Image
                          src={item.coverImage ?? ''}
                          alt={`Cover Image for ${item.title}`}
                          className={`${styles.projectImage} object-cover object-center`}
                          fill
                          sizes="(min-width: 1280px) 400px, (min-width: 768px) 350px, 100vw"
                          priority={priority && id <= 2}
                          quality={90}
                        />
                      </div>
                      {collection === 'projects' && (
                        <div className="text-white absolute top-3 left-3 -translate-y-0 -translate-x-0">
                          <h2
                            className={`${styles.projectTitle} p-2 bg-opacity-0 text-left whitespace-normal font-bold tracking-wide text-4xl xl:text-3xl 2xl:text-4xl uppercase  leading-12`}
                          >
                            {item.title}
                          </h2>
                          <h3
                            className={`${styles.projectDescription} pl-2 pr-6 bg-opacity-0 text-left whitespace-normal font-medium tracking-wide text-base xl:text-sm 2xl:text-base`}
                          >
                            {item.description}
                          </h3>
                        </div>
                      )}
                      {collection === 'projects' && (
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
                      )}
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
