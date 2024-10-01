export type CustomerCreateForm = {
  id: string;
  firstname: string | null;
  lastname: string | null;
  image?: string;
  email?: string;
};

export type CustomerForm = {
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
  phone?: string | null;
};

export type DeliveryForm = CustomerForm & {
  street?: string;
  city?: string;
  country?: string;
  state?: string;
  postcode?: string;
};
