export const getDate = (todayDate?: Date) => {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    if (todayDate) {
        if (day === todayDate?.getDate()) {
            return { minutes, hour, text: 'сегодня' };
        }
    }
    return { day, minutes, hour };
};
