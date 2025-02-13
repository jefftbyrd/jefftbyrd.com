import styles from '../styles/bluevert.module.css';

export default function ProjectBlueVert(props) {
  return (
    <div
      className={`${styles.blueVert} w-2xl ${props.height} justify-self-end`}
    ></div>
  );
}
