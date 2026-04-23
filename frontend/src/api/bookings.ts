import { http } from "./client";
import type {
  BookingDto,
  BookingPageDto,
  BookingFilterDto,
  CreateBookingDto,
  ActionResponse,
} from "./types";

function toQuery(filter: BookingFilterDto): string {
  const params = new URLSearchParams();
  if (filter.photographerId != null) params.set("photographerId", String(filter.photographerId));
  if (filter.status) params.set("status", filter.status);
  if (filter.dateFrom) params.set("dateFrom", filter.dateFrom);
  if (filter.dateTo) params.set("dateTo", filter.dateTo);
  if (filter.search) params.set("search", filter.search);
  if (filter.sortBy) params.set("sortBy", filter.sortBy);
  if (filter.sortAscending != null) params.set("sortAscending", String(filter.sortAscending));
  if (filter.page != null) params.set("page", String(filter.page));
  if (filter.pageSize != null) params.set("pageSize", String(filter.pageSize));
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export const bookingsApi = {
  list: (filter: BookingFilterDto = {}) =>
    http.get<BookingPageDto>(`/bookings${toQuery(filter)}`),

  getById: (id: number) =>
    http.get<BookingDto>(`/bookings/${id}`),

  create: (dto: CreateBookingDto) =>
    http.post<BookingDto>("/bookings", dto),

  cancel: (id: number) =>
    http.post<ActionResponse>(`/bookings/${id}/cancel`),

  confirm: (id: number) =>
    http.post<ActionResponse>(`/bookings/${id}/confirm`),

  complete: (id: number) =>
    http.post<ActionResponse>(`/bookings/${id}/complete`),

  myBookings: () =>
    http.get<BookingDto[]>("/bookings/my"),
};
