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
      {/* Sekcia s obrázkom - 100vh */}
      <section
        className="h-screen w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: 'blur(5px)'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </section>

      {/* Biela karta - visí dole z obrázka */}
      <div className="relative -top-[30vh] z-10 mx-auto">
        <div className="bg-white min-h-[60vh] p-10 md:p-14 lg:p-16 shadow-2xl rounded-t-3xl w-[90vw] mx-auto">
          <div className="text-center space-y-8">

            {/* Hlavný nadpis - NOW SMALLER SIZE */}
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#800080] uppercase tracking-tight">
                {title}
              </h1>

              {/* Podnadpis - NOW LARGER SIZE with signature color */}
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
                style={{ color: SIGNATURE_COLOR }}
              >
                {subtitle}
              </h2>
            </div>

            {/* Oddeľovacia čiara */}
            <div className="w-32 h-1.5 bg-gray-800 mx-auto"></div>

            {/* Textový obsah */}
            <div className="space-y-6 text-gray-700 max-w-6xl mx-auto">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-lg md:text-xl leading-relaxed ${highlightLastParagraph && index === paragraphs.length - 1
                      ? 'font-semibold text-gray-900'
                      : ''
                    }`}
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