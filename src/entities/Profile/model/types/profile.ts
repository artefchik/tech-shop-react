import { User } from 'entities/User';

export interface Profile {
    id?: string;
    lastname?: string | undefined;
    firstname?: string | undefined;
    age?: number | undefined;
    avatar?: string;
    user?: User;
}
