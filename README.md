<p align="center"><img src="https://raw.githubusercontent.com/Rib0v/soundhead_front/6494fe30b917ffc0c583cd90d933e5951c012656/assets/nuxt-logo.svg" width="400" alt="NuxtJS Logo"></p>

# О проекте

Frontend-часть интернет-магазина. Стек: `Vue3` + `Nuxt3` + `TypeScript`. Стиль - `Composition API`.  Настроен для `Server Side Rendering`.

[[Backend тут](https://github.com/Rib0v/soundhead_back)]

# Как развернуть локально

Устанавливаем зависимости

```bash
yarn
```

В файле `nuxt.config.ts` указываем адрес и порт сервера

```js
runtimeConfig: {
  public: {
    apiBase: "http://localhost",
    apiBaseLocal: "http://localhost",
    apiPort: "80",
    // ...
  },
},
```

Запускаем

```bash
yarn dev
```

# Как развернуть в Docker

##### Различия в ОС

Все команды написаны для `Linux` системы. В `Windows` и `Mac OS` необходимо заменить `docker compose` на `docker-compose`, а `sudo` писать не обязательно. В `Windows` все команды выполнять в среде `WSL`.

##### Установка

```bash
# Копируем файл конфига
cp .env.example .env

# Записываем id хоста в переменную, чтобы
# не было проблем с правами доступа к файлам
echo -e "\nDOCKER_USER=$(id -u):$(id -g)" >> .env

# Устанавливаем зависимости
sudo docker compose run --rm yarn
```

##### Запуск

Сначала создаём общую сеть и запускаем frontend, после этого — [backend-часть](https://github.com/Rib0v/soundhead_back).

```bash
# создаём общую сеть
sudo docker network create soundhead

# Запускаем сервер
sudo docker compose up nuxt
```
