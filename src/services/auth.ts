import type User from '@models/User';

import api from './api';
import type {LoginWithEmailResponse, RefreshTokenResponse} from './types';

export const AuthService = {
  async loginWithEmail(email: string, password: string) {
    const response = await api.post<LoginWithEmailResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },
  async refreshToken() {
    const response = await api.post<RefreshTokenResponse>('/auth/refresh');
    return response.data;
  },
  async getSignedUser() {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
};
