import styles from '../styles/pageTitle.module.css';

type Props = {
  pageTitle: string;
};

export default function PageTitle(props: Props) {
  const wrapTLetters = (text: string) => {
    return text.split('').map((char, index) => {
      if (char.toLowerCase() === 't') {
        return (
          <span key={index} className={styles.bigBump}>
            {char}
          </span>
        );
      }
      return char;
    });
  };

  return (
    <h1 className="mx-4 lg:mx-0 pt-12 -mb-7 lg:-mb-13 font-primary text-white uppercase leading-none font-bold lg:px-24 text-6xl tracking-wide lg:text-[calc(24px+(212-24)*((100vw-300px)/(1600-300)))] overflow-hidden">
      {wrapTLetters(props.pageTitle)}
    </h1>
  );
}
