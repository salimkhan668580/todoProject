import axiosInstance from "../axios/axiosInstance";
import { ChildrenListResponse } from "../types/children";

class ChildrenService {
  async getChildren(): Promise<ChildrenListResponse> {
    const res = await axiosInstance.get("/api/parent/");
    return res.data;
  }
}

export const childrenService = new ChildrenService();
