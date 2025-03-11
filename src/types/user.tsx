export interface UserI {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  birthDate?: string;
  company?: {
    name?: string;
    catchPhrase?: string; 
    bs?: string;
  };
  address?: {
    street?: string;
    city?: string;
  };
  city?: string;
}

export interface SimpleUserI {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  birthdate?: string;
  company?: string;
  street?: string;
  city?: string;
}