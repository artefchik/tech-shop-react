## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start - запуск frontend проекта 
```

----

## Скрипты

- `npm run start` - Запуск frontend проекта на webpack dev server
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме 
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером


----

## Архитектура проекта

Проект написан пользуясь с методологией Feature-Sliced Design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/overview)

----

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

----
## Конфигурация проекта

Для разработки проект использовался Webpack 

Конфигурация хранится в /config
- /config/build - конфигурация webpack
----

## Сущности (entities)

- [Article](/src/entities/Article)
- [Cart](/src/entities/Cart)
- [Profile](/src/entities/Profile)
- [Favorite](/src/entities/Favorite)
- [Product](/src/entities/Product)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)
