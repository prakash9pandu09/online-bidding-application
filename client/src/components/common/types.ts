export enum Type {
    primary = 'blue',
    secondary = 'red',
    default = 'white',
}

export interface LoginUserRequest {
    email: string;
    password: string;
  }
  export interface LoginUserResponse {
    status: number;
    success: boolean;
    message: string;
    data: LoginUserInfo;
  }
  export interface LoginUserInfo {
    firstName: string;
    lastName: string;
    email: string;
  }

  export interface Product {
    id: number;
    name: string;
    minBid: number;
    currentBid: number;
    bidEndsBy: Date;
    isFavorite: boolean;
    imageId: number;
    description: string;
    reviews: Review[];
    createdDateTime?: Date;
    updatedDateTime?: Date;
  }

  export interface Review {
    reviewerId: number;
    reviewerName: string;
    reviewercomments: string;
    reviewerRating: number;
    reviewedDate: Date
    reviewerPhoto: number;
  }

  export interface PlaceBidRequest {
    bidPrice: number; 
    productId: number;
    email: string;
  }

  export interface Bid {
    product: string;
    user: string;
    bidPrice: number;
    createdAt: Date;
    updatedAt: Date;
  }