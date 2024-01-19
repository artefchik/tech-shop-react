import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleTypeBlock.module.scss';
import { ArticleType } from '../../model/types/article';

interface ArticleTypeBlockProps {
    className?: string;
    type:ArticleType
}

export const ArticleTypeBlock = ({ className, type }: ArticleTypeBlockProps) => (
    <div className={classNames(cls.ArticleTypeBlock, {}, [className])}>
        {type}
    </div>
);
