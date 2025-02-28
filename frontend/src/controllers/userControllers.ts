import axiosInstance from "@/utils/axios";

export const logOut = async () => {
    try {
        await axiosInstance.delete('/users/logout');
    } catch (error) {
        console.log("error on logOut()", error);
    }
};