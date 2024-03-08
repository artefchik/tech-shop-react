import { NavbarItem } from 'widgets/Navbar/ui/NavbarItem/NavbarItem';
import { memo } from 'react';
import { HStack } from 'shared/ui/Stack';
import { NavbarItemsList } from '../../model/items';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    return (
        <nav className={className}>
            <HStack As="ul" align="center" gap="35">
                {NavbarItemsList.map((item) => (
                    <li key={item.path}>
                        <NavbarItem item={item} />
                    </li>
                ))}
            </HStack>
        </nav>
    );
});
