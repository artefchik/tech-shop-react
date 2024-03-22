import { User } from 'entities/User';

export interface Profile {
    id?: string;
    avatar?: string;
    lastname?: string | undefined;
    firstname?: string | undefined;
    age?: number | undefined;
    user?: User;
}
