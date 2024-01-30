import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import { CSSProperties, useState } from 'react';
import cls from './StarRating.module.scss';
import starIcon from '../../assets/icons/star.svg';

interface StarRatingProps {
    className?: string;
    onSelect?: (starCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = (props: StarRatingProps) => {
    const { className, size = 25, onSelect, selectedStars = 0 } = props;

    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };

    const styles: CSSProperties = {
        width: size,
        height: size,
    };
    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map((star) => (
                <Icon
                    Svg={starIcon}
                    className={classNames(
                        cls.star,
                        {
                            [cls.hover]: currentStarsCount >= star,
                            [cls.selected]: isSelected,
                        },
                        [className],
                    )}
                    // style={styles}
                    key={star}
                    onMouseEnter={onHover(star)}
                    onMouseLeave={onLeave}
                    onClick={onClick(star)}
                />
            ))}
        </div>
    );
};
