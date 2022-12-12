import { formatDate, limitChar, removeMarkdown } from '../utils/format';

export const CardNotes = ({
    id,
    title,
    body,
    updated_at,
    tags,
    setTagFilter,
}) => {
    return (
        <div className='card w-72 bg-transparent text-black border-1 border-black shadow-xl hover:shadow-2xl'>
            <div className='card-body'>
                <p className='text-xs mb-2 text-left text-secondary italic'>
                    {formatDate(updated_at)}
                </p>
                <a
                    href={`notes-details?id=${id}`}
                    className='card-title hover:text-primary'
                >
                    {title}
                </a>
                <p>{limitChar(removeMarkdown(body), 20)}</p>
                <div className='card-actions justify-between items-center mt-5'>
                    <div className='flex flex-wrap gap-2'>
                        {tags.map((tag) => (
                            <span
                                key={tag.id}
                                onClick={() => setTagFilter(tag.name)}
                                className='badge badge-outline hover:bg-info transition-all duration-300 hover:cursor-pointer'
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
