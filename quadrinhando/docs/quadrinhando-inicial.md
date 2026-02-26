# **Da Ideia ao MVP \- Quadrinhando**

## **1\. Contexto do Problema (Realidade do Território)**

\- Quem são as pessoas?  
Fãs de HQs, geeks iniciantes, pessoas que conhecem filmes e séries mas não sabem por onde começar a ler as HQs, colecionadores e leitores que querem organizar sua leitura.

\- Qual dor concreta elas vivem?  
Dificuldade de compreender a ordem cronológica de universos, sagas, eventos e personagens. Confusão causada por reboots, crossovers e múltiplas linhas do tempo. Sem um guia, o leitor não sabe por onde começar e acaba perdendo a experiência completa.

\- Quais são as restrições do ambiente?  
Acesso a informações fragmentadas em vários sites, livros físicos ou bases de dados inconsistentes. O leitor precisa buscar manualmente cada HQ, evento ou sequência de leitura.

## **2\. Objetivo do Produto (Visão)**

Criar um produto digital que permita organizar e visualizar a sequência cronológica de HQs, universos, eventos e personagens para fãs de quadrinhos, mesmo diante da complexidade das diferentes linhas do tempo, gerando uma experiência de leitura clara e intuitiva, facilitando o entendimento das histórias e personagens.

## **3\. Restrições e Premissas**

Liste explicitamente o que o produto NÃO pode assumir:

\- Conectividade: Inicialmente online, mas pode ser adaptável para consultas offline simples no futuro.

\- Infraestrutura: Funciona em desktop e mobile, mas foco inicial em web responsiva.

\- Direitos autorais: Não hospedar conteúdo protegido, apenas links oficiais para compra ou referência.

\- Complexidade do universo: Nem todos os universos serão mapeados no MVP, priorizar Marvel e DC.

## **4\. Governança do Produto**

\- Consulta: Qualquer usuário visitante da plataforma

\- Cadastro/Edição: Desenvolvedor / equipe do projeto

\- Curadoria/Validação: Criador do projeto ( Arthur Victor de Sá Rodrigues)

Exemplo:

\- Consulta: qualquer morador

\- Cadastro/Edição: agente comunitário

\- Curadoria: ONG

## **5\. Atores (Alistair Cockburn)**

\- Atores primários: Leitor de HQs / fã geek

\- Atores secundários: Desenvolvedor, curador de conteúdo

\- Sistemas externos: Sites oficiais de venda de HQs (Panini, Amazon, Comixology), APIs públicas (opcional futuro)

## **6\. Casos de Uso (Use Cases – orientados a objetivos)**

UC01 – Consultar Universo

Ator primário: Leitor de HQs

Objetivo: Visualizar todos os universos disponíveis e suas linhas do tempo

Pré-condições: Acesso à internet

Cenário principal:

1. Usuário acessa a página de universos  
2. Seleciona um universo  
3. Visualiza linha do tempo completa de HQs e eventos

Extensões: Filtrar por personagem ou evento

UC02 – Consultar Personagem

Ator primário: Leitor de HQs

Objetivo: Visualizar a sequência de aparições de um personagem

Pré-condições: Acesso à internet

Cenário principal:

1. Usuário busca um personagem  
2. Plataforma mostra a timeline do personagem, intercalando universos e eventos

Extensões: Filtrar apenas por um universo específico

UC03 – Consultar HQ Individual

Ator primário: Leitor de HQs

Objetivo: Ver detalhes de uma HQ específica

Pré-condições: Acesso à internet

Cenário principal:

3. Usuário clica em uma HQ  
4. Visualiza capa, descrição, volume, universo, personagens e link oficial de compra

Extensões: Filtrar apenas por um universo específico

## **7\. User Stories**

Template:

Como leitor, quero consultar universos para entender a ordem cronológica das HQs.  
Como leitor, quero acessar detalhes de uma HQ para saber volume, edição e link de compra.

Como leitor, quero acessar detalhes de uma HQ para saber volume, edição e link de compra.

Como desenvolvedor, quero criar a timeline de leitura para que a experiência seja clara e organizada.

## **8\. Escopo do MVP**

Dentro do MVP:

\- Navegação por universo

\- Timeline de personagens e HQs

\- Página individual de HQs com link de compra

\- Sistema básico de curadoria pelo criador

Fora do MVP (futuro):

\- Login de usuários e progress tracking

\- Avaliações e comentários

\- Recomendação de leituras personalizadas

\- Timeline offline / sincronização

## **9\. Critérios de Aceitação**

\- Dado que o usuário acessa a plataforma, quando selecionar um universo, então deve visualizar a linha do tempo correta das HQs.

\- Dado que o usuário busca um personagem, quando selecionar, então deve ver todas as HQs em que ele aparece, na ordem correta.

\- Dado que o usuário clica em uma HQ, quando abrir a página, então deve exibir capa, volume, descrição, universo, personagens e link de compra oficial.

## **10\. Modelo de Dados Mínimo**

\- **Company:** id, name, description, logoUrl

\- **Universe:** id, name, description, startYear, companyId

\-**Comic:** id, title, volume, issueNumber, universeId, orderInUniverse, coverUrl, officialBuyLink

\-**Character:** id, name, description, imageUrl

\-**ComicCharacter:** id, comicId, characterId, appearanceOrder

\-**Event:** id, name, description, universeId (opcional)

## **11\. Arquitetura Mínima do MVP**

Componentes mínimos:

\- Backend Node.js \+ Express

\- Frontend React \+ Vite

\- Banco PostgreSQL (ou JSON inicial para MVP)

\- API simples para CRUD e consultas

\-Frontend consumindo API para exibir universos, personagens e HQs

## **12\. Backlog Inicial (Kickoff do Projeto)**

Épico 1 – Documentação e Prototipagem:

\- Criar visão do produto

\- Criar wireframes no Figma

\- Definir modelos de dados

Épico 2 – Backend:

\- Criar models: Company, Universe, Comic, Character, ComicCharacter

\- Criar rotas GET/POST para consulta de HQs, personagens e universos

\- Implementar filtragem por personagem e universo

Épico 3 – Frontend:

\- Página inicial

\- Página de universo

\- Página de personagem

\- Página de HQ individual

\- Consumir API do backend

\- Ajustar layout responsivo

Épico 4 – Extras MVP:

\- Adicionar links oficiais de compra

\- Timeline básica por personagem e universo

\- Curadoria inicial do conteúdo