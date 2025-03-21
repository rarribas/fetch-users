type InputNamesTypes = 
  'firstname' | 
  'lastname' | 
  'email' | 
  'birthdate' |
  'company' |
  'address' |
  'city';

export type InputType = {
  name: InputNamesTypes,
  type: 'text' | 'email' | 'date',
  text: string,
}

export const inputElements:InputType[] = [{
  name: "firstname",
  type: "text",
  text: "First Name",
},{
  name: "lastname",
  type: "text",
  text: "Last Name",
},{
  name: "email",
  type: "email",
  text: "Email",
},{
  name: "birthdate",
  type: "date",
  text: "Birth Date",
},{
  name: "company",
  type: "text",
  text: "Company",
},{
  name: "address",
  type: "text",
  text: "Address",
},{
  name: "city",
  type: "text",
  text: "City",
}];