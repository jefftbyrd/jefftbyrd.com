export default function BlueMinimum(props) {
  return (
    <div className="absolute w-full -z-10 bottom-0 left-0">
      <div className="grid md:grid-cols-2 gap-30 ml-0 mr-24 py-0">
        <div></div>
        <div className={`bg-(--color-foreground) h-11 `} />
      </div>
    </div>
  );
}
