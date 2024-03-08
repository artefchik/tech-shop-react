const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
];

export const getDate = (value: Date) => {
    const date = new Date(value);
    return {
        hour: date.getHours(),
        minutes: date.getMinutes(),
        day: date.getDate(),
        month: months[date.getMonth()],
        year: date.getFullYear(),
    };
};

type getDateResult = ReturnType<typeof getDate>;
const convertDateToString = (data: getDateResult, isYearPrint?: boolean) => {
    const { hour, month, minutes, year, day } = data;
    if (isYearPrint) {
        return `${day} ${month} ${year} в ${hour}:${minutes}`;
    }
    return `${day} ${month} в ${hour}:${minutes}`;
};

export function timeAgo(timestamp: Date | undefined) {
    if (!timestamp) return '';
    const currentTime = new Date().getTime();
    const postTime = new Date(timestamp).getTime();
    const timeDifference = currentTime - postTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return convertDateToString(getDate(timestamp), years > 0);
    }
    if (days > 0) {
        return convertDateToString(getDate(timestamp));
    }
    if (hours > 0) {
        return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    }
    if (minutes > 0) {
        return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
    }
    return seconds + (seconds === 1 ? ' second ago' : ' seconds ago');
}
