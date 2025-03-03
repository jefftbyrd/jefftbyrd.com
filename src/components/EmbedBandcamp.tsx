type Props = {
  bandcampEmbedUrl: string;
};

export default function EmbedBandcamp(props: Props) {
  return (
    <div className="w-full h-full m-0 p-0">
      <iframe
        // style={{ border: '0', width: '350px', height: '654px' }}
        className="w-full aspect-auto h-[600px] md:h-[900px] m-0 p-0"
        src={props.bandcampEmbedUrl}
        seamless
      ></iframe>
    </div>
  );
}
