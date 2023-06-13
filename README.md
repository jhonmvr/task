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
``
curl -X 'POST' \
  'http://localhost:8000/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "admin@mail.com",
  "password": "admin123"

}'


``



## Run tests

```sh
npm test
```
