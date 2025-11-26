import Image from "next/image";
import { PortobelloData } from "@/lib/strapi";

interface PortobelloSectionProps {
  data: PortobelloData;
}

const PortobelloSection: React.FC<PortobelloSectionProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#40DDCB] to-[#2EC4B6] overflow-hidden"
    >
      {/* Image background: centered horizontally at bottom */}
      {data.image && (
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
          <Image
            src={data.image.url}
            alt={data.image.alternativeText || "Portobello image"}
            width={900}
            height={900}
            className="max-h-[90vh] w-auto object-contain object-center-bottom select-none"
            style={{ zIndex: 1 }}
            priority
            unoptimized
          />
        </div>
      )}

      {/* Centered overlay text */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 md:px-0">
        <h2 className="text-4xl md:text-5xl font-extrabold uppercase text-white drop-shadow-xl mb-4 leading-tight">
          {data.textField1}
        </h2>
        <h1 className="text-[6vw] md:text-[7vw] font-extrabold uppercase text-white drop-shadow-2xl leading-none mb-4">
          {data.textField2}
        </h1>
        <p className="text-lg md:text-2xl font-bold text-white drop-shadow-md mt-6">
          {data.textField3}
        </p>
      </div>

      {/* Decorative blur elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-72 h-72 bg-white rounded-full filter blur-3xl opacity-20 mix-blend-overlay"></div>
        <div className="absolute bottom-[20%] right-[30%] w-64 h-64 bg-white rounded-full filter blur-3xl opacity-20 mix-blend-overlay"></div>
      </div>
    </section>
  );
};

export default PortobelloSection;