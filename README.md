# Teste Rápido - Montink

Este é um projeto de front-end para uma página de produto de e-commerce, desenvolvido com React e estilizado com Tailwind CSS.

## Funcionalidades

A página de produto inclui as seguintes funcionalidades:

### 1. **Imagens do Produto**
- Uma imagem principal ocupa cerca de 35% da tela.
- Abaixo da imagem principal, há miniaturas de outras imagens do mesmo produto.
- Ao clicar em uma miniatura, a imagem principal é alterada para a imagem selecionada.

### 2. **Título e Preço do Produto**
- A página exibe o título e o preço do produto.

### 3. **Seletores de Variantes de Produto**
- Existem dois seletores de variantes: Tamanho e Cor.
- Esses campos são gerados dinamicamente a partir de um array ou objeto, sem gerar campos que não sigam esses dados dinâmicos.
  
### 4. **Campo de Disponibilidade de Entrega**
- Um campo de verificação de entrega permite ao usuário inserir o CEP para consultar a disponibilidade de entrega.
- A consulta ao CEP é feita utilizando o [ViaCEP API](https://viacep.com.br/).
- Se o CEP for válido, o endereço completo será exibido. Caso contrário, será mostrado um erro.

### 5. **Persistência de Estado**
- Todas as seleções feitas pelo usuário (imagem, tamanho, cor, e CEP) são salvas no `localStorage`.
- Essas seleções permanecem salvas por 15 minutos, mesmo que a página seja recarregada.
