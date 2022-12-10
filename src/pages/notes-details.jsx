import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import { useAuth } from '../contexts/auth';
import MainLayout from '../layouts/main';
import { findNotesByIDAndUserID, updateNotes } from '../services/notes';

export default function NotesDetails() {
    const { cookies, signOut } = useAuth();
    const navigate = useNavigate();
    let [searchParam, setSearchParam] = useSearchParams();

    const [noteId, setNoteId] = useState('');
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        const noteId = searchParam.get('id');
        const userId = cookies.auth?.id;

        if (!noteId || !userId) {
            navigate('/dashboard');
        }

        setNoteId(noteId);
        const noteDetails = async () => {
            const note = await findNotesByIDAndUserID(noteId, userId);
            if (note.success) {
                setTitle(note.data.title);
                setValue(note.data.body);
            }
        };
        noteDetails();
    }, []);

    const handleUpdateNote = async () => {
        const id = cookies.auth?.id;
        if (!id) {
            signOut();
            s;
            return;
        }

        if (!title) {
            alert('Please enter title');
            return;
        }

        if (!value) {
            alert('Please enter content');
            return;
        }
        const error = await updateNotes({
            id: noteId,
            user_id: id,
            title: title,
            body: value,
        });

        if (error) {
            console.log(error);
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <MainLayout>
            <Navbar />
            <div className='flex flex-col justify-center items-center'>
                <div className='flex gap-x-2 mt-8'>
                    <input
                        type='text'
                        placeholder='Write title here'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='bg-slate-900 text-white px-3 shadow-md rounded-lg mx-auto max-w-lg '
                    />
                    <button
                        onClick={handleUpdateNote}
                        className='btn btn-sm text-xs btn-primary'
                    >
                        Update Note
                    </button>
                </div>
                <div className='w-[300px] md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px]'>
                    <MDEditor
                        className='bg-slate-900 shadow-md rounded-b-lg shadow-black mx-auto max-w-2xl h-96 w-full mt-8'
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
