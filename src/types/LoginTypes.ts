/**
 * This page contains the types of the back-end structure. 
 * 
 * 
 */





export interface IsignUpProvider {
  tax_number?: string;
  email?: string;
  password?: string;
  role?: string;
  providerName?: string;
  ownerName?: string;
  description?: string;
  address?: string;
  phoneNumber?: string;
  providerType?: string;
}

export interface IAuthState {
  token?: string;
  success?: true;
  userData?: {
    _id?: string;
    tax_number?: string;
    providerName?: string;
    ownerName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    description?: string;
    role?: "provider" | "user" | "admin";
    isVerified?: boolean;
    fcmTokens?: [];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    providerType?: "FOOTBALL" | "HAIRDRESSER";
  };
}

export interface IAddService {
  providerId?: string;
  services?: {
    serviceName?: string;
    servicePrice?: number;
    serviceDescription?: string;
    serviceDuration?: number;
  };
}
