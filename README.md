<div align="center" >
  <img alt="Netshow.me" src="./github/netshowme.png" width='200px'>
</div>
<h1 align="center" >
    Netshow.me Mensagens
</h1>

<h4 align="center">
  Hora de mandar uma mensagem e ver nossa lista!
</h4>
<div align="center" >
  <img alt="Project demo 1" src="./github/record1.gif" width='300px'>
  <img alt="Project demo 2" src="./github/record2.gif" width='300px'>
</div>

## :large_blue_diamond: Descrição

Este é um projeto desenvolvido como teste para desenvolvedor da [Netshow.me](https://netshow.me/). Consiste em uma aplicação com React Native, utilizando o Expo(v.38) que traz as seguintes features:

- cadastro de contatos com imagem, nome, email, celular e mensagem;
- manipulação de imagem para crop e armazenamento em disco;
- armazenamento de dados no async storage;
- listagem, visualização e exclusão de dados salvos;
- push notification das mensagens com api do Expo;

<br/>

## :large_blue_diamond: Tecnologias e bibliotecas utilizadas

Para este projeto foram usadas as seguintes tecnologias:

- [React Native](https://reactnative.dev/)
- [Expo (manipular imagens, push notifications)](https://docs.expo.io/)
- [React Navigation](https://reactnavigation.org/)
- [Styled-components](https://styled-components.com/docs)
- [Async storage](https://github.com/react-native-async-storage/async-storage)
- [uuid-random](https://www.npmjs.com/package/uuid-random)
- [vanilla-masker](https://github.com/vanilla-masker/vanilla-masker)
- [yup](https://github.com/jquense/yup)

<br/>

## :large_blue_diamond: Rodando a aplicação

Para rodar a aplicação tenha o [npm](https://www.npmjs.com/get-npm) rodando em sua máquina. Siga os seguintes passos:

Tenha também uma conta [Expo](https://expo.io/) para logar e registrar as notificações.

```bash
# Install expo
$ sudo npm install --global expo-cli

# Add expo credentials, you will need register in https://expo.io/
$ expo login

# Clone this repository
$ git clone https://github.com/agnaldoburgojr/netshowme-messages.git netshowmeApp

# Go into the repository
$ cd netshowmeApp

# Run the app
$ expo start

```

Em um dispositivo, baixe na AppStore (para IOS) ou PlayStore (Android) o aplicativo Expo. Este é o client para rodar o simulador em seu dispositivo.

Abra o aplicativo e scaneie o QRCode que está em seu terminal (após rodar o expo start)

<br/>

## :large_blue_diamond: Considerações

### Design da aplicação

Pelo escopo do projeto busquei ser objetivo e eficiente na escolha e execução dos padrões e organização do código. Utilizei muito da programação funcional reativa utilizando hooks, cada componente isolado com suas lógicas e regras que compõem as cada tela (screen).

Uma camada de serviços foi adicionada para expor as funçoes de manipulação do storage.

Existe o diretório de utils que exporta funções genéricas para alguns problemas específicos. São funções escritas como helpers para outras funções e possuem uma responsabilidade única.

Alguns componentes foram abstraídos para serem componentes reutilizáveis e embora seja uma aplicação de estrutura simples foi pensado em manter um código organizado e com pouco acoplamento entre os componentes.

### UI e estilos

Uma interface agradável e com boa usabilidade é essencial para uma maior permanência do app instalado. Pensando nisso busquei montar uma interface agradável e leve. Foi utilizado as cores e logo da Netshow.me para agregar valor de produto ao app e foi pensado no usuário principalmente:

- na realização do formulário com suas validações
- na navegabilidade de páginas
- na visualização dos registros

Foi utilizado Styled Components por minha familiaridade com a biblioteca bem como a facilidade de estilização de componentes

### Desafios do projeto

- Utilização do expo, pois utilizo mais o react native cli
- Expo notifications, conheci a API neste projeto
- Publicação com Expo, primeiro contato

Embora todos esses desafios, procurei fazer o meu melhor e ler e reler a documentações para entregar o melhor possível.

### Testes

Testes são muito importante e tenho aprendido na prática a importância dos testes. Para este projeto os testes serão implementados após a avaliação, visto que investi o tempo disponível para o desenvolvimento das features exigidas.

## :large_blue_diamond: Considerações finais

Agradeço pela oportunidade de realizar este projeto e aguardo ansiosamente pelo resultado. Aprendi muito com o projeto e o fiz com todo entusiasmo.

## :large_blue_diamond: Artefatos

Project page: https://expo.io/@agnaldoburgojr/netshowme-messages

Android apk
[Managed workflow](https://expo.io/artifacts/32330339-03fe-41c8-ba56-1565467f8ac1)
[Bare workflow](https://expo.io/artifacts/aa0772d3-3401-4d85-a9b8-1abba8997c34)

IOS ipa (simulator)
[Managed workflow](https://expo.io/artifacts/2461da81-47b6-42d2-8f68-023c287f533f)
[Bare workflow](https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/ios/%40agnaldoburgojr/netshowme-messages-63e40e8e-d31f-412f-a8f3-9b83642e80d0-simulator.tar.gz)

<br/>

## :large_blue_diamond: Licença

Este projeto possui Licença MIT. Olhe [LICENSE]() para mais informações.

<br/>

---

Feito com ♥ por Agnaldo Burgo Junior :wave: [Get in touch!](https://www.linkedin.com/in/agnaldo-burgo-junior/)

[vc]: https://code.visualstudio.com/
