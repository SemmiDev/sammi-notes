import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SpinnerIcon } from '../components/icons';
import Navbar from '../components/navbar';
import { useAuth } from '../contexts/auth';
import MainLayout from '../layouts/main';
import { findNotesByIDAndUserID, updateNotes } from '../services/notes';

export default function NotesDetails() {
    const { authSession, signOut } = useAuth();
    const navigate = useNavigate();
    let [searchParam, setSearchParam] = useSearchParams();

    const titleRef = useRef();

    const [noteId, setNoteId] = useState('');
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [tag, setTag] = useState('');
    const [listTag, setListTag] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const noteDetails = async (noteId, userId) => {
        const note = await findNotesByIDAndUserID(noteId, userId);
        if (note.success) {
            setTitle(note.data.title);
            setValue(note.data.body);
            const tagsData = note.data.tags.map((tag) => tag.name);
            setListTag(tagsData);
        }
    };

    useEffect(() => {
        const noteId = searchParam.get('id');
        const userId = authSession?.id;

        if (!noteId || !userId) {
            navigate('/dashboard');
        }

        setNoteId(noteId);
        noteDetails(noteId, userId);
    }, []);

    const handleUpdateNote = async () => {
        setIsLoading(true);
        const id = authSession?.id;
        if (!id) {
            signOut();
            return;
        }

        if (!title) {
            titleRef.current.focus();
            setIsLoading(false);
            return;
        }

        if (!value) {
            alert('Please enter content');
            setIsLoading(false);
            return;
        }

        const error = await updateNotes({
            id: noteId,
            userId: id,
            title: title,
            body: value,
            tags: listTag,
        });

        if (error) {
            setError(error);
            setIsLoading(false);
            return;
        }
        navigate('/dashboard');
    };

    return (
        <MainLayout>
            <Navbar />
            <div className='flex flex-col justify-center items-center'>
                <div className='w-[300px] md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px]'>
                    <div className='max-w-2xl shadow-2xl shadow-pink-400  hover:shadow-pink-500 transition-all duration-150 ease-linear p-3 rounded-xl gap-3 mx-auto flex justify-between mt-5 flex-wrap'>
                        <input
                            type='text'
                            placeholder='Write title here'
                            value={title}
                            ref={titleRef}
                            onChange={(e) => setTitle(e.target.value)}
                            className='bg-transparent font-bold placeholder:text-black/60 rounded-md px-2 py-1 text-xl text-black'
                        />
                        <button
                            onClick={handleUpdateNote}
                            className='btn text-xs bg-black btn-sm text-white'
                        >
                            {isLoading ? <SpinnerIcon /> : 'Update'}
                        </button>
                    </div>

                    <div className='max-w-2xl shadow-2xl  hover:shadow-pink-500 transition-all duration-150 ease-linear shadow-pink-400 p-3 rounded-xl gap-1 mx-auto flex justify-between flex-wrap'>
                        <input
                            type='text'
                            placeholder='Tag (press space to add)'
                            value={tag}
                            onChange={(e) => {
                                if (e.target.value.includes(' ')) {
                                    // check just space
                                    if (e.target.value.trim() === '') {
                                        setTag('');
                                        return;
                                    }

                                    // check if tag already exist
                                    if (listTag.includes(tag)) {
                                        setTag('');
                                        return;
                                    }

                                    setListTag([...listTag, tag]);
                                    setTag('');
                                } else {
                                    setTag(e.target.value);
                                }
                            }}
                            className='bg-white rounded-lg active:outline-2 active:outline-double px-2 py-1 text-slate-900'
                        />

                        <div className='max-w-2xl gap-1 mx-auto flex mt-2 flex-wrap'>
                            {listTag.map((item, index) => (
                                <div
                                    onClick={() => {
                                        const newListTag = listTag.filter(
                                            (item, i) => i !== index
                                        );
                                        setListTag(newListTag);
                                    }}
                                    key={index}
                                    className='bg-white hover:line-through hover:outline hover:outline-1 hover:outline-red-600 shadow-pink-400 text-slate-900 hover:bg-red-400 hover:cursor-pointer text-xs rounded-full flex items-center  shadow shadow-2xl px-2 py-1 mr-2'
                                >
                                    <span className='text-xs md:text-sm'>
                                        {' '}
                                        {item}
                                    </span>

                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-3 w-3 inline-block ml-1 fill-current text-red-900'
                                        viewBox='0 0 320 512'
                                    >
                                        <path d='M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z' />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </div>

                    <MDEditor
                        data-color-mode='light'
                        className='shadow-2xl bg-gradient-to-tr from-[#e472a2] via-[#fdc378] to-[#af8fe5] rounded-b-md text-slate-900 shadow-pink-400 mx-auto max-w-2xl h-96 w-full mt-3'
                        value={value}
                        preview={'preview'}
                        height={400}
                        onChange={setValue}
                    />
                </div>
            </div>
        </MainLayout>
    );
}
