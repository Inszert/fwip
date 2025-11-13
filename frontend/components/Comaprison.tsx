import React from "react";

const SIGNATURE_COLOR = "#40DDCB";

// Type Interfaces
interface ComparisonType {
  id: number;
  name: string | null;
  image?: { url: string }[];
}

interface PropertyResult {
  id: number;
  result: boolean;
}

interface ComparisonProperty {
  id: number;
  property: string;
  result: PropertyResult[];
}

interface Button {
  id: number;
  text: string;
  url: string;
  color?: string | null;
}

interface ComparisonData {
  id: number;
  text1: string;
  text2: string;
  button: Button;
  types: ComparisonType[];
  property: ComparisonProperty[];
}

// SVG Icons
const CheckIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke={SIGNATURE_COLOR}
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface Props {
  data: ComparisonData;
}

export default function Comparison({ data }: Props) {
  const types: ComparisonType[] = data.types;
  const properties: ComparisonProperty[] = data.property;

  return (
    <section className="w-full h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-16">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-6 lg:px-8 items-start gap-12">
        {/* Left Side */}
        <div className="w-full lg:w-2/5">
          <div className="max-w-md">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-gray-900 tracking-tight">
              {data.text1.split(" ").map((word: string) =>
                word.toUpperCase() === "FWIP" ? (
                  <span
                    key={word}
                    className="px-1 rounded-lg"
                    style={{
                      color: SIGNATURE_COLOR,
                      backgroundColor: `${SIGNATURE_COLOR}20`,
                    }}
                  >
                    {word}
                  </span>
                ) : (
                  <span key={word}>{word} </span>
                )
              )}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">{data.text2}</p>
            <a
              href={data.button.url}
              className="inline-flex items-center justify-center text-white px-8 py-4 rounded-xl text-base font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
              style={{
                backgroundColor: SIGNATURE_COLOR,
                boxShadow: `0 4px 14px ${SIGNATURE_COLOR}55`,
              }}
            >
              {data.button.text}
            </a>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="w-full lg:w-3/5">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-5">
              {/* Features Header - Neutral background */}
              <div className="p-6 font-semibold border-r border-gray-100 flex items-center text-gray-700 bg-gray-50">
                Features
              </div>
              
              {/* Type Headers - Last column with signature color */}
              {types.map((type: ComparisonType, idx: number) => (
                <div
                  key={type.id}
                  className={`p-6 text-center font-semibold ${
                    idx < types.length - 1 ? "border-r border-gray-100" : "border-r border-white/30"
                  } ${
                    // Apply signature color only to the last column
                    idx === types.length - 1 
                      ? "text-white"
                      : "text-gray-700 bg-gray-50"
                  }`}
                  style={{
                    background: idx === types.length - 1 
                      ? `linear-gradient(180deg, ${SIGNATURE_COLOR}, ${SIGNATURE_COLOR}CC)`
                      : undefined,
                  }}
                >
                  {type.image && type.image.length > 0 ? (
                    <div className="flex flex-col items-center space-y-3">
                      <div className={`p-3 rounded-xl ${
                        idx === types.length - 1 ? "bg-white/20 backdrop-blur-sm" : "bg-gray-100"
                      }`}>
                        <img
                          src={
                            process.env.NEXT_PUBLIC_STRAPI_URL
                              ? process.env.NEXT_PUBLIC_STRAPI_URL + type.image[0].url
                              : type.image[0].url
                          }
                          alt={type.name || "Logo"}
                          className={`h-12 w-auto ${
                            idx === types.length - 1 ? "filter brightness-0 invert" : ""
                          }`}
                        />
                      </div>
                      {type.name && (
                        <span className="text-sm font-medium">{type.name}</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-lg">{type.name}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Feature Rows */}
            <div className="divide-y divide-gray-100">
              {properties.map((prop: ComparisonProperty) => (
                <div
                  key={prop.id}
                  className="grid grid-cols-5 transition-colors hover:bg-gray-50/50"
                >
                  {/* Feature Name - Neutral background */}
                  <div className="p-6 font-semibold text-gray-700 border-r border-gray-100 flex items-center bg-white">
                    {prop.property}
                  </div>
                  
                  {/* Results - Last column with signature color background */}
                  {prop.result.map((res: PropertyResult, i: number) => (
                    <div
                      key={res.id}
                      className={`p-6 flex items-center justify-center ${
                        i < prop.result.length - 1 ? "border-r border-gray-100" : "border-r border-white/30"
                      } ${
                        // Apply background color only to the last column
                        i === prop.result.length - 1 
                          ? ""
                          : "bg-white"
                      }`}
                      style={{
                        backgroundColor: i === prop.result.length - 1 
                          ? SIGNATURE_COLOR
                          : undefined,
                      }}
                    >
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-lg"
                        style={{
                          backgroundColor: res.result
                            ? i === prop.result.length - 1 
                              ? "white"
                              : `${SIGNATURE_COLOR}20`
                            : i === prop.result.length - 1
                            ? "rgba(255,255,255,0.2)"
                            : "#f3f4f6",
                        }}
                      >
                        {res.result ? (
                          <CheckIcon />
                        ) : (
                          i === prop.result.length - 1 ? (
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <CrossIcon />
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}