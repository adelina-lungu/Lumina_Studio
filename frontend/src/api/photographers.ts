import { http } from "./client";
import type {
  PhotographerDto,
  UpdatePhotographerDto,
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

  update: (id: number, dto: UpdatePhotographerDto) =>
    http.put<ActionResponse>(`/photographers/${id}`, dto),

  setAvailability: (dto: SetAvailabilityDto) =>
    http.post<ActionResponse>("/photographers/availability", dto),

  removeAvailability: (id: number, date: string) =>
    http.delete<ActionResponse>(`/photographers/${id}/availability/${date}`),
};
