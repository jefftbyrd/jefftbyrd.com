type Props = {
  pageTitle: string;
};

export default function PageTitle(props: Props) {
  return (
    <h1 className="pt-12 -mb-13 font-primary text-white uppercase leading-none font-bold lg:px-24 text-6xl tracking-wide lg:text-[calc(24px+(212-24)*((100vw-300px)/(1600-300)))] overflow-hidden">
      {props.pageTitle}
    </h1>
  );
}
