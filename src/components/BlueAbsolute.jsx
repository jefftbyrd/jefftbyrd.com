export default function BlueAbsolute(props) {
  return (
    <div className="fixed w-full left-0 -z-11 h-dvh">
      <div className="grid md:grid-cols-2 gap-30 ml-0 mr-24 py-0 h-full -z-10">
        <div></div>
        <div className={`bg-(--color-foreground)`} />
      </div>
    </div>
  );
}
