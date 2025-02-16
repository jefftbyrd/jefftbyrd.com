// import styles from '../styles/bluevert.module.css';

export default function BlueVertGrid(props) {
  return (
    <div className="grid md:grid-cols-2 fixed -z-100">
      <div></div>
      <div
        className={`bg-(--color-foreground) px-6 ${props.height}  w-196 mr-18 -mt-18`}
      ></div>
    </div>

    // <div className="grid md:grid-cols-2 gap-30 ml-0 mr-24 py-0 fixed -z-100 right-12">
    //   <div />
    //   <div
    //     className={`bg-(--color-foreground) px-6 ${props.height} absolute mr-12 w-196 `}
    //   />
    // </div>
  );
}
