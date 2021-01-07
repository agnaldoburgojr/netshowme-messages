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
    .required('Celular obrigatório')
    .min(10, 'Mínimo de 10 caracteres' )
    .max(11, 'Máximo de 11 caracteres'),
  message: Yup.string()
    .required('Mensagem obrigatória')
    .min(5, 'Mínimo de 5 caracteres' )
    .max(150, 'Máximo de 150 caracteres'),
});
