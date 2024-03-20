import { useSelector } from 'react-redux';
import { getUserAuthData, getUserRoles, UserRoles } from 'entities/User';
import { Navigate, useLocation } from 'react-router-dom';

import { RoutePath } from 'shared/const/router';
import { useMemo } from 'react';

interface RequireAuthProps {
    children: JSX.Element;
    roles?: UserRoles[];
}

export function RequireAuth(props: RequireAuthProps) {
    const { children, roles } = props;
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    const userRoles = useSelector(getUserRoles);

    const hasRequireRoles = useMemo(() => {
        if (!roles) {
            return true;
        }
        return roles.some((role) => userRoles?.includes(role));
    }, [roles, userRoles]);
    if (!auth || !hasRequireRoles) {
        return (
            <Navigate to={RoutePath.main} state={{ from: location }} replace />
        );
    }
    return children;
}
