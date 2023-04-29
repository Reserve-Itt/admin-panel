export interface IAddAdvertisement {
  providerId?: string;
  advertisementTitleText?: string;
  advertisementDescriptionText?: string;
  advertisementStartDate?: string;
  advertisementEndDate?: string;
  advertisement_image?: any;
  advertisement_image_url?: string;
}

export interface IProviderService {
  serviceDescription?: string;
  serviceDuration?: number;
  serviceName?: string;
  servicePrice?: number;
}

export interface IProfile {
  providerName: string;
  ownerName: string;
  description: string;
  address: string;
  phoneNumber: string;
  profile_image: {};
  profile_image_url: string;
  reservationGranulity: string;
  workingStartTime: number;
  workingEndTime: number;
}
export interface IProviderUpdateRequest {
  providerName?: string;
  ownerName?: string;
  description?: string;
  address?: string;
  phoneNumber?: string;
  reservationGranulity?: string;
  workingStartTime?: number;
  workingEndTime?: number;
  id?: string;
}
