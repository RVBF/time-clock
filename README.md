
# Projeto de Registro de Ponto

## 1. Introdução
Este é um sistema de registro de ponto desenvolvido em **Laravel** com **MySQL**. Ele permite que funcionários registrem seus pontos e gestores gerenciem os registros e colaboradores. 

---

## 2. Requisitos do Sistema

Antes de começar, certifique-se de ter instalado:

- PHP 8.1 ou superior
- Composer
- MySQL 5.7 ou superior
- Node.js e NPM (para assets do front-end)
- Git

---

## 3. Clonando o Repositório

1. Clone o projeto:
   ```bash
   git clone https://github.com/usuario/repository.git
   cd repository
   ```

2. Configure as permissões:
   ```bash
   chmod -R 775 bootstrap/cache storage
   ```

---

## 4. Configuração do Ambiente

1. Duplique o arquivo `.env.example` e renomeie como `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` e configure os seguintes valores:
   - Configuração do banco de dados:
     ```
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=nome_do_banco
     DB_USERNAME=usuario
     DB_PASSWORD=senha
     ```
   - Chave da aplicação:
     ```bash
     php artisan key:generate
     ```

3. Configure a API de CEP:
   ```
   CEP_API_URL=https://viacep.com.br/ws/
   ```

---

## 5. Instalando Dependências

1. Instale as dependências PHP com Composer:
   ```bash
   composer install
   ```

2. Instale as dependências do front-end:
   ```bash
   npm install
   npm run dev
   ```

---

## 6. Configurando o Banco de Dados

1. Crie as tabelas e configure os dados iniciais:
   ```bash
   php artisan migrate --seed
   ```

2. Verifique se os dados de exemplo foram populados corretamente no banco.

---

## 7. Executando o Projeto

1. Inicie o servidor local:
   ```bash
   php artisan serve
   ```

2. Acesse o sistema em:
   ```
   http://localhost:8000
   ```

---

## 8. Usuários Criados no Seeder

### Administradores
- **Admin 1**:  
  - Email: `admin1@ticto.com.br`  
  - CPF: `12345678901`  
  - Senha: `password`

- **Admin 2**:  
  - Email: `admin2@ticto.com.br`  
  - CPF: `10987654321`  
  - Senha: `password`

- **Admin 3**:  
  - Email: `admin3@ticto.com.br`  
  - CPF: `11223344556`  
  - Senha: `password`

### Funcionários
- **Employee 1**:  
  - Email: `employee1@ticto.com.br`  
  - CPF: `99887766554`  
  - Senha: `password`

- **Employee 2**:  
  - Email: `employee2@ticto.com.br`  
  - CPF: `88776655443`  
  - Senha: `password`

- **Employee 3**:  
  - Email: `employee3@ticto.com.br`  
  - CPF: `77665544332`  
  - Senha: `password`

---

## 9. Funcionalidades Principais

### Para Funcionários
- Login
- Registro de ponto
- Alteração de senha

### Para Administradores
- Cadastro, edição e exclusão de funcionários
- Listagem de registros de ponto com filtros por datas

---

## 10. Testes

Execute os testes automatizados para garantir que o sistema está funcionando corretamente:

```bash
php artisan test
```

---

## 11. Contribuição

Se desejar contribuir com este projeto, faça um **fork**, crie uma **branch**, implemente suas alterações e envie um **pull request**.

---

## 12. Licença

Este projeto está licenciado sob a licença MIT. Para mais detalhes, consulte o arquivo `LICENSE`.

---

Siga este guia para configurar e executar o projeto sem complicações. Se surgir qualquer dúvida, abra uma issue no repositório.