import axiosInstance from "../axios/axiosInstance";
import { NotificationResponse } from "../types/notification";

class NotificationService {
  async getNotifications(): Promise<NotificationResponse> {
    const res = await axiosInstance.get("/api/user/notification");
    return res.data;
  }
}

export const notificationService = new NotificationService();
