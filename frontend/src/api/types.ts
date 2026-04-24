export type UserRole = "Client" | "Admin" | "Owner";
export type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";
export type ChatSender = "Client" | "Studio";
export type PortfolioCategory = "Fashion" | "Wedding" | "Portrait";
export type PortfolioAspect = "Tall" | "Wide" | "Square";
export type PackageTier = "Standard" | "Premium" | "Editorial";
export type AvailabilityType = "Busy" | "Booked";

export interface UserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  registeredOn: string;
  lastLoginAt: string | null;
}

export interface LoginResponseDto {
  user: UserDto;
  token: string;
  expiresAt: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserRegisterDto {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface UpdateUserProfileDto {
  name: string;
  phone: string;
}

export interface BookingDto {
  id: number;
  userId: number;
  photographerId: number;
  photographerName: string;
  packageId: number;
  packageName: string;
  date: string;
  peopleCount: number;
  clientName: string;
  clientEmail: string;
  status: BookingStatus;
  createdOn: string;
}

export interface CreateBookingDto {
  photographerId: number;
  packageId: number;
  date: string;
  peopleCount: number;
  clientName: string;
  clientEmail: string;
}

export interface BookingFilterDto {
  photographerId?: number;
  status?: BookingStatus;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  sortBy?: string;
  sortAscending?: boolean;
  page?: number;
  pageSize?: number;
}

export interface BookingPageDto {
  items: BookingDto[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface PhotographerDto {
  id: number;
  slug: string;
  name: string;
  specialty: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  instagramUrl: string | null;
  facebookUrl: string | null;
  websiteUrl: string | null;
  isActive: boolean;
  displayOrder: number;
  busyDates: string[];
}

export interface SetAvailabilityDto {
  photographerId: number;
  date: string;
  type: AvailabilityType;
}

export interface AvailabilityDto {
  id: number;
  photographerId: number;
  date: string;
  type: AvailabilityType;
  bookingId: number | null;
}

export interface ServicePackageDto {
  id: number;
  slug: string;
  tier: PackageTier;
  name: string;
  price: number;
  currency: string;
  isHighlighted: boolean;
  isActive: boolean;
  displayOrder: number;
  features: string[];
}

export interface PortfolioImageDto {
  id: number;
  src: string;
  alt: string;
  category: PortfolioCategory;
  aspect: PortfolioAspect;
  photographerId: number | null;
  isPublished: boolean;
  displayOrder: number;
}

export interface TestimonialDto {
  id: number;
  name: string;
  role: string;
  avatarUrl: string;
  text: string;
  rating: number;
  isApproved: boolean;
  createdOn: string;
}

export interface CreateTestimonialDto {
  name: string;
  role: string;
  avatarUrl: string;
  text: string;
  rating: number;
}

export interface FaqItemDto {
  id: number;
  question: string;
  answer: string;
  displayOrder: number;
  isActive: boolean;
}

export interface CreateFaqItemDto {
  question: string;
  answer: string;
  displayOrder: number;
}

export interface UpdateFaqItemDto {
  question: string;
  answer: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ChatConversationDto {
  id: number;
  clientEmail: string;
  clientName: string;
  userId: number | null;
  isActive: boolean;
  lastMessageAt: string | null;
  createdOn: string;
  unreadCount: number;
  messages: ChatMessageDto[];
}

export interface ChatMessageDto {
  id: number;
  conversationId: number;
  text: string;
  sender: ChatSender;
  senderName: string;
  isRead: boolean;
  createdOn: string;
}

export interface SendChatMessageDto {
  text: string;
}

export interface ContactMessageDto {
  id: number;
  userId: number | null;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  isResolved: boolean;
  createdOn: string;
}

export interface CreateContactMessageDto {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface CreatePortfolioImageDto {
  src: string;
  alt: string;
  category: PortfolioCategory;
  aspect: PortfolioAspect;
  photographerId: number | null;
  isPublished: boolean;
  displayOrder: number;
}

export interface UpdatePhotographerDto {
  name: string;
  specialty: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  instagramUrl: string | null;
  facebookUrl: string | null;
  websiteUrl: string | null;
  isActive: boolean;
  displayOrder: number;
}

export interface UpdateServicePackageDto {
  tier: PackageTier;
  name: string;
  price: number;
  currency: string;
  isHighlighted: boolean;
  isActive: boolean;
  displayOrder: number;
  features: string[];
}

export interface ActionResponse {
  success: boolean;
  message: string;
}
