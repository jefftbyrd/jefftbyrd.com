// import styles from '../styles/bluevert.module.css';

export default function ProjectBlueVert(props) {
  return (
    <div className="grid md:grid-cols-2 gap-30 ml-0 mr-24 py-0">
      <div />
      <div className={`bg-(--color-foreground) px-6 ${props.height} `} />
    </div>
  );
}
