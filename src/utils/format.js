export const formatDate = (date) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(date)); // 2021-08-01T00:00:00.000Z => 1 Agustus 2021, 07:00:00
};
