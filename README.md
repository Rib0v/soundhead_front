<p align="center"><img src="https://raw.githubusercontent.com/Rib0v/soundhead_front/6494fe30b917ffc0c583cd90d933e5951c012656/assets/nuxt-logo.svg" width="400" alt="NuxtJS Logo"></p>

# О проекте

Frontend-часть интернет-магазина. Стек: `Vue3` + `Nuxt3` + `TypeScript`. Стиль - `Composition API`.  Настроен для `Server Side Rendering`.

[[Backend тут](https://github.com/Rib0v/soundhead_back)]

# Как развернуть локально

*Примечание: в кажестве менеджера пакетов используется классический* `Yarn v1.22.22`.

Устанавливаем зависимости:

```bash
yarn
```

Копируем файл конфига:

```bash
cp nuxt.config.ts.example nuxt.config.ts
```

Если backend работает не на `8000` порту — меняем в конфиге переменную `apiPort`.

Запускаем:

```bash
yarn dev
```

# Как развернуть в Docker

##### Различия в ОС

Все команды написаны для `Linux` системы. В `Windows` и `Mac OS` необходимо заменить `docker compose` на `docker-compose`, а `sudo` писать не обязательно. В `Windows` все команды выполняются в среде `WSL`.

##### Установка

Копируем файл конфига:

```bash
cp nuxt.config.ts.example nuxt.config.ts
```

И файл с переменными окружения для `docker`:

```bash
cp .env.example .env
```

Записываем id хоста в переменную, чтобы не было проблем с правами доступа к файлам:

```bash
echo -e "\nDOCKER_USER=$(id -u):$(id -g)" >> .env
```

Устанавливаем зависимости:

```bash
sudo docker compose run --rm yarn
```

##### Запуск

Сначала нужно создать общую сеть и запустить frontend приложение, только после этого — [backend-часть](https://github.com/Rib0v/soundhead_back).

Создаём общую сеть:

```bash
sudo docker network create soundhead
```

Запускаем сервер, приложение будет доступно на 80 порту `http://localhost/`

```bash
sudo docker compose up nuxt
```
