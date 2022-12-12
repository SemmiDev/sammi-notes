import { useEffect, useState } from 'react';
import { CardNotes } from '../components/card-notes';
import { SpinnerIcon } from '../components/icons';
import Navbar from '../components/navbar';
import { useAuth } from '../contexts/auth';
import MainLayout from '../layouts/main';
import { findAllNotesByUserID } from '../services/notes';

export default function Dashboard() {
    const { authSession } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [errorFetchNotesMessage, setErrorFetchNotesMessage] = useState(null);
    const [notes, setNotes] = useState([]);

    const [tagFilter, setTagFilter] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);

    const handleLoadNotes = async () => {
        setIsLoading(true);

        const userId = authSession?.id;
        const notes = await findAllNotesByUserID(userId);

        if (!notes.success) {
            setErrorFetchNotesMessage(notes.error);
            setIsLoading(false);
            return;
        }

        setNotes(notes.data);
        setFilteredNotes(notes.data);
        setIsLoading(false);
    };

    useEffect(() => {
        handleLoadNotes();
    }, []);

    const toArrayOfChar = (str) => {
        const arrayOfChar = [];
        for (let i = 0; i < str.length; i++) {
            arrayOfChar.push(str[i]);
        }
        return arrayOfChar;
    };

    useEffect(() => {
        if (tagFilter.trim() === '') {
            setFilteredNotes(notes);
            return;
        }

        const filteredNotes = notes.filter((note) => {
            const tags = note.tags.map((tag) => tag.name.toLowerCase());
            return tags.includes(tagFilter.toLowerCase());
        });

        setFilteredNotes(filteredNotes);
    }, [tagFilter]);

    return (
        <MainLayout>
            <Navbar />

            <a
                href='/new-notes'
                className='btn mx-auto btn-sm my-5 btn-primary'
            >
                New Note
            </a>

            <input
                type='text'
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className='input mx-auto input-sm bg-transparent placeholder:text-slate-900 border border-pink-500 text-slate-900 mt-5'
                placeholder='Filter by Tag'
            />

            {isLoading && (
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <SpinnerIcon className='animate-spin h-12 w-12 text-secondary fill-current' />
                </div>
            )}

            {errorFetchNotesMessage ? (
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <div className='text-center text-red-500 text-4xl lg:text-5xl'>
                        {errorFetchNotesMessage}
                    </div>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center py-2 mb-12'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {filteredNotes.map((note) => (
                            <CardNotes
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                body={note.body}
                                updated_at={note.updated_at}
                                tags={note.tags}
                                setTagFilter={setTagFilter}
                            />
                        ))}
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
