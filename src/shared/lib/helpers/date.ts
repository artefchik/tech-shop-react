export interface getDateRes {
    hour: number;
    minutes: number;
    day: number;
    month: string;
}

const months: string[] = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
];

export const getDate = (value: string | undefined) => {
    if (!value) {
        return null;
    }
    const date = new Date(value);
    return {
        hour: date.getHours(),
        minutes: date.getMinutes(),
        day: date.getDate(),
        month: months[date.getMonth()],
    } as getDateRes;
};
