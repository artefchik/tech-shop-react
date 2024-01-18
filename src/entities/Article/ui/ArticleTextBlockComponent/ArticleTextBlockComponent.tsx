import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleTextBlock } from 'entities/Article/model/types/article';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { memo } from 'react';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
    className?: string;
    block:ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(({ className, block }: ArticleTextBlockComponentProps) => (
    <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
        {block.title && <Text size={TextSize.MEDIUM} title={block.title} className={cls.title} />}
        {block.paragraphs
          && block.paragraphs.map(
              (paragraph, index) => (
                  <Text
                      key={index}
                      theme={TextTheme.TEXT}
                      text={paragraph}
                      className={cls.text}
                  />
              ),
          )}
    </div>
));
