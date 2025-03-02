export default function BlueAbsolute() {
  return (
    <div className="fixed w-full left-0 -z-11 h-dvh">
      <div className="bg-(--color-foreground) md:bg-transparent grid md:grid-cols-2 gap-30 ml-0 md:mr-24 py-0 h-full -z-10 w-90 sm:w-auto">
        <div className=""></div>
        {/* <div className={`bg-(--color-foreground)`} /> */}
        <div className={`bg-(--color-background) sm:bg-(--color-foreground)`} />
      </div>
    </div>
  );
}
