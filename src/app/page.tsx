'use client';
import Header2 from '@/components/Header2';
import { useRef } from 'react';
import Collaborate from '../components/Collaborate';
import Contact from '../components/Contact';
import Layout from '../components/Layout';
import Logo from '../components/Logo';
import Reel from '../components/Reel';
import Selected from '../components/Selected';

export default async function Index() {
  const heroRef = useRef(null);
  return (
    <Layout>
      <Header2 heroRef={heroRef} />
      <div className="max-w-none mx-auto px-0 grid">
        <section
          ref={heroRef}
          className="md:mt-12 mt-2 lg:mb-12 mb-6 z-100 relative"
        >
          <Logo />
          <h4 className="text-center lg:text-lg font-normal p-1">
            Original music for documentary, podcast, and narrative audio.
          </h4>
        </section>
      </div>

      <div className="gap-6 lg:gap-12 landing flex flex-col pb-24">
        <div className="px-8 lg:px-36 lg:gap-24 flex flex-col">
          <Reel />
        </div>
        <Selected />
        <div className="lg:grid grid-cols-5 px-4 lg:px-12">
          <Collaborate />
          <Contact />
        </div>
      </div>
    </Layout>
  );
}
