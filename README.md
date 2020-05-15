<h1 align="center">Express Typescript Boilerplate</h1>

### Features

- **Typescript**
- **Express**
- **Passport JWT Authentication**
- **TypeORM configured for MySQL**
- **Basic User and Admin controllers**
- **Basic role checking**
- **ESLint for Typescript**
- **Prettier for code formatting**

## > Getting Started

### Step 1: Set up the Development Environment

Install [Node.js and NPM](https://nodejs.org/en/download/)
Install a MySQL Database (i used XAMPP).

### Step 2: Fork this project

Configure package.json for your own project.

```bash
npm run start
```

> This installs all dependencies with NPM. After that you can run `npm run migration:run` to create the Admin account.

### Other usefull info

You can check `package.json` for the full list of commands.
I suggest installing `typeorm` globally.

## > Project Structure

| Name                     | Description                                |
| ------------------------ | ------------------------------------------ |
| **build/**               | Compiled source files will be placed here  |
| **src/**                 | Source files                               |
| **src/config/**          | Configuration file (JWT Secret, Issuer)    |        |
| **src/controllers/**     | REST API Controllers                       |
| **src/entity/**          | TypeORM entities like User                 |
| **src/api/middlewares/** | Express Middlewares like Passport JWT      |
| **src/migration/**       | Migration files with an example migration. |
| **src/routes/**          | REST API EndPoints                         |
| **src/utils/**           | Other utility files such as Roles          |
| .eslintignore            | ESLint ignored files                       |
| .eslintrc.js             | ESLint Configuration file                  |
| .gitignore               | gitignore configuration                    |
| .prettierignore          | Prettier ignored files                     |
| .prettierrc.json         | Prettier Configuration file                |
| .ormconfig.json          | TypeORM configuration file (MySQL)         |
| .package.json            | Self Explanatory                           |
| .tsconfig.json           | TypeScript Configuration file              |

## ❯ License

[MIT](/LICENSE)
