import { http } from "./client";
import type {
  PhotographerDto,
  SetAvailabilityDto,
  ActionResponse,
} from "./types";

export const photographersApi = {
  list: () =>
    http.get<PhotographerDto[]>("/photographers"),

  getById: (id: number) =>
    http.get<PhotographerDto>(`/photographers/${id}`),

  getBySlug: (slug: string) =>
    http.get<PhotographerDto>(`/photographers/slug/${slug}`),

  setAvailability: (dto: SetAvailabilityDto) =>
    http.post<ActionResponse>("/photographers/availability", dto),

  removeAvailability: (id: number, date: string) =>
    http.delete<ActionResponse>(`/photographers/${id}/availability/${date}`),
};
