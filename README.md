# Sistema de Monitoramento — Sprint 2 (Mobile)

Aplicativo mobile que simula um sistema de monitoramento por sensores. Cada
sensor gera leituras (medições), e o app classifica automaticamente cada leitura
em um status — **normal**, **alerta** ou **crítico** — exibindo tudo numa
interface organizada.

O foco desta Sprint foi a **modelagem dos dados** e a **organização do código**,
separando claramente os tipos, a lógica de negócio e a interface visual.

---

## Tecnologias

- **React Native** com **Expo**
- **TypeScript** para tipagem estática

---

## Estrutura do projeto

```
mobile/
├── App.tsx           
└── src/
    ├── types/              
    │   ├── sensor.ts        
    │   ├── medicao.ts      
    │   ├── status.ts        
    │   └── index.ts         
    ├── logic/               
    │   ├── status.ts       
    │   └── simulador.ts     
    ├── data/                
    │   └── sensores.ts      
    └── interfaces/          
        ├── StatusBadge.tsx  
        ├── SensorCard.tsx   
        └── MonitorScreen.tsx
```

Essa divisão atende ao requisito central da Sprint: **separar Tipos, Lógica e
Interface** em camadas independentes.

---

## Como o código funciona

### 1. Modelagem (`src/types/`)

A base de tudo são os tipos que descrevem os dados do sistema.

Um **Sensor** é um equipamento de medição, identificado por nome, tipo e a
unidade que ele lê:

```ts
export type Sensor = {
  id: number;
  nome: string;
  tipo: string;
  unidade: string;
};
```

Uma **Medição** é uma leitura feita por um sensor em um instante de tempo. Repare
que ela carrega o sensor inteiro dentro dela (relação entre os dois modelos):

```ts
export type Medicao = {
  id: number;
  sensor: Sensor;
  valor: number;
  data: Date;
};
```

O **Status** é o estado da leitura, representado por um conjunto fixo de valores
possíveis:

```ts
export type Status = "normal" | "alerta" | "critico";
```

### 2. Lógica (`src/logic/`)

A regra que classifica cada leitura fica isolada da interface, em uma função
pura:

```ts
export function calcularStatus(valor: number): Status {
  if (valor > 100) return "critico";
  if (valor > 80) return "alerta";
  return "normal";
}
```

> **Observação de engenharia:** os limites (80 e 100) são globais nesta versão.
> Em um sistema real, cada sensor teria seus próprios limites, já que 100 °C e
> 100 % de umidade não representam o mesmo nível de risco. É uma evolução natural
> para a próxima Sprint.

O arquivo também define as **cores** de cada status, mantendo a aparência ligada
à lógica e não espalhada pela interface. O `simulador.ts` gera leituras
aleatórias dentro de faixas calibradas para que os três status apareçam durante a
demonstração.

### 3. Dados (`src/data/`)

A lista de sensores do sistema fica centralizada em um único lugar, fácil de
editar ou substituir por dados reais (vindos de uma API, por exemplo) no futuro.

### 4. Interface (`src/interfaces/`)

A camada visual é construída em componentes pequenos e reutilizáveis:

- **StatusBadge** — o selo colorido (verde, amarelo ou vermelho) que mostra o
  status.
- **SensorCard** — o cartão que exibe uma leitura completa: sensor, tipo,
  valor + unidade, data e status.
- **MonitorScreen** — a tela principal, que permite **alternar entre os
  sensores**, gerar novas leituras e ver o histórico das últimas medições.

---

## Funcionalidades

- Alternar entre múltiplos sensores
- Gerar novas leituras simuladas
- Classificação automática de status (normal / alerta / crítico)
- Exibição de sensor, tipo, valor + unidade, data e status
- Histórico das últimas leituras

---

## Como executar

É necessário ter o **Node.js** instalado.

```bash
# 1. Entrar na pasta do projeto
cd mobile

# 2. Instalar as dependências (recria a node_modules)
npm install

# 3. Iniciar o projeto
npx expo start
```

Depois, basta escanear o QR code com o app **Expo Go** (no celular) ou pressionar
`w` para abrir no navegador.
