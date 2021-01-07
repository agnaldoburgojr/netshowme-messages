export type FormDataType =  {
  name: string,
  email: string,
  phone: string,
  message: string,
}

export type ChangeDataType  = {
  value: string
  fieldname: 'name' | 'email' | 'phone' | 'message'
}
