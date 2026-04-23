type Props = {
  youtubeEmbedUrl: string;
};

export default function EmbedYoutube(props: Props) {
  return (
    <div>
      <iframe
        className="aspect-video w-full"
        src={props.youtubeEmbedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
