import React from 'react';

const SIGNATURE_COLOR = "#40DDCB";

interface TopSectionZariadeniaProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  highlightLastParagraph?: boolean;
}

const TopSectionZariadenia: React.FC<TopSectionZariadeniaProps> = ({
  backgroundImage,
  title,
  subtitle,
  paragraphs,
  highlightLastParagraph = true
}) => {
  return (
    <div className="relative">
      {/* Background image */}
      <section
        className="h-screen w-full bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${backgroundImage})`, filter: 'blur(5px)' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </section>

      {/* White card overlapping background */}
      <div className="relative -top-[20vh] md:-top-[30vh] z-10 mx-auto">
        <div className="bg-white min-h-[auto] md:min-h-[60vh] p-6 sm:p-8 md:p-14 lg:p-16 shadow-2xl rounded-t-3xl w-[90vw] max-w-6xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8">

            {/* Titles */}
            <div className="space-y-2 sm:space-y-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#800080] uppercase">
                {title}
              </h1>
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold"
                style={{ color: SIGNATURE_COLOR }}
              >
                {subtitle}
              </h2>
            </div>

            {/* Divider */}
            <div className="w-20 h-1.5 bg-gray-800 mx-auto"></div>

            {/* Paragraphs */}
            <div className="space-y-4 sm:space-y-6 text-gray-700 px-2 sm:px-4 md:px-0">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-base sm:text-lg md:text-xl leading-relaxed ${highlightLastParagraph && index === paragraphs.length - 1 ? 'font-semibold text-gray-900' : ''}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSectionZariadenia;
