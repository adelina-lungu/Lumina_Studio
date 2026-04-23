import { http, setToken } from "./client";
import type {
  LoginResponseDto,
  UserLoginDto,
  UserRegisterDto,
  UserDto,
  UpdateUserProfileDto,
  ActionResponse,
} from "./types";

export const authApi = {
  login: async (dto: UserLoginDto) => {
    const res = await http.post<LoginResponseDto>("/auth/login", dto);
    setToken(res.token);
    return res;
  },

  register: async (dto: UserRegisterDto) => {
    const res = await http.post<LoginResponseDto>("/auth/register", dto);
    setToken(res.token);
    return res;
  },

  logout: () => {
    setToken(null);
  },

  me: () => http.get<UserDto>("/users/my"),

  updateProfile: (id: number, dto: UpdateUserProfileDto) =>
    http.put<ActionResponse>(`/users/${id}/profile`, dto),
};
