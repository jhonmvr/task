# prueba

## Build from source

1. Clone the repo



2. Install dependencies.

   ```sh
   npm install
   ```

3. Build the production server.

   ```sh
   npm run build
   ```

4. Run the server.
   ```sh
   npm start
   ```

## Build Docker image locally

```sh
docker docker-compose up -d
```
```
http://localhost:8000/docs/


```
```
curl -X 'POST' \
  'http://localhost:8000/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "admin@mail.com",
  "password": "admin123"

}'


```



## Run tests

```sh
npm test
```



## El diagrama de arquitectura muestra las principales componentes de la aplicación y cómo interactúan entre sí.

- **API Routes**: Esta capa maneja las rutas y las solicitudes HTTP entrantes. Utiliza los controladores para procesar las solicitudes y enviar las respuestas correspondientes.

- **Controllers**: Los controladores son responsables de recibir las solicitudes de las rutas, interactuar con los servicios correspondientes y enviar las respuestas adecuadas. Los controladores también pueden realizar la validación de datos y la autenticación.

- **Services**: Los servicios contienen la lógica de negocio de la aplicación. Se comunican con los repositorios para realizar operaciones en la base de datos y manejar las reglas de negocio específicas.

- **Repositories**: Los repositorios son responsables de interactuar directamente con la base de datos. Realizan consultas y actualizaciones de datos utilizando el ORM (TypeORM).

- **Database**: La base de datos almacena los datos de usuarios y tareas. En este ejemplo, se utiliza un sistema de gestión de bases de datos relacional (RDBMS) como MySQL o PostgreSQL.

- **Middlewares**: Los middlewares son funciones que se ejecutan antes de que las solicitudes lleguen a las rutas. Se utilizan para realizar tareas como la autenticación, la validación de datos o la manipulación de la solicitud.

- **Authentication**: El módulo de autenticación se encarga de generar y verificar los tokens de acceso. Se utiliza el paquete `jsonwebtoken` para la generación y verificación de tokens.

- **Bcrypt**: La biblioteca `bcrypt` se utiliza para el hashing de contraseñas. Se utiliza al crear y actualizar contraseñas de usuarios.
