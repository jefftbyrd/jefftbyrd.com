export default function Contact() {
  return (
    <div className="m-0 col-span-2 p-4 lg:p-12">
      <h2>Contact</h2>
      <h3>
        If you're working on a project that needs music or sound, I'd love to
        hear about it.
      </h3>
      <p className="lg:text-2xl mt-6 font-semibold hover:scale-105 origin-left duration-100">
        <a
          href="mailto:jeff@jefftbyrd.com"
          className="inline bg-white/40 hover:bg-white/60 py-1 px-2 border border-foreground/30 transition-colors duration-100"
        >
          jeff@jefftbyrd.com
        </a>
      </p>
    </div>
  );
}
