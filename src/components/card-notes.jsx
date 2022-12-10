import { formatDate } from '../utils/format';

const limitChar = (str, limit) => {
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

export const CardNotes = ({ id, title, body, updated_at }) => {
    return (
        <div className='card w-72 bg-transparent text-black border-1 border-black shadow-xl hover:shadow-2xl'>
            <div className='card-body'>
                <p className='text-xs mb-2 text-left text-secondary italic'>
                    {formatDate(updated_at)}
                </p>
                <hr className='mb-2 border-1 border-black/20' />
                <h2 className='card-title'>{title}</h2>
                <p>{limitChar(body, 20)}</p>
                <div className='card-actions justify-end'>
                    <a
                        href={`notes-details?id=${id}`}
                        className='btn btn-sm btn-secondary'
                    >
                        Read
                    </a>
                </div>
            </div>
        </div>
    );
};
