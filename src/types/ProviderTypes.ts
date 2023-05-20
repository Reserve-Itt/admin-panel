export interface IAddAdvertisement {
  providerId?: string;
  advertisementTitleText?: string;
  advertisementDescriptionText?: string;
  advertisementStartDate?: string;
  advertisementEndDate?: string;
  advertisement_image?: File | null;
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
export interface IProviderServices {
  serviceName?: String;
  servicePrice?: number;
  serviceDescription?: string;
  serviceDuration?: number;
}

export interface IProviderComments {
  commentedAt?: string;
  userId?: string;
  comment: string;
  commentRate: number;
}

export interface IProviderStatistics {
  success?: boolean;
  newReservations?: number;
  ongoingReservations?: number;
  completedReservations?: number;
  cancelledRejectedReservations?: number;
  totalEarnings?: number;
}
