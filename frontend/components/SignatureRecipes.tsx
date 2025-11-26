"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
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
  const [isSliderMode, setIsSliderMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function loadData() {
      const iceCreamsData = await fetchIceCreams();
      const ingredientsData = await fetchIngredients();

      const merged = iceCreamsData.map((ice) => ({
        ...ice,
        ingredients: ingredientsData[ice.id] || [],
      }));

      setIceCreams(merged);
      setHoveredCard(merged[0]?.id || null);
    }

    loadData();
  }, []);

  // Check if we need slider mode based on container width
  useEffect(() => {
    const checkLayout = () => {
      if (!containerRef.current || iceCreams.length === 0) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const cardWidth = 200; // width of each card
      const gap = 16; // gap between cards
      const padding = 48; // total horizontal padding
      
      // Calculate how many cards can fit in the container
      const availableWidth = containerWidth - padding;
      const cardsPerRow = Math.floor(availableWidth / (cardWidth + gap));
      
      // Only use slider mode if we can't fit all cards in one row
      setIsSliderMode(cardsPerRow < iceCreams.length);
    };

    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => window.removeEventListener('resize', checkLayout);
  }, [iceCreams.length]);

  // Auto-slide for slider mode
  useEffect(() => {
    if (!isSliderMode || iceCreams.length === 0) return;
    
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % iceCreams.length;
        setHoveredCard(iceCreams[nextIndex].id);
        return nextIndex;
      });
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isSliderMode, iceCreams]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
    if (hoveredCard !== cardId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x, y });
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setHoveredCard(iceCreams[index].id);
    
    // Reset auto-slide timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-[#40DDCB] to-[#2EC4B6] h-screen min-h-[100vh] py-28 text-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div ref={containerRef} className="relative z-10 h-full flex flex-col justify-center">
        {/* Titles */}
        <h2 className="text-6xl font-black text-white mb-6 tracking-tight drop-shadow-xl">
          OUR SIGNATURE
        </h2>
        <h2 className="text-6xl font-black text-white mb-24 tracking-tight drop-shadow-xl">
          ITALIAN RECIPES
        </h2>

        {/* GRID MODE - when all cards fit in one line */}
        {!isSliderMode && (
          <div className="flex flex-wrap justify-center gap-4 px-6">
            {iceCreams.map((ice) => (
              <IceCreamCard
                key={ice.id}
                ice={ice}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                mousePos={mousePos}
                handleMouseMove={handleMouseMove}
                isActive={true}
                isSliderMode={false}
              />
            ))}
          </div>
        )}

        {/* SLIDER MODE - when cards don't fit in one line */}
        {isSliderMode && (
          <div className="relative w-full overflow-hidden px-6">
            {/* Slider container */}
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(calc(50% - ${activeIndex * 216}px - 108px))`,
              }}
            >
              {iceCreams.map((ice, index) => (
                <div
                  key={ice.id}
                  className="flex-shrink-0 w-[200px] mx-2 transition-all duration-300"
                  style={{
                    opacity: index === activeIndex ? 1 : 0.4,
                    transform: index === activeIndex ? 'scale(1)' : 'scale(0.85)',
                  }}
                >
                  <IceCreamCard
                    ice={ice}
                    hoveredCard={index === activeIndex ? ice.id : null}
                    setHoveredCard={setHoveredCard}
                    mousePos={mousePos}
                    handleMouseMove={handleMouseMove}
                    isActive={index === activeIndex}
                    isSliderMode={true}
                  />
                </div>
              ))}
            </div>

            {/* Active card info (always visible in slider mode) */}
            <div className="mt-8 max-w-md mx-auto">
              <div
                className="rounded-[2rem] shadow-2xl p-6 transition-all duration-500"
                style={{
                  backgroundColor: iceCreams[activeIndex]?.color || '#ffffff',
                }}
              >
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide mb-3">
                  {iceCreams[activeIndex]?.name}
                </h3>
                <p className="text-white/90 leading-relaxed text-sm font-normal">
                  {iceCreams[activeIndex]?.description}
                </p>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center mt-6 space-x-3">
              {iceCreams.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={() => goToSlide((activeIndex - 1 + iceCreams.length) % iceCreams.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => goToSlide((activeIndex + 1) % iceCreams.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// IceCreamCard component with adjusted Y-axis positioning for ingredients
function IceCreamCard({
  ice,
  hoveredCard,
  setHoveredCard,
  mousePos,
  handleMouseMove,
  isActive = true,
  isSliderMode = false,
}: any) {
  const ingredients: Ingredient[] = ice.ingredients || [];

  // Function to adjust ingredient Y position for slider mode
  const getAdjustedIngredientPosition = (ingredient: any) => {
    if (!isSliderMode) {
      return ingredient; // Return original in grid mode
    }
    
    // In slider mode, reduce the Y position to bring ingredients closer to center
    return {
      ...ingredient,
      y: ingredient.y * 0.2, // Reduce Y position by 40% to bring closer to center
    };
  };

  return (
    <div
      className="group relative w-[200px] h-[250px] flex flex-col items-center justify-start pt-8"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => isActive && setHoveredCard(ice.id)}
      onMouseLeave={() => isActive && setHoveredCard(null)}
      onMouseMove={(e) => isActive && handleMouseMove(e, ice.id)}
    >
      {/* Ingredients orbiting - only show for active card in slider mode, always show in grid mode */}
      {ingredients.map((ingredient: any, idx: number) => {
        let imgUrl = ingredient.url || "";
        if (imgUrl && !imgUrl.startsWith("http")) {
          imgUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${imgUrl}`;
        }
        if (!imgUrl) return null;

        const adjustedIngredient = getAdjustedIngredientPosition(ingredient);
        const parallaxX = (adjustedIngredient.parallaxSpeed || 0.12) * (1 + idx * 0.05);
        const parallaxY = (adjustedIngredient.parallaxSpeed || 0.12) * (1 + idx * 0.05);
        const directionX = idx % 2 === 0 ? 1 : -1;
        const directionY = idx % 2 === 0 ? 1 : -1;

        return (
          <div
            key={idx}
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: "130px", // Keep the same top position
              width: `${adjustedIngredient.size}px`,
              height: `${adjustedIngredient.size}px`,
              transform: `translate(
                calc(-50% + ${adjustedIngredient.x}px - ${
                hoveredCard === ice.id ? mousePos.x * parallaxX * directionX : 0
              }px),
                calc(-50% + ${adjustedIngredient.y}px - ${
                hoveredCard === ice.id ? mousePos.y * parallaxY * directionY : 0
              }px)
              ) rotate(${adjustedIngredient.rotation || 0}deg) scale(${
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
              width={adjustedIngredient.size}
              height={adjustedIngredient.size}
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

      {/* Info card with text on hover - only in grid mode */}
      {!isSliderMode && (
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
      )}

      {/* Glowing base */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-all duration-[500ms] z-0"
        style={{ backgroundColor: ice.color }}
      ></div>
    </div>
  );
}