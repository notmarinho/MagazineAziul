# Magazine Azul

## Descrição
Este é um aplicativo que permite aos vendedores registrarem suas vendas e aos gerentes visualizarem as vendas realizadas. Com ele, é possível registrar o valor da venda, localização e data.

Este aplicativo utiliza a abordagem "offline first". Todo o gerenciamento dos dados offline é feito com [WatermelonDB](https://watermelondb.dev/).

Além disso, utilizamos um serviço de API localizado no diretório `src/services` para se comunicar com o servidor. As funções do WatermelonDB para gerenciamento dos dados offline estão localizadas no diretório `src/store/watermelon`.

Para unir todas as chamadas e gerenciar as regras de negócio, utilizamos o Redux Toolkit, com as funções localizadas no diretório `src/store/thunk`.

## Dependências
* Node 16.15.1 ou Mais Recente.
* Yarn (Recomendado)

## Instalação
Antes de começar, certifique-se de que você tem o Node.js e o React Native instalados na sua máquina. Caso ainda não tenha, siga as instruções na documentação oficial do Node.js e do React Native.

Faça o download do repositório
Navegue até a pasta raiz do projeto no seu terminal
Execute o comando npm install para instalar as dependências do projeto
Execute o comando npx react-native run-android para rodar o aplicativo no seu emulador ou dispositivo Android, ou npx react-native run-ios para rodar no seu emulador ou dispositivo iOS.

## Contribuindo
Contribuições são bem-vindas! Se você tiver sugestões de melhorias, ou se encontrar algum bug, sinta-se à vontade para abrir uma issue ou um pull request. Antes de enviar sua contribuição, certifique-se de que o aplicativo continua funcionando corretamente e de que todos os testes estão passando.

## Autores
Mateus Marinho