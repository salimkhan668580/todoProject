import axiosInstance from "../axios/axiosInstance";

class AuthService{

    async login(email: string, password: string) {
        const res=await axiosInstance.post("/api/auth/login", {email, password});
        return res.data;
    }


}

export const authService = new AuthService();