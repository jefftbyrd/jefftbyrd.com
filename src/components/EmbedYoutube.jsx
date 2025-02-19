export default function EmbedYoutube(props) {
  return (
    <div>
      <iframe
        className="aspect-16/9 w-full"
        src={props.youtubeEmbedUrl}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
}
