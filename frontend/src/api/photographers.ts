import { http } from "./client";
import type {
  PhotographerDto,
  SetAvailabilityDto,
  AvailabilityDto,
  ActionResponse,
} from "./types";

export const photographersApi = {
  list: () =>
    http.get<PhotographerDto[]>("/photographers"),

  getBySlug: (slug: string) =>
    http.get<PhotographerDto>(`/photographers/${slug}`),

  getAvailability: (id: number, month: string) =>
    http.get<AvailabilityDto[]>(`/photographers/${id}/availability?month=${month}`),

  setAvailability: (dto: SetAvailabilityDto) =>
    http.post<ActionResponse>("/photographers/availability", dto),

  removeAvailability: (id: number, date: string) =>
    http.delete<ActionResponse>(`/photographers/${id}/availability/${date}`),
};
