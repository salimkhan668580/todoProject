import axiosInstance from "../axios/axiosInstance";

class FCMService {
    async saveFcm(userId:string,fcmToken:string){
        const res = await axiosInstance.post(`/api/token/save`,{userId,fcmToken});
        return res.data;
      }

}

export const fCMService = new FCMService();