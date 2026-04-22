export const ROUTES = {
  home: "/",
  portfolio: "/portfolio",
  services: "/services",
  team: "/team",
  about: "/about",
  faq: "/faq",
  testimonials: "/testimonials",
  contact: "/contact",
  booking: "/booking",
  photographer: (id: string | number) => `/photographer/${id}`,
  profile: "/profile",
  adminBookings: "/admin/bookings",
  adminSupport: "/admin/support",
  forbidden: "/403",
  serverError: "/500",
} as const;

export interface MenuLink {
  label: string;
  to: string;
  number: string;
}

export const MENU_LINKS: MenuLink[] = [
  { label: "Portofoliu",  to: ROUTES.portfolio,    number: "01" },
  { label: "Servicii",    to: ROUTES.services,     number: "02" },
  { label: "Echipa",      to: ROUTES.team,         number: "03" },
  { label: "Despre Noi",  to: ROUTES.about,        number: "04" },
  { label: "FAQ",         to: ROUTES.faq,          number: "05" },
  { label: "Recenzii",    to: ROUTES.testimonials, number: "06" },
  { label: "Contact",     to: ROUTES.contact,      number: "07" },
];

export const BOOKING_LINK: MenuLink = {
  label: "Programare",
  to: ROUTES.booking,
  number: "08",
};
