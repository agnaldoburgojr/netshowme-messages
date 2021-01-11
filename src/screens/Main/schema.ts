import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string()
    .required('Nome obrigatório')
    .max(100, 'Máximo de 100 caracteres'),
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Insira um e-mail válido')
    .max(150, 'Máximo de 150 caracteres'),
  phone: Yup.string()
    .matches(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/ , 'Formato inválido. Digite apenas 10 0u 11 números')
    .required('Celular obrigatório'),
  message: Yup.string()
    .required('Mensagem obrigatória')
    .max(150, 'Máximo de 150 caracteres'),
});
