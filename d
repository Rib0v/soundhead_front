#!/bin/bash

case "$1" in

  init)
    echo "Initializing..."

    if [ ! -f nuxt.config.ts ]; then # если файл nuxt.config.ts не существует
      cp nuxt.config.ts.example nuxt.config.ts # копируем образец конфига
    fi

    if [ ! -f .env ]; then # если файл .env не существует
      cp .env.example .env # копируем образец конфига
      echo -e "\nDOCKER_USER=$(id -u):$(id -g)" >> .env # записываем id хоста в переменную, чтобы не было проблем с правами доступа
      echo -e "\nDOCKER_USER=$(id -u):$(id -g)" # и выводим в консоль, чтобы можно было сразу увидеть этот параметр
    fi

    if ! docker network ls --format '{{.Name}}' | grep -q "^soundhead$"; then # если сеть soundhead ещё не существует
      docker network create soundhead # создаём сеть
    fi

    docker compose run --rm yarn
    docker compose up nuxt
    
    echo "Initialization finished"
    echo -e "\e[32m\nFrontend is started. Now run backend.\e[0m"
    ;;

  up)
    echo "Up docker full-stack mode..."
    docker compose up nuxt -d --remove-orphans ${@:2}
    echo -e "\e[32m\nFrontend is started. Now run backend.\e[0m"
    ;;

  down)
    echo "Down docker..."
    docker compose down --remove-orphans ${@:2}
    ;;

  *)
    echo ""
    echo "  Usage: $0 {command} {params}"
    echo ""
    echo "    List of commands:"
    echo ""
    echo "      init — initialize project"
    echo "      up — up docker containers in full-stack mode"
    echo "      down — down docker containers"
    echo ""
    exit 1
    ;;

esac
