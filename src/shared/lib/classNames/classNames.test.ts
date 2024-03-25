import { classNames } from './classNames';

describe('classNames', () => {
    test('only first param', () => {
        expect(classNames('class')).toBe('class');
    });
    test('first param with additional classes', () => {
        const expected = 'class class1 class2';
        expect(classNames('class', {}, ['class1', 'class2'])).toBe(expected);
    });
    test('with mods', () => {
        const expected = 'class class1 class2 hover visible';
        expect(
            classNames('class', { hover: true, visible: true }, [
                'class1',
                'class2',
            ]),
        ).toBe(expected);
    });
    test('with mods false', () => {
        const expected = 'class class1 class2 hover';
        expect(
            classNames('class', { hover: true, visible: false }, [
                'class1',
                'class2',
            ]),
        ).toBe(expected);
    });
    test('with mods undefined', () => {
        const expected = 'class class1 class2 visible';
        expect(
            classNames('class', { hover: undefined, visible: true }, [
                'class1',
                'class2',
            ]),
        ).toBe(expected);
    });
});
