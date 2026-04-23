export default function BlueAbsolute() {
  return (
    <div className="fixed w-full left-0 -z-11 h-dvh">
      <div className="bg-foreground lg:bg-transparent grid lg:grid-cols-2 gap-30 ml-0 lg:mr-24 py-0 h-full -z-10 mr-14 lg:w-auto">
        <div className=""></div>
        <div className={` sm:bg-foreground`} />
      </div>
    </div>
  );
}
