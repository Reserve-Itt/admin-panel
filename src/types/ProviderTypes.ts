export interface IAddAdvertisement {
  providerId?: string;
  advertisement?: {
    advertisementTitleText?: string;
    advertisementDescriptionText?: string;
    advertisementStartDate?: string;
    advertisementEndDate?: string;
    advertisement_image?: any;
    advertisement_image_url?: string;
  };
}

export interface IProviderService {
  serviceDescription?: string;
  serviceDuration?: number;
  serviceName?: string;
  servicePrice?: number;
}
