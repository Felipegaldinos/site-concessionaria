# Vértice Motors — vitrine de veículos

Site demonstrativo de concessionária com catálogo de seis veículos, filtros combinados e diálogo de detalhes. O contato prepara uma mensagem que o visitante pode copiar e enviar por outro canal.

## Funcionalidades

- Busca por marca ou modelo com normalização de acentos.
- Filtros por categoria e preço máximo, contagem e estado sem resultados.
- Detalhes em dialog nativo e preenchimento da mensagem com o veículo selecionado.
- Menu móvel com estado aria-expanded e fechamento por Escape.
- Preparação e cópia de mensagem, com alternativa de seleção manual.

## Tecnologias

HTML, CSS e JavaScript, sem dependências de aplicação ou etapa de build.

## Como executar

Clone o repositório e sirva a pasta por HTTP. Uma opção, caso tenha Python 3 instalado:

```sh
git clone https://github.com/Felipegaldinos/site-concessionaria.git
cd site-concessionaria
python -m http.server 8000
```

Abra http://localhost:8000. Não é necessário instalar pacotes npm. Recursos externos, como imagens e bibliotecas via CDN, exigem conexão com a internet.

## Organização do código

- `index.html` — estrutura e formulário.
- `style.css` — apresentação e adaptação de layout.
- `script.js` — dados, filtros, diálogo e preparação de mensagem.

## Roteiro de demonstração

Busque Volvo, combine categoria e preço, teste uma busca sem resultados e limpe os filtros. Abra os detalhes, use Tenho interesse e confira a mensagem. Preencha o formulário com dados fictícios e teste a cópia.

## Limitações atuais

Veículos, preços e fotos são demonstrativos; as imagens vêm do Unsplash. O formulário não transmite nem armazena os dados: apenas prepara texto para cópia. Não há banco de dados, painel de estoque ou integração de envio. A API de área de transferência depende do contexto e das permissões do navegador; há uma alternativa manual.

## Competências demonstradas

JavaScript sem framework com filtros combinados, estados de interface e diálogo nativo.

## Autoria

Projeto disponível no perfil de [Felipe Galdino](https://github.com/Felipegaldinos). Consulte os arquivos do repositório para verificar os termos de licença aplicáveis.
