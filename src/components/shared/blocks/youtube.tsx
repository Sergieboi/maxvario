const YoutubeBlock: React.FC<{ url: string }> = ({ url }) => {
  const videoId = url.split("v=")[1];
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      className="aspect-video w-full border-0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};
export default YoutubeBlock;
