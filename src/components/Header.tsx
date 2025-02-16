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
        <div className="grid md:grid-cols-2 gap-30 ml-0 mr-24 py-0 border-b-1 border-solid border-(--color-foreground)">
          <div className="flex items-end px-4">
            <Link href="/">
              <h1
                className={`${styles.logo} uppercase text-4xl text-(--color-foreground) ${styles.shadowWhite} transition-all delay-100 duration-300 ease-in-out `}
              >
                Jeff <span className={styles.bump}>T</span> Byrd
              </h1>
            </Link>
          </div>
          <div className="px-4 py-0">
            <nav className="layout flex items-center justify-center py-0">
              <ul className="flex items-center justify-between space-x-3 md:space-x-4 md:text-base font-extralight uppercase text-3xl text-white ">
                <li>
                  <Link
                    href="/projects"
                    className={`relative transition-all delay-0 duration-100 ease-in-out hover:-translate-y-4 text-3xl ${styles.menuItem} py-5 bg-(--color-foreground) px-3`}
                  >
                    Projec<span className={styles.t}>t</span>s
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className={`relative transition-all delay-0 duration-100 ease-in-out hover:-translate-y-4 text-3xl ${styles.menuItem} py-5 bg-(--color-foreground) px-3`}
                  >
                    Abou<span className={styles.t}>t</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={`relative transition-all delay-0 duration-100 ease-in-out hover:-translate-y-4 text-3xl ${styles.menuItem} py-5 bg-(--color-foreground) px-3`}
                  >
                    Contac<span className={styles.t}>t</span>
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
