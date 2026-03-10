# 🚀 Ultimate Discord Self-Bot (v2.0)

Bem-vindo ao **Ultimate Discord Self-Bot**, uma ferramenta poderosa de automação e utilitários projetada para turbinar sua experiência no Discord. Este bot combina ferramentas de moderação pesada, entretenimento (anime), clonagem de servidores e funcionalidades de "Ghost Mode" para máxima discrição.

> [!CAUTION]
> **Aviso de Segurança:** O uso de self-bots viola os Termos de Serviço do Discord. Use com inteligência e moderação para evitar suspensões em sua conta.

---

## 📸 Demonstração Visual

### Interface e Organização

O bot é capaz de gerenciar e interagir com estruturas complexas de canais, ideal para testes de moderação e organização de servidores de "trollagem" ou estudo.

### Painel de Comandos (In-App)

Sempre que você executa um comando, o bot retorna um log formatado com a lista completa de funcionalidades para facilitar sua navegação.

---

## 🛠️ Configuração e Instalação

### 1. Pré-requisitos

Você precisará do **Node.js** instalado em sua máquina. Para instalar as dependências necessárias, execute:

```bash
npm install discord.js-selfbot-v13 better-sqlite3

```

### 2. Configurando suas Credenciais

Abra o arquivo principal e localize as constantes de configuração. Insira o seu token de usuário e defina o prefixo de sua preferência.

* **TOKEN:** Sua chave de acesso pessoal (nunca compartilhe!).
* **PREFIX:** O gatilho para os comandos (Padrão: `!`).
* **AUTO_MSG_CHANNEL_ID:** Onde o bot enviará o "hi" automático.

---

## 📜 Funcionalidades Detalhadas

O bot é dividido em categorias estratégicas para facilitar o uso:

### 🛡️ Admin & Moderação

* **!wipe:** Limpa instantaneamente todos os canais e cargos do servidor atual.
* **!clear [número]:** Apaga uma quantidade específica de mensagens.
* **!lock/!unlock:** Gerencia permissões de fala no canal rapidamente.
* **!stopspam:** Comando de emergência para parar qualquer loop de spam ativo.

### 🎭 Anime & Interação

Transforme o chat em um ambiente dinâmico com GIFs de alta qualidade:

* `!kiss`, `!hug`, `!slap`, `!punch`, `!kill`, `!dance` e muito mais.

### 🧬 Clonagem de Servidor (`!cloneserver`)

Uma das funções mais complexas: o bot utiliza **SQLite3** para mapear e replicar cargos e canais de um servidor de origem para o de destino, mantendo a estrutura o mais fiel possível.

### 👻 Ghost Mode (`!ghost`)

Ative esta função para que o bot apague automaticamente a sua mensagem de comando 2 segundos após a execução. Isso mantém suas atividades discretas aos olhos de outros usuários e moderadores.

---

## ⚠️ Bugs Conhecidos e Contribuição

Como este é um projeto em constante evolução, alguns comandos podem apresentar erros de **Rate Limit** (limite de velocidade do Discord) ou falhas em servidores com permissões muito restritas.

* **Encontrou um erro?** Não se preocupe! O código é aberto para melhorias. Sinta-se à vontade para refatorar funções ou adicionar novos comandos.
* **Reportar Problemas:** Se algo não estiver funcionando ou se tiver sugestões de novas funções, abra uma **Issue** aqui: [Reportar Erro no GitHub](https://github.com/flowlyn/self-bot-discord/issues).

---

## ⭐ Dê uma Estrela!

Se este projeto te ajudou ou se você achou as funções interessantes, por favor, clique na **estrela (Star)** no topo da página. Isso motiva a continuação do desenvolvimento e a correção de bugs!

---
