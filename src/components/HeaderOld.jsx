import Link from 'next/link';
import styles from '../styles/header.module.css';

type Props = {
  children: React.ReactNode,
};

const MenuItem = ({ children }: Props) => {
  return (
    <li
      className={` transition-all text-3xl ${styles.menuItem} bg-(--color-foreground) px-3 hover:scale-[1.2] active:scale-[0.97] transition-all delay-0 duration-300 ease-in-out`}
    >
      {children}
    </li>
  );
};

const Header = () => {
  return (
    <header className="sticky z-100 top-0 bg-(--color-background)">
      <nav>
        <div className="grid md:grid-cols-2 gap-30 ml-0 mr-24 py-0 border-b-1 border-solid border-(--color-foreground) ">
          <div className="flex items-end px-4">
            <Link href="/">
              <h1
                className={`${styles.logo} uppercase text-4xl text-(--color-foreground) ${styles.shadowWhite} transition-all delay-100 duration-300 ease-in-out `}
              >
                Jeff <span className={styles.bump}>T</span> Byrd
              </h1>
            </Link>
          </div>
          <div className="px-4 py-5 bg-(--color-foreground) border-b-(--color-vivid) border-b-1">
            <nav className="layout flex items-center justify-center py-0">
              <ul className="flex items-center justify-between space-x-3 md:space-x-4 md:text-base font-extralight uppercase text-3xl text-white ">
                <MenuItem>
                  <Link href="/projects">
                    Projec<span className={styles.t}>t</span>s
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/about">
                    Abou<span className={styles.t}>t</span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/contact">
                    Con<span className={styles.t}>t</span>ac
                    <span className={styles.t}>t</span>
                  </Link>
                </MenuItem>
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
