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
  const [isMobile, setIsMobile] = useState(false);
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

  // Check for mobile and layout
  useEffect(() => {
    const checkLayout = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // For mobile, always use slider mode
      if (isMobileView) {
        setIsSliderMode(true);
        return;
      }

      if (!containerRef.current || iceCreams.length === 0) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const cardWidth = 200;
      const gap = 16;
      const padding = 48;
      
      const availableWidth = containerWidth - padding;
      const cardsPerRow = Math.floor(availableWidth / (cardWidth + gap));
      
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
    if (hoveredCard !== cardId || isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x, y });
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setHoveredCard(iceCreams[index]?.id || null);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>, cardId: number) => {
    if (hoveredCard !== cardId || !isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left - rect.width / 2;
    const y = touch.clientY - rect.top - rect.height / 2;
    setMousePos({ x, y });
  };

  return (
    <section className="relative bg-gradient-to-br from-[#40DDCB] to-[#2EC4B6] min-h-screen py-28 text-center overflow-hidden">
      {/* Original PC background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div ref={containerRef} className="relative z-10 h-full flex flex-col justify-center px-6">
        {/* Titles - Original PC version */}
        <h2 className="text-6xl font-black text-white mb-6 tracking-tight drop-shadow-xl">
          OUR SIGNATURE
        </h2>
        <h2 className="text-6xl font-black text-white mb-24 tracking-tight drop-shadow-xl">
          ITALIAN RECIPES
        </h2>

        {/* GRID MODE - when all cards fit in one line */}
        {!isSliderMode && (
          <div className="flex flex-wrap justify-center gap-4">
            {iceCreams.map((ice) => (
              <IceCreamCard
                key={ice.id}
                ice={ice}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                mousePos={mousePos}
                handleMouseMove={handleMouseMove}
                handleTouchMove={handleTouchMove}
                isActive={true}
                isSliderMode={false}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}

        {/* SLIDER MODE - when cards don't fit in one line */}
        {isSliderMode && (
          <div className={`relative w-full overflow-hidden ${isMobile ? 'px-0' : 'px-6'}`}>
            {/* Slider container */}
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: isMobile 
                  ? `translateX(calc(50% - ${activeIndex * 240}px - 120px))`
                  : `translateX(calc(50% - ${activeIndex * 216}px - 108px))`,
              }}
            >
              {iceCreams.map((ice, index) => (
                <div
                  key={ice.id}
                  className={`flex-shrink-0 ${isMobile ? 'w-[220px]' : 'w-[200px]'} mx-2 transition-all duration-300`}
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
                    handleTouchMove={handleTouchMove}
                    isActive={index === activeIndex}
                    isSliderMode={true}
                    isMobile={isMobile}
                  />
                </div>
              ))}
            </div>

            {/* Active card info - Simple design for mobile, original for PC */}
            {isMobile ? (
              <div className="mt-6 px-4">
                <div
                  className="rounded-xl p-4 transition-all duration-500"
                  style={{
                    backgroundColor: iceCreams[activeIndex]?.color || '#ffffff',
                  }}
                >
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-1">
                    {iceCreams[activeIndex]?.name}
                  </h3>
                  <p className="text-white/90 leading-relaxed text-xs font-normal">
                    {iceCreams[activeIndex]?.description}
                  </p>
                </div>
              </div>
            ) : (
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
            )}

            {/* Navigation dots - Smaller on mobile */}
            <div className={`flex justify-center ${isMobile ? 'mt-4 space-x-1.5' : 'mt-6 space-x-3'}`}>
              {iceCreams.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`${isMobile ? 'w-1.5 h-1.5' : 'w-3 h-3'} rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation arrows - hidden on mobile, original on PC */}
            {!isMobile && (
              <>
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
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// IceCreamCard component - Fixed for mobile, unchanged for PC
function IceCreamCard({
  ice,
  hoveredCard,
  setHoveredCard,
  mousePos,
  handleMouseMove,
  handleTouchMove,
  isActive = true,
  isSliderMode = false,
  isMobile = false,
}: any) {
  const ingredients: Ingredient[] = ice.ingredients || [];
  const [isTouching, setIsTouching] = useState(false);

  // Handle touch events for mobile - prevent jumping
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isActive) return;
    setIsTouching(true);
    setHoveredCard(ice.id);
    
    // Prevent zoom and jumping on mobile
    if (isMobile) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    if (isSliderMode) {
      // Don't set to null in slider mode to keep ingredients visible
      return;
    }
    setHoveredCard(null);
  };

  return (
    <div
      className={`group relative ${isMobile ? 'w-full h-[200px]' : 'w-[200px] h-[250px]'} flex flex-col items-center justify-start ${isMobile ? 'pt-4' : 'pt-8'}`}
      style={{ 
        perspective: "1200px",
        // Only add touch action restriction on mobile
        ...(isMobile && { touchAction: 'pan-y' })
      }}
      onMouseEnter={() => isActive && !isMobile && setHoveredCard(ice.id)}
      onMouseLeave={() => isActive && !isMobile && !isSliderMode && setHoveredCard(null)}
      onMouseMove={(e) => isActive && !isMobile && handleMouseMove(e, ice.id)}
      onTouchStart={handleTouchStart}
      onTouchMove={(e) => {
        if (isMobile) {
          e.preventDefault(); // Prevent scroll during touch move on mobile only
        }
        isActive && handleTouchMove(e, ice.id);
      }}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ingredients orbiting */}
      {ingredients.map((ingredient: any, idx: number) => {
        let imgUrl = ingredient.url || "";
        if (imgUrl && !imgUrl.startsWith("http")) {
          imgUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${imgUrl}`;
        }
        if (!imgUrl) return null;

        // Adjust for mobile to prevent overflow
        const adjustedIngredient = isMobile 
          ? { ...ingredient, y: ingredient.y * 0.3 }
          : ingredient;
          
        const parallaxX = (adjustedIngredient.parallaxSpeed || 0.12) * (1 + idx * 0.05);
        const parallaxY = (adjustedIngredient.parallaxSpeed || 0.12) * (1 + idx * 0.05);
        const directionX = idx % 2 === 0 ? 1 : -1;
        const directionY = idx % 2 === 0 ? 1 : -1;

        const isHovered = hoveredCard === ice.id;
        const shouldShow = isHovered || (isSliderMode && isActive);

        return (
          <div
            key={idx}
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: isMobile ? "90px" : "130px",
              width: `${isMobile ? Math.min(adjustedIngredient.size, 50) : adjustedIngredient.size}px`,
              height: `${isMobile ? Math.min(adjustedIngredient.size, 50) : adjustedIngredient.size}px`,
              transform: `translate(
                calc(-50% + ${adjustedIngredient.x}px - ${
                isHovered ? mousePos.x * parallaxX * directionX : 0
              }px),
                calc(-50% + ${adjustedIngredient.y}px - ${
                isHovered ? mousePos.y * parallaxY * directionY : 0
              }px)
              ) rotate(${adjustedIngredient.rotation || 0}deg) scale(${
                shouldShow ? 1 : 0.8
              })`,
              opacity: shouldShow ? 0.95 : 0,
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
              width={isMobile ? Math.min(adjustedIngredient.size, 50) : adjustedIngredient.size}
              height={isMobile ? Math.min(adjustedIngredient.size, 50) : adjustedIngredient.size}
              className="object-contain rounded-2xl"
              style={{ 
                imageRendering: "auto",
                // Only disable selection on mobile
                ...(isMobile && { 
                  WebkitUserSelect: "none",
                  userSelect: "none",
                  WebkitTouchCallout: "none"
                })
              }}
              unoptimized
              // Only disable draggable on mobile
              draggable={!isMobile}
            />
          </div>
        );
      })}

      {/* Main gelato image with hover effect - Original PC animations */}
      <div
        className="relative z-40 transition-all duration-[600ms] ease-out group-hover:-translate-y-50 group-hover:scale-[1.25]"
        style={{
          transformStyle: "preserve-3d",
          transition: "all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      >
        <Image
          src={ice.image}
          alt={ice.name || "ice cream"}
          width={isMobile ? 120 : 180}
          height={isMobile ? 120 : 180}
          className="rounded-2xl transition-all duration-[600ms] group-hover:[transform:rotateY(20deg)_rotateZ(-12deg)]"
          style={{
            transformStyle: "preserve-3d",
            filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.4))",
            // Only disable selection on mobile
            ...(isMobile && { 
              WebkitUserSelect: "none",
              userSelect: "none",
              WebkitTouchCallout: "none"
            })
          }}
          unoptimized
          // Only disable draggable on mobile
          draggable={!isMobile}
        />
      </div>

      {/* Info card with text on hover - only in grid mode and not on mobile */}
      {!isSliderMode && !isMobile && (
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

      {/* Glowing base - Original PC version, removed on mobile */}
      {!isMobile && (
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-all duration-[500ms] z-0"
          style={{ backgroundColor: ice.color }}
        ></div>
      )}
    </div>
  );
}