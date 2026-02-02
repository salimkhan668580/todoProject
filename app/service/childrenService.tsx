import axiosInstance from "../axios/axiosInstance";
import { ChildrenListResponse } from "../types/children";

class ChildrenService {
  async getChildren(): Promise<ChildrenListResponse> {
    const res = await axiosInstance.get("/api/parent/");
    return res.data;
  }

  async getChildrenDetails(userId:string): Promise<ChildrenListResponse> {
    const res = await axiosInstance.get(`/api/parent/details/?userId=${userId}`);
    return res.data;
  }

  async getChildrenAllTodoHistory(userId:string): Promise<ChildrenListResponse> {
    const res = await axiosInstance.get(`/api/parent/todoHistory/?userId=${userId}`);
    return res.data;
  }
  async getuserProfile(){
    const res = await axiosInstance.get(`/api/parent/parentProfile`);
    return res.data;
  }
  async getStats(userId:string,type:string){
    const res = await axiosInstance.get(`/api/parent/stats?userId=${userId}&type=${type}`);
    return res.data;
  }


  
}

export const childrenService = new ChildrenService();
