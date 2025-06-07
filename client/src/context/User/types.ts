export type User = {
  _id: string;
  name: string;
  email: string;
  token: string;
  isVerified: boolean;
};

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}; 