interface MainPrimaryProps {
  title: string;
  content: string;
  imageUrl: string;
}

const MainPrimary: React.FC<MainPrimaryProps> = ({ title, content, imageUrl }) => {
  return (
    <section
      className="relative w-full overflow-x-hidden h-screen" // Changed to h-screen
      style={{ background: "linear-gradient(135deg, #40DDCB 0%, #2EC4B6 100%)" }}
    >
      <div className="flex w-full h-full">
        {/* Reduced left spacer */}
        <div className="hidden md:block flex-none" style={{ width: "5vw" }}></div>
        
        {/* Main content: text + image */}
        <div className="flex flex-1 flex-row items-center h-full"> {/* Added h-full */}
          {/* Text content - flexible width */}
          <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 flex-1 text-left min-w-0 h-full"> {/* Added h-full */}
            <h1 className="text-4xl md:text-5xl font-extrabold uppercase text-white drop-shadow-lg leading-tight mb-6 tracking-tight whitespace-normal">
              {title}
            </h1>
            <p className="text-4xl md:text-5xl font-extrabold uppercase text-white drop-shadow-lg leading-tight tracking-tight whitespace-normal">
              {content}
            </p>
          </div>

          {/* Image container - only show when imageUrl exists */}
          {imageUrl && (
            <div className="flex items-center justify-center flex-shrink-0 h-full" style={{ width: "33.333%" }}> {/* Removed fixed height */}
              <img
                src={imageUrl}
                alt={title}
                className="w-auto max-w-none h-full object-cover rounded-none shadow-none"
                style={{ border: "none", background: "none" }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainPrimary;