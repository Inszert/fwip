import Image from "next/image";
import { Button, HeaderImage } from "@/lib/strapi";

interface HeaderProps {
  subtitle?: string;
  buttons?: Button[];
  image?: HeaderImage | null;
}

const Header: React.FC<HeaderProps> = ({ subtitle, buttons, image }) => {
  return (
    <div className="relative w-full group">
      {/* Always-visible button texts - positioned exactly where they'll be when hovered */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-end pr-6 sm:pr-8 lg:pr-12 h-16 pointer-events-auto">
        <div className="flex flex-wrap gap-6 justify-end">
          {buttons?.map((btn, i) => (
            <span
              key={i}
              className="font-extrabold text-white text-3xl md:text-4xl transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-[-10px] cursor-default drop-shadow-lg"
            >
              {btn.text}
            </span>
          ))}
        </div>
      </div>

      {/* Hidden header that slides down on hover */}
      <header
        className="
          absolute top-0 left-0 right-0 z-30
          bg-gradient-to-r from-[#40DDCB] via-[#3DD4C4] to-[#2EC4B6] text-white shadow-lg
          transform -translate-y-full opacity-0 pointer-events-none
          group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto
          transition-all duration-500 ease-in-out
        "
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center py-5 gap-6">
            {/* Logo and subtitle section */}
            <div className="flex items-center gap-5 flex-1 min-w-0">
              {image && (
                <div className="shrink-0 transition-transform duration-300 hover:scale-110 hover:rotate-3">
                  <div className="relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`}
                      alt={image.alternativeText || "Logo"}
                      height={70}
                      width={70}
                      className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl -z-10 scale-150"></div>
                  </div>
                </div>
              )}
              {subtitle && (
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-semibold text-white tracking-wide drop-shadow-md">
                    {subtitle}
                  </p>
                </div>
              )}
            </div>

            {/* Buttons with unique shapes - hidden by default but positioned for layout */}
            <div className="flex flex-wrap gap-3 justify-center sm:justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {buttons?.map((btn, i) => (
                <a
                  key={i}
                  href={btn.url || "#"}
                  className={`
                    relative px-7 py-3 font-semibold text-white
                    transition-all duration-300 ease-out
                    border-2 border-white
                    overflow-hidden
                    hover:scale-105 hover:shadow-xl
                    ${
                      btn.color === "blue"
                        ? "bg-blue-500/90 border-blue-400 hover:border-blue-500"
                        : btn.color === "pink"
                        ? "bg-pink-500/90 border-pink-400 hover:border-pink-500"
                        : "bg-white/10 backdrop-blur-sm"
                    }
                  `}
                  style={{
                    borderRadius:
                      btn.color === "blue"
                        ? "12px"
                        : btn.color === "pink"
                        ? "20px 4px 20px 4px"
                        : "4px 20px 4px 20px",
                  }}
                >
                  <span className="relative z-10">
                    {btn.text}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </header>
    </div>
  );
};

export default Header;