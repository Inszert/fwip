"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IceCream, fetchIceCreams } from "@/lib/strapi";
import { Ingredient, fetchIngredients } from "@/lib/strapi";

interface MousePosition {
  x: number;
  y: number;
}

export default function SignatureRecipes() {
  const [iceCreams, setIceCreams] = useState<IceCream[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    async function loadData() {
      const iceCreamsData = await fetchIceCreams();
      const ingredientsData = await fetchIngredients();

      const merged = iceCreamsData.map((ice) => ({
        ...ice,
        ingredients: ingredientsData[ice.id] || [],
      }));

      setIceCreams(merged);
    }

    loadData();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
    if (hoveredCard !== cardId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x, y });
  };

  return (
    <section className="relative bg-gradient-to-br from-[#40DDCB] to-[#2EC4B6] py-28 text-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Titles */}
        <h2 className="text-6xl font-black text-white mb-6 tracking-tight drop-shadow-xl">
          OUR SIGNATURE
        </h2>
        <h2 className="text-6xl font-black text-white mb-24 tracking-tight drop-shadow-xl">
          ITALIAN RECIPES
        </h2>

        {/* Ice cream cards */}
        <div className="flex flex-wrap justify-center gap-1 px-6">
          {iceCreams.map((ice) => (
            <div
              key={ice.id}
              className="group relative w-[200px] h-[250px] flex flex-col items-center justify-start pt-8"
              style={{ perspective: "1200px" }}
              onMouseEnter={() => setHoveredCard(ice.id)}
              onMouseLeave={() => {
                setHoveredCard(null);
                setMousePos({ x: 0, y: 0 });
              }}
              onMouseMove={(e) => handleMouseMove(e, ice.id)}
            >
              {/* Ingredients orbiting */}
              {ice.ingredients?.map((ingredient, idx) => {
                let imgUrl = ingredient.url || "";
                if (imgUrl && !imgUrl.startsWith("http")) {
                  imgUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${imgUrl}`;
                }
                if (!imgUrl) return null;

                // Each ingredient gets its own parallax factor
                const parallaxX = (ingredient.parallaxSpeed || 0.12) * (1 + idx * 0.05);
                const parallaxY = (ingredient.parallaxSpeed || 0.12) * (1 + idx * 0.05);

                // Every second ingredient moves in opposite direction
                const directionX = idx % 2 === 0 ? 1 : -1;
                const directionY = idx % 2 === 0 ? 1 : -1;

                return (
                  <div
                    key={idx}
                    className="absolute pointer-events-none"
                    style={{
                      left: "50%",
                      top: "130px",
                      width: `${ingredient.size}px`,
                      height: `${ingredient.size}px`,
                      transform: `translate(
                        calc(-50% + ${ingredient.x}px - ${
                        hoveredCard === ice.id ? mousePos.x * parallaxX * directionX : 0
                      }px),
                        calc(-50% + ${ingredient.y}px - ${
                        hoveredCard === ice.id ? mousePos.y * parallaxY * directionY : 0
                      }px)
                      ) rotate(${ingredient.rotation || 0}deg) scale(${
                        hoveredCard === ice.id ? 1 : 0.8
                      })`,
                      opacity: hoveredCard === ice.id ? 0.95 : 0,
                      transitionProperty: "opacity, transform",
                      transitionDuration: "300ms, 100ms",
                      transitionTimingFunction: "ease-out, ease-out",
                      filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.14))",
                      zIndex: 50,
                    }}
                  >
                    <Image
                      src={imgUrl}
                      alt="ingredient"
                      width={ingredient.size}
                      height={ingredient.size}
                      className="object-contain rounded-2xl"
                      style={{ imageRendering: "auto" }}
                      unoptimized
                    />
                  </div>
                );
              })}

              {/* Main gelato image with hover effect */}
              <div
                className="relative z-40 transition-all duration-[600ms] ease-out group-hover:-translate-y-50 group-hover:scale-[1.25]"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                }}
              >
                <Image
                  src={ice.image}
                  alt={ice.name}
                  width={180}
                  height={180}
                  className="rounded-2xl transition-all duration-[600ms] group-hover:[transform:rotateY(20deg)_rotateZ(-12deg)]"
                  style={{
                    transformStyle: "preserve-3d",
                    filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.4))",
                  }}
                  unoptimized
                />
              </div>

              {/* Info card with text on hover */}
              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-[2rem] shadow-2xl p-6 pt-16 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-[500ms] ease-out z-30"
                style={{
                  backgroundColor: ice.color,
                  height: "200px",
                  width: "110%",
                }}
              >
                <div className="opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[400ms] delay-150">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wide mb-1">
                    {ice.name}
                  </h3>
                  <p className="text-white/90 leading-relaxed text-sm font-normal">
                    {ice.description}
                  </p>
                </div>
              </div>

              {/* Glowing base */}
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-all duration-[500ms] z-0"
                style={{ backgroundColor: ice.color }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
