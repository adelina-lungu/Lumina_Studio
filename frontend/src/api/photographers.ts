import { http } from "./client";
import type {
  PhotographerDto,
  CreatePhotographerDto,
  UpdatePhotographerDto,
  SetAvailabilityDto,
  ActionResponse,
} from "./types";

export const photographersApi = {
  list: () =>
    http.get<PhotographerDto[]>("/photographers"),

  listAll: () =>
    http.get<PhotographerDto[]>("/photographers/all"),

  getById: (id: number) =>
    http.get<PhotographerDto>(`/photographers/${id}`),

  getBySlug: (slug: string) =>
    http.get<PhotographerDto>(`/photographers/slug/${slug}`),

  create: (dto: CreatePhotographerDto) =>
    http.post<ActionResponse>("/photographers", dto),

  update: (id: number, dto: UpdatePhotographerDto) =>
    http.put<ActionResponse>(`/photographers/${id}`, dto),

  delete: (id: number) =>
    http.delete<ActionResponse>(`/photographers/${id}`),

  setAvailability: (dto: SetAvailabilityDto) =>
    http.post<ActionResponse>("/photographers/availability", dto),

  removeAvailability: (id: number, date: string) =>
    http.delete<ActionResponse>(`/photographers/${id}/availability/${date}`),
};
