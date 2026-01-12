# MVP - SISTEMA DE AGENDAMENTO AUTOMATIZADO

DOMÍNIO - BARBEARIA

## REQUISITOS FUNCIONAIS

Entidade de dominio: agendamento, serviço, horário, data, conta

### User Client

- [] Deve ser possível criar um agendamento com data, hora, serviço, nome e telefone
- [] Deve ser possível cancelar o agendamento
- [] Deve ser possível visualizar o seu agendamento

### User Admin

- [x] Deve ser possível se autenticar email e senha (conta previamente criada pelo sistema)
- [x] Deve ser possível definir horário e datas de funcionamento
- [] Deve ser possível bloquear um dia de funcionamento
- [] Deve ser possível visualizar todos os agendamentos dos clientes
- [] Deve ser possível visualizar um agendamento de um cliente em detalhe
- [] Deve ser possível finalizar o agendamento
- [] Deve ser possível modificar os horários de um dia já existente
- [x] Deve ser possível adicionar os serviços e o preço

## REGRAS DE NEGÓCIO

- O sistema não deve permitir criar um agendamento duas vezes no mesmo horário e data
- O sistema de agendamento deve respeita o horário de funcionamento
- O sistema só pode criar um agendamento com os horários, datas e serviços já existentes
- Cada serviço tem um tempo de 40 min

## REQUISITOS NÃO FUNCIONAIS

### Frontend

- React.js mais TypeScript
- TanStack Query - manipula requisições e cache
- TanStack Router - criar roteamento de páginas
- Tailwind CSS - biblioteca de estilo
- Biblioteca de UI - ainda não definida (Shadcn UI ou Redux UI)

### Backend

- Node.js mais typeScript
- Biblioteca Fastify mais Swagger para documentação
- Banco de dados PostgreSQL mais Docker
- ORM - PrismaORM
- Agente de IA - modelo Gemini
- Paradigma - orientado a objetos
- JWT - json web token