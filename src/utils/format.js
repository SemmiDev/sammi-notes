export const formatDate = (date) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    // 2021-08-01T00:00:00.000Z => 1 Agustus 2021, 07:00
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(date));
};

export const removeMarkdown = (text) => {
    text = text.replace(/([*_~`])/g, '');
    return text;
};

export const limitChar = (str, limit) => {
    const newStr = [];
    if (str.length > limit) {
        str.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newStr.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newStr.join(' ')} ...`;
    }
    return str;
};
