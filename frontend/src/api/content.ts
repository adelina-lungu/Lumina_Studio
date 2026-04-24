import { http } from "./client";
import type {
  PortfolioImageDto,
  CreatePortfolioImageDto,
  ServicePackageDto,
  UpdateServicePackageDto,
  TestimonialDto,
  CreateTestimonialDto,
  FaqItemDto,
  CreateFaqItemDto,
  UpdateFaqItemDto,
  ActionResponse,
} from "./types";

export const portfolioApi = {
  list: (category?: string) =>
    http.get<PortfolioImageDto[]>(category ? `/portfolio?category=${category}` : "/portfolio"),

  create: (dto: CreatePortfolioImageDto) =>
    http.post<ActionResponse>("/portfolio", dto),

  delete: (id: number) =>
    http.delete<ActionResponse>(`/portfolio/${id}`),
};

export const packagesApi = {
  list: () =>
    http.get<ServicePackageDto[]>("/packages"),

  getById: (id: number) =>
    http.get<ServicePackageDto>(`/packages/${id}`),

  update: (id: number, dto: UpdateServicePackageDto) =>
    http.put<ActionResponse>(`/packages/${id}`, dto),
};

export const testimonialsApi = {
  list: () =>
    http.get<TestimonialDto[]>("/testimonials"),

  listAll: () =>
    http.get<TestimonialDto[]>("/testimonials/all"),

  create: (dto: CreateTestimonialDto) =>
    http.post<TestimonialDto>("/testimonials", dto),

  approve: (id: number) =>
    http.post<ActionResponse>(`/testimonials/${id}/approve`),

  delete: (id: number) =>
    http.delete<ActionResponse>(`/testimonials/${id}`),
};

export const faqApi = {
  list: () =>
    http.get<FaqItemDto[]>("/faq"),

  create: (dto: CreateFaqItemDto) =>
    http.post<FaqItemDto>("/faq", dto),

  update: (id: number, dto: UpdateFaqItemDto) =>
    http.put<ActionResponse>(`/faq/${id}`, dto),

  delete: (id: number) =>
    http.delete<ActionResponse>(`/faq/${id}`),
};
