const PurpleShowcase: React.FC<{
  headline: string,
  features: { iconUrl?: string, heading: string, subtext: string }[]
}> = ({ headline, features }) => (
  <section className="w-full min-h-screen bg-[#5d22d2] py-16 md:py-24 px-4 flex flex-col items-center justify-center relative">
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-[#40DDCB] text-4xl md:text-6xl font-extrabold uppercase text-center leading-tight mb-10 md:mb-16 drop-shadow-xl max-w-5xl">
        {headline}
      </h1>
      <div className="w-full max-w-6xl flex flex-wrap items-start justify-center gap-8 md:gap-14">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center justify-center flex-1 min-w-[150px] max-w-[220px]">
            {f.iconUrl && (
              <img
                src={f.iconUrl}
                alt={f.heading}
                width={60}
                height={60}
                className="mb-4"
                style={{ objectFit: "contain" }}
              />
            )}
            <div className="text-center">
              <div className="text-white font-extrabold text-lg mb-1">{f.heading}</div>
              <div className="text-white text-base opacity-80 font-medium">{f.subtext}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
export default PurpleShowcase;