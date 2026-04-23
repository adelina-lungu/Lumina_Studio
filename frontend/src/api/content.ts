import { http } from "./client";
import type {
  PortfolioImageDto,
  ServicePackageDto,
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
};

export const packagesApi = {
  list: () =>
    http.get<ServicePackageDto[]>("/packages"),
};

export const testimonialsApi = {
  list: () =>
    http.get<TestimonialDto[]>("/testimonials"),

  create: (dto: CreateTestimonialDto) =>
    http.post<TestimonialDto>("/testimonials", dto),
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
