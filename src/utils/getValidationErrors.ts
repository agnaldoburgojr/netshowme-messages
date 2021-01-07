import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    if(!error.path) return
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
