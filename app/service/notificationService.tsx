import axiosInstance from "../axios/axiosInstance";
import { NotificationResponse } from "../types/notification";


class NotificationService {
  async getNotifications(): Promise<NotificationResponse> {
    const res = await axiosInstance.get("/api/user/notification");
    return res.data;
  }
  async getNotificationsSendHistory(): Promise<NotificationResponse> {
    const res = await axiosInstance.get("/api/parent/sendNotificationHistory");
    return res.data;
  }
async sendNotifications(data: { 
  title: string, 
  description: string, 
  forChild: boolean, 
  ReminderType: string, 
  sendTo: string[] 
}) {
  const res = await axiosInstance.post("/api/parent/sendNotification", data);
  return res.data;
}

}

export const notificationService = new NotificationService();
