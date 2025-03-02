type Props = {
  images: string;
};

export default function AdditionalImages(props: Props) {
  return (
    <div className="flex flex-col gap-2 lg:gap-4">
      {props.images.split(',').map((image) => (
        <img key={image} src={`/images/additional/${image.trim()}`} />
      ))}
    </div>
  );
}
