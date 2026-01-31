export interface UserDetails {
  _id: string;
  name: string;
  image: string;
  email: string;
}

export interface UserStats {
  _id: string | null;
  doneCount: number;
  pendingCount: number;
}

export interface ProfileData {
  userDetails: UserDetails;
  stats: UserStats;
}

export interface ProfileResponse {
  status: boolean;
  data: ProfileData;
  message: string;
}
