export default function EmbedVimeo(props) {
  return (
    <div>
      <iframe
        src={props.vimeoEmbedUrl}
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        title={props.title}
        className="aspect-16/9 w-full"
      ></iframe>
    </div>
  );
}
