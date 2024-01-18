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
        <Button onClick={menuToggle} theme={ThemeButton.CLEAR} className={classNames(cls.Burger, mods, [className])}>
            <span />
        </Button>
    );
};
