import axiosInstance from "../axios/axiosInstance";
import { ProfileResponse } from "../types/profile";

class ProfileService {
  async getProfile(): Promise<ProfileResponse> {
    const res = await axiosInstance.get("/api/user/profile");
    return res.data;
  }
}

export const profileService = new ProfileService();
