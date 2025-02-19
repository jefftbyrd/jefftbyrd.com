export default function AdditionalImages(props) {
  return (
    <div className="flex flex-col gap-4">
      {props.images.split(',').map((image) => (
        <img key={image} src={`/images/additional/${image.trim()}`} />
      ))}
    </div>
  );
}
