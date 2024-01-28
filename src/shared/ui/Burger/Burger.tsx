import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useMenuInitiated } from 'app/providers/MenuInitiatedProvider';
import cls from './Burger.module.scss';

interface BurgerProps {
  className?: string;
}

export const Burger = (props: BurgerProps) => {
    const { className } = props;
    const { isMenuInitiated, menuToggle } = useMenuInitiated();
    const mods: Mods = {
        [cls.open]: isMenuInitiated,
    };

    return (
        <button onClick={menuToggle} className={classNames(cls.Burger, mods, [className])}>
            <span />
        </button>
    );
};
