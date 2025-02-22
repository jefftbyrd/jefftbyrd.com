export default function EmbedSpotify(props) {
  return (
    <div className="w-full h-full m-0 p-0">
      <iframe
        // style="border-radius:12px"
        src={props.spotifyEmbedUrl}
        width="100%"
        height="352"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}
