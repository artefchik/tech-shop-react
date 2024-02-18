export const getStorageItem = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (item) {
        try {
            return JSON.parse(item);
        } catch (error) {
            console.error(`Error parsing localStorage item for key ${key}:, ${error}`);
            return null;
        }
    }
    return null;
};

export const setStorageItem = <T>(key: string, value: T) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error parsing localStorage item for key ${key}:, ${error}`);
    }
};
