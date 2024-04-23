import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (
    email: string,
    username: string,
    pin: number,
    gender: string,
    date_of_birth: string,
    password: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  GetOtpRegister?: (email: string) => Promise<any>;
  verifyOtpReg?: (otp: number) => Promise<any>;
  resendOtp?: (email: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const tokenKey = "my-jwt";
export const API_URL =
  "https://paybeforeservice.onrender.com/PayBeforeService/v1";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    loading: boolean; // Add loading state
  }>({ token: null, authenticated: null, loading: true });

  console.log(authState);
  

  useEffect(() => {

    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(tokenKey);
        if (storedToken) {
          setAuthState({ token: storedToken, authenticated: true, loading: false }); 
        } else {
          setAuthState({ token: null, authenticated: false, loading: false }); 
        }
      } catch (error) {
        console.error("Error loading token from SecureStore:", error);
        setAuthState({ token: null, authenticated: false, loading: false }); 
      }
    };
    
    loadToken();
  }, []);




  const onRegister = async (
    email: string,
    username: string,
    pin: number,
    gender: string,
    date_of_birth: string,
    password: string
  ) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        email,
        username,
        pin,
        gender,
        date_of_birth,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);

      throw error;
    }
  };

  const onLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const token = response.data.token;
      await SecureStore.setItemAsync(tokenKey, token);
      setAuthState({ token, authenticated: true,  loading: false });
      return response.data;
    } catch (error) {
      console.error("Error logging in user:", error);

      throw error;
    }
  };

  const GetOtpRegister = async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/sendOtp`, { email });

      return response.data;
    } catch (error) {
      console.error("Error requesting OTP:", error);

      throw error;
    }
  };

  const verifyOtpReg = async (otp: number) => {
    try {
      const response = await axios.post(`${API_URL}/auth/verifyOtpReg`, { otp });

      return response.data;
    } catch (error) {
      console.error("Error verifying OTP:", error);

      throw error;
    }
  };

  const resendOtp = async (email: string) => {
    try {
      const response = await axios.put(`${API_URL}/auth/resendOtp`, { email });

      return response.data;
    } catch (error) {
      console.error("Error resending OTP:", error);

      throw error;
    }
  };

  const onLogout = async () => {
    try {
      await SecureStore.deleteItemAsync(tokenKey);
      setAuthState({ token: null, authenticated: false, loading: false });
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  const value = {
    authState,
    onRegister,
    onLogin,
    GetOtpRegister,
    verifyOtpReg,
    resendOtp,
    onLogout,
    
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
