import Footer from './Footer';

// import LeftLine from './LeftLine';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="min-h-screen">
        {/* <LeftLine /> */}
        <main>{children}</main>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
