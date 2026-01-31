import { PaginationMeta } from "./todo";

export interface NotificationItem {
  _id: string;
  sendTo: string[];
  title: string;
  description: string;
  forChild: boolean;
  ReminderType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isRead: boolean;
}

export interface NotificationResponse {
  success: boolean;
  message: string;
  data: NotificationItem[];
  pagination: PaginationMeta;
}
