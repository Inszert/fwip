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
  id?: number;
  text1?: string;
  text2?: string;
  button?: Button;
  types?: ComparisonType[];
  property?: ComparisonProperty[];
}

// Icons
const CheckIcon = ({ color }: { color?: string }) => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    fill="none"
    stroke={color || "#ffffff"}
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon = ({ color }: { color?: string }) => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    fill="none"
    stroke={color || "#9CA3AF"}
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface Props {
  data?: ComparisonData;
}

export default function Comparison({ data }: Props) {
  const types: ComparisonType[] = data?.types || [];
  const properties: ComparisonProperty[] = data?.property || [];
  const text1 = data?.text1 || "";
  const text2 = data?.text2 || "";
  const button = data?.button || { id: 0, text: "", url: "#" };

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16 lg:py-20">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-start gap-8 lg:gap-12 xl:gap-16">
        {/* Left Side */}
        <div className="w-full lg:w-2/5 mb-8 lg:mb-0">
          <div className="max-w-md mx-auto lg:mx-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-gray-900 tracking-tight">
              {text1.split(" ").map((word: string, index: number) =>
                word.toUpperCase() === "FWIP" ? (
                  <span
                    key={index}
                    className="px-1 rounded-lg"
                    style={{ color: SIGNATURE_COLOR }}
                  >
                    {word}
                  </span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
              {text2}
            </p>
            <a
              href={button.url}
              className="inline-flex items-center justify-center text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
              style={{
                backgroundColor: SIGNATURE_COLOR,
                boxShadow: `0 4px 14px ${SIGNATURE_COLOR}55`,
              }}
            >
              {button.text}
            </a>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="w-full lg:w-3/5">
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-5">
              <div className="p-4 font-semibold flex items-center text-gray-700 bg-gray-50 text-sm sm:text-base"></div>
              {types.map((type: ComparisonType, idx: number) => (
                <div
                  key={type.id}
                  className={`p-4 text-center font-semibold ${
                    idx === types.length - 1
                      ? "text-white"
                      : "text-gray-700 bg-gray-50"
                  }`}
                  style={{
                    background: idx === types.length - 1 ? SIGNATURE_COLOR : undefined,
                  }}
                >
                  {type.image && type.image.length > 0 ? (
                    <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                      <div
                        className={`p-2 sm:p-3 rounded-lg ${
                          idx === types.length - 1
                            ? "bg-white/20 backdrop-blur-sm"
                            : "bg-gray-100"
                        }`}
                      >
                        <img
                          src={type.image[0].url}
                          alt={type.name || "Logo"}
                          className={`h-8 sm:h-10 lg:h-12 w-auto ${
                            idx === types.length - 1 ? "filter brightness-0 invert" : ""
                          }`}
                        />
                      </div>
                      {type.name && (
                        <span className="text-xs sm:text-sm font-medium break-words">
                          {type.name}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm sm:text-base lg:text-lg break-words">
                      {type.name}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Feature Rows */}
            <div>
              {properties.map((prop: ComparisonProperty) => (
                <div key={prop.id} className="grid grid-cols-5">
                  <div className="p-4 font-medium text-gray-700 flex items-center bg-white text-sm sm:text-base break-words">
                    {prop.property}
                  </div>
                  {types.map((type, i) => {
                    const res = prop.result[i]; // align result to type column
                    const isLastColumn = i === types.length - 1;

                    return (
                      <div
                        key={type.id}
                        className="p-4 flex items-center justify-center"
                        style={{
                          background: isLastColumn ? SIGNATURE_COLOR : "transparent",
                        }}
                      >
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            isLastColumn ? "bg-white" : "bg-white border-2"
                          }`}
                          style={{
                            borderColor: isLastColumn ? "transparent" : SIGNATURE_COLOR,
                          }}
                        >
                          {res?.result ? (
                            <CheckIcon color={isLastColumn ? SIGNATURE_COLOR : SIGNATURE_COLOR} />
                          ) : (
                            <CrossIcon color={isLastColumn ? "#ffffff" : "#9CA3AF"} />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
