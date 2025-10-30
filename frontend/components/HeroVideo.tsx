interface HeroVideoProps {
  videoUrl: string;
}

const HeroVideo: React.FC<HeroVideoProps> = ({ videoUrl }) => {
  return (
    <div className="w-full mt-6" style={{ backgroundColor: "#40DDCB" }}>
      <video
        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${videoUrl}`}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
        className="w-full h-auto pointer-events-none select-none"
        style={{
          objectFit: "cover",
          userSelect: "none",
          WebkitUserSelect: "none"
        }}
      />
    </div>
  );
};

export default HeroVideo;
