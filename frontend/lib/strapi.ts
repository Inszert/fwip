const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

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
  console.log("Fetched header data:", header);
  console.log("Header image data:", header.image.url);
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
    cache: "no-store"  
       // disable Next.js cache for fresh content
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
export async function fetchHeroVideoIceCream(): Promise<HeroVideo | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/hero-video-ice-creams?populate=*`,{cache: "no-store"}
    
  
  );

  if (!res.ok) throw new Error("Chyba pri načítaní hero videa");

  const data = await res.json();
  const hero = data.data[0];

  if (!hero || !hero.video || !hero.video.length) return null;

  return {
    title: hero.title ?? undefined,
    textField1: hero.textField1 ?? undefined,
    textField2: hero.textField2 ?? undefined,
    textField3: hero.textField3 ?? undefined,
    video: { url: hero.video[0].url }, // <-- use the first video in the array
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
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/portobellos?populate=portobelloPrimary.image`,{cache: "no-store"}
     
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
            url: item.image.url,
            alternativeText: item.image.alternativeText || "",
          }
        : null,
    };
  } catch (err) {
    console.error("Error fetching Portobello data:", err);
    return { textField1: "", textField2: "", textField3: "", image: null };
  }
}


export interface ImageData {
  url: string;
  alternativeText?: string | null;
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
    `${apiUrl}/api/portobellos?populate[portobelloSecondary][populate][imageTextCombo][populate]=image`,{cache: "no-store"}
  );
  const json: { data: PortobelloItem[] } = await response.json();

  const secondarySection = json.data.find((d: PortobelloItem) => d.portobelloSecondary)?.portobelloSecondary;
  const headline = secondarySection?.subtitle || "";

  const features =
    (secondarySection?.imageTextCombo || [])
      .filter((item: ImageTextComboItem) => item?.image)
      .map((item: ImageTextComboItem) => ({
        iconUrl: item.image?.url ? item.image.url : undefined,
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
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/promo-sections?populate=image`,{cache: "no-store"}
     
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


// lib/strapi.ts
export interface HwdOption {
  id: number;
  text: string | null;
  orientacion: string | null;
  image: {
    url: string;
    width: number;
    height: number;
  } | null;
}

export interface PortobelloHwd {
  id: number;
  textField1: string;
  textField2: string;
  textField3: string;
  button?: { text: string; url: string; color: string }[];
  color?: string;
  hwdOptions: HwdOption[];
}

export interface PortobelloHwdItem {
  id: number;
  portobelloHwd: PortobelloHwd | null;
}

export async function fetchPortobelloHwdData(): Promise<PortobelloHwdItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/portobellos?populate[portobelloHwd][populate][hwdOptions][populate]=image`,{cache: "no-store"}
  );
  const json = await res.json();
  return json.data;
}


// lib/strapi.ts

// Typ pre deti v rich text blocích
export interface RichTextChild {
  type: string;
  text: string;
}

// Typ pre rich text blok
export interface RichTextBlock {
  type: string;
  children: RichTextChild[];
}
// Typ pre jednotlivé položky v footer_opt (repeatable component)
export interface OptionalSlot {
  id: number;
  Title: string;
  description: RichTextBlock[];
  url: string; // Added URL field
}

// Typ pre jednotlivé tlačidlá v footer_btns (repeatable component)
export interface BottomLink {
  id: number;
  text: string;
  url: string | null;
}

export interface FooterData {
  id: number;
  documentId: string;
  phoneNumber: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  footer_opt: OptionalSlot[];
  footer_btns: BottomLink[];
}
export async function fetchFooterData(): Promise<FooterData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const url = `${baseUrl}/api/footers?populate[footer_opt]=*&populate[footer_btns]=*`;
    console.log("Fetching from URL:", url);

    const res = await fetch(url, {
      cache: "no-store",           // 🔥 Disable caching

    });

    if (!res.ok) throw new Error(`Error ${res.status}`);

    const json = await res.json();
    console.log("Full JSON response:", JSON.stringify(json, null, 2));

    if (json.data && json.data.length > 0) {
      const footer = json.data[0];
      console.log("Footer element:", footer);
      return footer as FooterData;
    } else {
      console.warn("No data array or empty in API response");
      return null;
    }
  } catch (err) {
    console.error("Fetch footer error:", err);
    return null;
  }
}


export interface ZariadeniaImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface ZariadeniaData {
  id: number;
  text1: string;
  text2: string;
  text3: string;
  main_image: ZariadeniaImage[];
  units_part: UnitsPart[];
  
}

export interface ZariadeniaResponse {
  data: ZariadeniaData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Button {
  text: string;
  url: string | null;
  color?: string;
}
export interface UnitsPart {
  id: number;
  text1: string;
  text2: string;
  text3: string;
  image?: {
    url: string;
    alternativeText?: string | null;
  };
  button?: Button[];

  
}


export async function fetchZariadeniaData(): Promise<ZariadeniaResponse | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/zariadenias?populate[main_image]=true&populate[units_part][populate]=*`,{cache: "no-store"}
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching zariadenia data:', error);
    return null;
  }
}









// interfaces.ts
interface VideoSegment {
  start_time: number;
  end_time: number;
  text1: string | null;
  text2: string | null;
  side: string | null; // "left", "right", or null
}

export interface VideoFile {
  url: string;
  name?: string;
  mime?: string;
}


export interface MainBodyVideo {
  video_separ: VideoFile;
  
  data_for_sep: VideoSegment[];
}

export interface HeroVideoToSeparate {
  main_body_video: MainBodyVideo;
}

export async function fetchHeroVideoToSeparate(): Promise<HeroVideoToSeparate | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/hero-video-ice-creams?populate[main_body_video][populate]=*`, {cache: "no-store"}
  );

  if (!res.ok) throw new Error("Error fetching hero video");

  const data = await res.json();
  const hero = data.data[0];

  if (!hero?.main_body_video?.video_separ) return null;

  // Build full URL for video
  const videoUrl = hero.main_body_video.video_separ.url.startsWith("http")
    ? hero.main_body_video.video_separ.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${hero.main_body_video.video_separ.url}`;

  // Map segment times WITH text fields and side
  const segments: VideoSegment[] = hero.main_body_video.data_for_sep.map((seg: any) => ({
    start_time: parseFloat(seg.start_time),
    end_time: parseFloat(seg.end_time),
    text1: seg.text1 || null,
    text2: seg.text2 || null,
    side: seg.side || null,
  }));

  console.log("Mapped segments:", segments); // Add this to debug

  return {
    main_body_video: {
      video_separ: { url: videoUrl },
      data_for_sep: segments,
    },
  };
}


// strapi.tsx

export interface ImageDataFull {
  id: number;
  url: string;
  alternativeText: string | null;
  name: string;
  formats?: Record<string, { url: string }>;
}

export interface FirstHeroSectionItem {
  id: number;
  text1: string;
  text2: string;
  text3: string;
  bg_color: string;
  text1_color: string;
  text2_color: string;
  text3_color: string;
  image: ImageDataFull[];
}

export interface PlaceData {
  id: number;
  landing_text1: string;
  lending_text2: string;
  lending_image: ImageDataFull | null;
  first_hero_section: FirstHeroSectionItem[];
}

export const fetchPlaceData = async (): Promise<PlaceData | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (!baseUrl) throw new Error("NEXT_PUBLIC_STRAPI_URL not defined");

    const response = await fetch(
      `${baseUrl}/api/places?populate[0]=lending_image&populate[1]=first_hero_section.image`,{cache: "no-store"}
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const json = await response.json();
    if (json.data && json.data.length > 0) {
      return json.data[0];
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getImageUrl = (
  image: ImageDataFull | null,
  size: "small" | "medium" | "large" | "original" = "original"
): string | null => {
  if (!image) return null;
  let imgUrl = image.url;

  if (size !== "original" && image.formats && image.formats[size]) {
    imgUrl = image.formats[size].url;
  }

  return imgUrl.startsWith("http")
    ? imgUrl
    : imgUrl;
};



// strapi.tsx

export interface ContactFormData {
  Business_name: string;
  Fname: string;
  Lname: string;
  emial: string;
  phone_number: string;
  postal_code: string;
  message: string;
}

export const submitContactForm = async (data: ContactFormData): Promise<{ success: boolean; error?: string }> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (!baseUrl) throw new Error("Strapi base URL is not configured");

    const response = await fetch(`${baseUrl}/api/contact-formulars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.error?.message || "Failed to send message" };
    }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
};



export async function fetchSteps() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const endpoint = `${baseUrl}/api/stepss?populate[video][populate]=*`;

  const response = await fetch(endpoint, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache",
      "Pragma": "no-cache"
    }
  });

  if (!response.ok) throw new Error('Failed to fetch steps');

  const data = await response.json();
  return data.data;
}

export async function fetchPortobelloMiddles() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const endpoint = `${baseUrl}/api/portobello-middles?populate[0]=backgorund&populate[1]=image&populate[2]=sorunding_elements&populate[3]=sorunding_elements.image&populate[4]=points&populate[5]=points.image`;

  const response = await fetch(endpoint, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache",
      "Pragma": "no-cache"
    }
  });

  if (!response.ok)
    throw new Error(`Failed to fetch portobello middles data: ${response.status} ${response.statusText}`);

  const data = await response.json();
  return data.data;
}
export async function fetchComparisons() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const endpoint = `${baseUrl}/api/comparisons?populate[button][populate]=*&populate[types][populate]=*&populate[property][populate]=*`;

  const response = await fetch(endpoint, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache",
      "Pragma": "no-cache"
    }
  });

  if (!response.ok)
    throw new Error(`Failed to fetch comparisons: ${response.status} ${response.statusText}`);

  const data = await response.json();
  return data.data;
}
