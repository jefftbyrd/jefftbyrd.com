export default function PageTitle(props) {
  return (
    <div className="">
      <h1 className="font-primary text-white uppercase leading-none py-0 font-bold px-24 text-[calc(24px+(212-24)*((100vw-300px)/(1600-300)))] overflow-hidden">
        {props.pageTitle}
      </h1>
      <div className="absolute w-full -z-10 bottom-0 left-0">
        <div className="grid md:grid-cols-2 gap-30 ml-0 mr-24 py-0">
          <div></div>
          <div className={`bg-(--color-foreground) h-11 `} />
        </div>
      </div>
    </div>
  );
}
