export const notesAuthDetailsKey = 'notes-auth-details';

export function setDataToLocalStorage(key, value) {
    localStorage.setItem.call(localStorage, key, JSON.stringify(value));
}

export function getDataFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem.call(localStorage, key));
}
