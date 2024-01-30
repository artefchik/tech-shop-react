import { Profile } from 'entities/Profile';
import { ValidateProfileError } from '../../types/editableProfile';

export const validateProfileData = (profile?: Profile) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }
    const { firstname, age, lastname } = profile;
    const errors: ValidateProfileError[] = [];

    if (!firstname || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
        // return '';
    }

    if (!age && !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_AGE);
        // return '';
    }
    return errors;
};
