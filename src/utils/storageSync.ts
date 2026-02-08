export const STACK_STORAGE_KEY = 'rapidEat-storage';

export const getStorageData = () => {
    const data = localStorage.getItem(STACK_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
};

export const clearStorageData = () => {
    localStorage.removeItem(STACK_STORAGE_KEY);
};
