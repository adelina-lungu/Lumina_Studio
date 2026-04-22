export interface PortfolioImage {
  id: number;
  src: string;
  alt: string;
  category: "fashion" | "wedding" | "portrait";
  aspect: "tall" | "wide" | "square";
}

export interface ServicePackage {
  id: "standard" | "premium" | "editorial";
  name: string;
  price: number;
  currency: string;
  features: string[];
  highlighted: boolean;
}

export interface Photographer {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  busyDates: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  cover: string;
  socials: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
}
