export default function PageTitle(props) {
  return (
    <h1 className="font-primary text-white uppercase leading-none font-bold mb-2 px-12 text-[calc(24px+(200-24)*((100vw-300px)/(1600-300)))]">
      {props.pageTitle}
    </h1>
  );
}
