export default function Contact() {
  return (
    <div className="m-0 col-span-2 p-12">
      <h2>Contact</h2>
      <h3>
        If you're working on a project that needs music or sound, I'd love to
        hear about it.
      </h3>
      {/* <p className="lg:text-2xl mt-6 font-semibold hover:scale-105 origin-left duration-100">
        <a
          href="mailto:jeff@jefftbyrd.com"
          className="inline bg-white/40 hover:bg-white/60 py-1 px-2 border border-foreground/30 transition-colors duration-100"
        >
          jeff@jefftbyrd.com
        </a>
      </p> */}
      <div
        className={`bg-white/70 hover:bg-white text-foreground font-semibold md:font-medium tracking-wide text-xl lg:text-2xl hover:scale-105 active:scale-97 origin-left transition-all ease-in-out lg:mx-0 border-3 lg:border-4 border-solid border-foreground inline-block mt-2`}
      >
        <a
          className="block px-5 py-3"
          href="mailto:jeff@jefftbyrd.com"
          target="_blank"
        >
          &gt; jeff@jefftbyrd.com
        </a>
      </div>
    </div>
  );
}
