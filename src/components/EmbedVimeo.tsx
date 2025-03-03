type Props = {
  vimeoEmbedUrl: string;
  title: string;
};

export default function EmbedVimeo(props: Props) {
  return (
    <div>
      <iframe
        src={props.vimeoEmbedUrl}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        title={props.title}
        className="aspect-16/9 w-full"
      ></iframe>
    </div>
  );
}
