# EcoHub Frontoffice
Веб морда для приложения EcoHub. Общается с открытыми методами через
админску апи (api_admin).

## Запустить локально
1) Скачать зависимости
    ```
    npm i
    ```
2) Запустить
    ```
    npm run serve
    ```

## Запустить на сервере
1) В корнь проекта скопировать сертификаты или создать с помощь команды:
   ```bash
   openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
   ```
2) Собрать образ
    ```
    docker-copmose build
    ```
3) Запустить
    ```
    docker-compose up -d
    ```
