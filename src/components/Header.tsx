import Link from 'next/link';
import styles from '../styles/header.module.css';

const Header = () => {
  return (
    // <nav className="layout flex items-center justify-between py-4">
    //   <ul className="flex items-center justify-between space-x-3 text-xs md:space-x-4 md:text-base">
    //     <li>
    //       <Link href="/" className="hover:underline">
    //         Home
    //       </Link>
    //     </li>
    //     <li>
    //       <Link href="/#posts" className="hover:underline">
    //         Posts
    //       </Link>
    //     </li>
    //     <li>
    //       <Link href="/#projects" className="hover:underline">
    //         Projects
    //       </Link>
    //     </li>
    //   </ul>
    // </nav>
    <header className="sticky z-100 top-0 bg-(--color-background)">
      <nav>
        <div className="grid md:grid-cols-2 gap-30 ml-0 mr-24 py-0 border-b-1   border-solid border-(--color-foreground)">
          <div className="flex items-end px-4">
            <Link href="/">
              <h1
                className={`${styles.logo} uppercase text-4xl text-(--color-foreground) `}
              >
                Jeff <span className={styles.bump}>T</span> Byrd
              </h1>
            </Link>
          </div>
          <div className="bg-(--color-foreground) px-4 py-2">
            <nav className="layout flex items-center justify-center py-0">
              <ul className="flex items-center justify-between space-x-3 md:space-x-4 md:text-base font-extralight uppercase text-3xl text-white ">
                <li>
                  <Link
                    href="/projects"
                    className="transition-all delay-0 duration-300 ease-in-out hover:-translate-y-1 text-3xl"
                  >
                    Projects
                  </Link>{' '}
                  .{' '}
                </li>
                <li>
                  <Link href="/about" className="hover:underline text-3xl">
                    About .
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline text-3xl">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
