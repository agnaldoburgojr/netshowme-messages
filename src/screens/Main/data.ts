export type FormDataType =  {
  name: {
    value: string;
    error: string;
  },
  email: {
    value: string;
    error: string;
  },
  phone: {
    value: string;
    error: string;
  },
  message: {
    value: string;
    error: string;
  },
}

export type ChangeDataType  = {
  value: string
  fieldname: 'name' | 'email' | 'phone' | 'message'
}

export const emptyFormData =  {
  name: {
    value: '',
    error: '',
  },
  email: {
    value: '',
    error: '',
  },
  phone: {
    value: '',
    error: '',
  },
  message: {
    value: '',
    error: '',
  },
}