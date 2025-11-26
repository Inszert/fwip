interface MainPrimaryProps {
  title: string;
  content: string;
  imageUrl: string;
}

const MainPrimary: React.FC<MainPrimaryProps> = ({ title, content, imageUrl }) => {
  return (
    <section
      className="relative w-full overflow-hidden h-screen"
      style={{ background: "linear-gradient(135deg, #40DDCB 0%, #2EC4B6 100%)" }}
    >
      <div className="flex w-full h-full">
        {/* Left spacer only for PC */}
        <div className="hidden md:block flex-none" style={{ width: "5vw" }}></div>

        {/* Main content */}
        <div className="flex flex-1 h-full flex-col md:flex-row">
          
          {/* Image container */}
          {imageUrl && (
            <div className="relative w-full h-full md:w-1/3 md:h-full flex-shrink-0">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />

              {/* Mobile text overlay */}
              <div className="absolute inset-0 flex flex-col justify-end md:hidden p-6">
                <div className=" bg-opacity-40 p-4 rounded-md">
                  <h1 className="text-4xl font-extrabold uppercase text-white drop-shadow-lg mb-2">
                    {title}
                  </h1>
                  <p className="text-2xl font-extrabold uppercase text-white drop-shadow-lg">
                    {content}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Text content for PC */}
          <div className="hidden md:flex flex-col justify-center px-8 md:px-12 lg:px-16 flex-1 text-left h-full">
            <h1 className="text-4xl md:text-5xl font-extrabold uppercase text-white drop-shadow-lg leading-tight mb-6 tracking-tight whitespace-normal">
              {title}
            </h1>
            <p className="text-4xl md:text-5xl font-extrabold uppercase text-white drop-shadow-lg leading-tight tracking-tight whitespace-normal">
              {content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPrimary;
