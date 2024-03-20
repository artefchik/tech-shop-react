## Сущность статьи


- ui

`ArticleDetails` - Компонент с  информацией о текущей открытой статье

`ArticleList` -  Компонент со списком статей

`ArticleListItem` - Компонент одной статьи (плитка, список)

`ArticleTextBlockComponent` - Компонент текстового блока в  статье 

`ArticleTextImageComponent` - Компонент текстового блока в  статье 

`ArticleTypeTabs` - Компонент типа статьи


- types

`Article` - Тип, описывающий статью

`ArticleDetailsSchema` - Тип, для стора и слайса

- slice

`articleDetailsSlice` - Слайс

- services 

`fetchArticleById` - async thunk для получения одной статьи

- selectors

`getArticleDetailsData` - Селектор для получения информации о текущей открытой статье

`getArticleDetailsError` - Селектор для получения ошибки 

`getArticleDetailsIsLoading` - Селектор для получения состояния загрузки
