type DateTime = string;

type sizevalue = "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  billBoards: billBoard[];
  categories: category[];
  sizes: size[];
  colors: color[];
  products: product[];
  orders: order[];
}

interface billBoard {
  id: string;
  storeId: string;
  store: Store;
  imageUrl: string;
  label: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  categories: category[];
  labelColor: string;
}

interface UserFetched   {

  id: string;
  name: string | null;
  email: string | null;
  username: string | null;
  imageUrl: string | null;
  bio: string | null;
  onboarded: boolean;


} 

