import Image from "next/image";

interface PromoSectionImage {
  url: string;
  alternativeText?: string;
  formats?: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  };
}

interface PromoSectionData {
  backgroundColor: string;
  imagePosition: "left" | "right";
  textPosition: "left" | "right";
  row1: string;
  row2: string;
  row2Color: string;
  row3: string;
  image: PromoSectionImage;
}

// Single section component (keep this for individual rendering)
const PromoSection: React.FC<{ data: PromoSectionData }> = ({ data }) => {
  const imageUrl =
    data.image.formats?.large?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.image.formats.large.url}`
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.image.url}`;

  const isImageLeft = data.imagePosition === "left";

  return (
    <section
      className="relative w-full overflow-x-hidden h-screen"
      style={{ background: data.backgroundColor }}
    >
      {/* IMAGE - Absolute positioned */}
      {imageUrl && (
        <div
          className={`absolute top-0 h-full flex items-center ${
            isImageLeft ? "left-0" : "right-0"
          }`}
          style={{ width: "33.333%" }}
        >
          <div className="h-full flex items-center justify-center pl-8">
            <Image
              src={imageUrl}
              alt={data.image.alternativeText || "Promo"}
              width={420}
              height={680}
              className="w-auto h-full object-cover"
              unoptimized
            />
          </div>
        </div>
      )}

      {/* TEXT - Absolute positioned with offsets */}
      <div
        className={`absolute top-0 h-full flex items-center ${
          isImageLeft ? "right-0" : "left-0"
        }`}
        style={{ 
          width: "33.333%",
          marginLeft: !isImageLeft ? "15%" : "0%",
          marginRight: isImageLeft ? "10%" : "0%"
        }}
      >
        <div className={`px-12 ${isImageLeft ? "text-left" : "text-right"}`}>
          <h1 className="text-5xl md:text-6xl font-extrabold uppercase text-white drop-shadow-lg leading-tight mb-6 tracking-tight whitespace-normal">
            {data.row1}
          </h1>
          <h2
            className="text-5xl md:text-6xl font-extrabold uppercase drop-shadow-lg mb-6 tracking-tight whitespace-normal"
            style={{ color: data.row2Color }}
          >
            {data.row2}
          </h2>
          <p className="text-xl md:text-2xl font-sans text-white leading-relaxed">
            {data.row3}
          </p>
        </div>
      </div>
    </section>
  );
};

// New wrapper component for multiple sections
export const PromoSectionList: React.FC<{ data: PromoSectionData[] }> = ({ data }) => {
  return (
    <div>
      {data.map((section, index) => (
        <PromoSection key={index} data={section} />
      ))}
    </div>
  );
};

export default PromoSection;