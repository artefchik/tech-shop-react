import { CommentType } from 'entities/Comment';

export interface ArticleDetailsCommentsSchema {
  isLoading:boolean;
  error?:string
  data?:CommentType[]
  text?:string
}
