const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL || "http://192.168.1.40:1337";

export interface Button {
  text: string;
  url: string | null;
  color?: string;
}

export interface HeaderImage {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface HeaderData {
  subtitle?: string;
  button?: Button[];
  image?: HeaderImage | null;
}

export async function fetchHeaderData(): Promise<HeaderData> {
  const res = await fetch(`${STRAPI}/api/headers?populate=*`);
  if (!res.ok) throw new Error("Chyba pri načítaní headera");

  const data = await res.json();
  const header = data.data[0];

  return {
    subtitle: header.subtitle,
    button: header.button || [],
    image: header.image || null,
  };
}


// lib/strapi.ts

export interface HeroVideo {
  title?: string | null;
  textField1?: string | null;
  textField2?: string | null;
  textField3?: string | null;
  video?: { url: string | null } | null;
}

export async function fetchHeroVideo(): Promise<HeroVideo | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/hero-videos?populate=*`,
    {
      cache: "no-store", // disable Next.js cache for fresh content
    }
  );

  if (!res.ok) throw new Error("Chyba pri načítaní hero videa");

  const data = await res.json();

  const hero = data.data[0];
  if (!hero || !hero.video) return null;

  return {
    title: hero.title ?? undefined,
    textField1: hero.textField1 ?? undefined,
    textField2: hero.textField2 ?? undefined,
    textField3: hero.textField3 ?? undefined,
    video: { url: hero.video.url },
  };
}


// lib/strapi.ts
export interface Ingredient {
  id: number;
  url: string;
  x: number;
  y: number;
  parallaxSpeed: number;
  size: number;
  rotation?: number;
}

export interface IceCream {
  id: number;
  name: string;
  description: string;
  color: string;
  image: string;
  ingredients?: Ingredient[];
}

// Fetch ice creams from old API (color, text, main image)
export async function fetchIceCreams(): Promise<IceCream[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/ice-creams?populate=*`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error("Failed to fetch ice creams");
    const data = await res.json();

    return data.data.map((item: any) => {
      const img = item.image;
      const imageUrl = img?.formats?.large?.url || img?.formats?.medium?.url || img?.url || "";
      const fullImageUrl = imageUrl.startsWith("http") ? imageUrl : `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`;

      return {
        id: item.id,
        name: item.name,
        description: item.description,
        color: item.color,
        image: fullImageUrl,
        ingredients: [], // empty - will merge after fetching ingredients separately
      };
    });
  } catch (error) {
    console.error("Error fetching ice creams:", error);
    return [];
  }
}



export async function fetchIngredients(): Promise<{ [iceCreamId: number]: Ingredient[] }> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/ice-creams?populate[ingredient][populate]=image`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error("Failed to fetch ingredients");
    const data = await res.json();

    const byIceCream: { [id: number]: Ingredient[] } = {};

    for (const ice of data.data) {
      const iceCreamId = ice.id;
      const ingredients = ice.ingredient || [];

      if (!Array.isArray(ingredients) || ingredients.length === 0) continue;

      byIceCream[iceCreamId] = ingredients.map((ing: any) => {
        const image = ing.image || {};
        const imageUrl =
          image.formats?.large?.url ||
          image.formats?.medium?.url ||
          image.formats?.small?.url ||
          image.url ||
          "";

        const fullImageUrl = imageUrl.startsWith("http")
          ? imageUrl
          : `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`;

        // 👇 Log this so you can see the final image link in console
        console.log("✅ Ingredient image URL:", fullImageUrl);

        return {
          id: ing.id,
          url: fullImageUrl,
          x: ing.x ?? 0,
          y: ing.y ?? 0,
          parallaxSpeed: ing.parallaxSpeed ?? 0.12,
          size: ing.size ?? 200,
          rotation: ing.rotation ?? 0,
        } as Ingredient;
      });
    }

    return byIceCream;
  } catch (error) {
    console.error("❌ Error fetching ingredients:", error);
    return {};
  }
}


/*
// Fetch ingredients and related info from new API
export async function fetchIngredients(): Promise<{ [iceCreamId: number]: Ingredient[] }> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/ice-creams?populate[ingredient][populate]=image`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error("Failed to fetch ingredients");
    const data = await res.json();

    // Map ingredients by their related ice cream
    const byIceCream: { [id: number]: Ingredient[] } = {};

    for (const ing of data.data) {
      const attrs = ing.attributes || {};
      const iceCreamRel = attrs.ice_cream?.data;
      const iceCreamId = iceCreamRel?.id;
      if (!iceCreamId) continue;

      const image = attrs.image || {};
      const imgUrl = image.formats?.large?.url || image.formats?.medium?.url || image.formats?.small?.url || image.url || "";
      const fullUrl = imgUrl.startsWith("http") ? imgUrl : `${process.env.NEXT_PUBLIC_STRAPI_URL}${imgUrl}`;

      const ingredient: Ingredient = {
        id: ing.id,
        url: fullUrl,
        x: attrs.x || 0,
        y: attrs.y || 0,
        parallaxSpeed: attrs.parallaxSpeed || 0.12,
        size: attrs.size || 200,
        rotation: attrs.rotation || 0,
      };

      if (!byIceCream[iceCreamId]) byIceCream[iceCreamId] = [];
      byIceCream[iceCreamId].push(ingredient);
    }

    return byIceCream;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return {};
  }




*/







export async function fetchMainBody() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/main-bodies?populate[mainPrimaryContent][populate]=image`,
    { next: { revalidate: 10 } } // optional caching
  );
  if (!res.ok) throw new Error("Failed to fetch MainBody data");
  return res.json();
}

// Get Portobello page data
export interface PortobelloData {
  textField1: string;
  textField2: string;
  textField3: string;
  image: {
    url: string;
    alternativeText?: string;
  } | null;
}

export async function fetchPortobelloData(): Promise<PortobelloData> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/portobellos?populate=portobelloPrimary.image`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch Portobello data");

    const json = await res.json();
    const item = json.data?.[0]?.portobelloPrimary;

    return {
      textField1: item?.textField1 || "",
      textField2: item?.textField2 || "",
      textField3: item?.textField3 || "",
      image: item?.image
        ? {
            url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.url}`,
            alternativeText: item.image.alternativeText || "",
          }
        : null,
    };
  } catch (err) {
    console.error("Error fetching Portobello data:", err);
    return { textField1: "", textField2: "", textField3: "", image: null };
  }
}


interface ImageData {
  url: string;
}

interface ImageTextComboItem {
  text?: string | null;
  image?: ImageData | null;
}

interface PortobelloSecondary {
  subtitle?: string | null;
  imageTextCombo?: ImageTextComboItem[];
}

interface PortobelloItem {
  portobelloSecondary?: PortobelloSecondary | null;
}

export async function fetchPurpleShowcaseData() {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const response = await fetch(
    `${apiUrl}/api/portobellos?populate[portobelloSecondary][populate][imageTextCombo][populate]=image`
  );
  const json: { data: PortobelloItem[] } = await response.json();

  const secondarySection = json.data.find((d: PortobelloItem) => d.portobelloSecondary)?.portobelloSecondary;
  const headline = secondarySection?.subtitle || "";

  const features =
    (secondarySection?.imageTextCombo || [])
      .filter((item: ImageTextComboItem) => item?.image)
      .map((item: ImageTextComboItem) => ({
        iconUrl: item.image?.url ? `${apiUrl}${item.image.url}` : undefined,
        heading: item.text
          ? item.text.split(" ").slice(0, 3).join(" ")
          : "",
        subtext: item.text
          ? item.text.split(" ").slice(3).join(" ")
          : ""
      }));

  return {
    headline,
    features
  };
}



export interface PromoSectionImageFormat {
  url: string;
}

export interface PromoSectionImage {
  url: string;
  alternativeText?: string;
  formats?: {
    large?: PromoSectionImageFormat;
    medium?: PromoSectionImageFormat;
    small?: PromoSectionImageFormat;
    thumbnail?: PromoSectionImageFormat;
  };
}

export interface PromoSectionData {
  backgroundColor: string;
  imagePosition: "left" | "right";
  textPosition: "left" | "right";
  row1: string;
  row2: string;
  row2Color: string;
  row3: string;
  image: PromoSectionImage;
}

export async function fetchPromoSections(): Promise<PromoSectionData[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/promo-sections?populate=image`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch PromoSection data");

    const json = await res.json();
    const items = json.data || [];
    
    return items.map((item: any) => {
      const attributes = item;
      const imageData = attributes.image || {};
      
      let imageUrl = imageData.formats?.large?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageData.formats.large.url}`
        : imageData.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageData.url}`
        : "";

      return {
        backgroundColor: attributes.backgroundColor || "#fff",
        imagePosition: attributes.imagePosition === "left" ? "left" : "right",
        textPosition: attributes.textPosition === "left" ? "left" : "right",
        row1: attributes.row1 || "",
        row2: attributes.row2 || "",
        row2Color: attributes.row2Color || "#40DDCB",
        row3: attributes.row3 || "",
        image: {
          url: imageUrl,
          alternativeText: imageData.alternativeText || "",
          formats: imageData.formats || {},
        },
      };
    });
  } catch (err) {
    console.error("Error fetching PromoSections:", err);
    return [];
  }
}