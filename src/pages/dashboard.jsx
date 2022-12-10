import { useEffect, useState } from 'react';
import { CardNotes } from '../components/card-notes';
import { SpinnerIcon } from '../components/icons';
import Navbar from '../components/navbar';
import { useAuth } from '../contexts/auth';
import MainLayout from '../layouts/main';
import { findAllNotesByUserID } from '../services/notes';

export default function Dashboard() {
    const { cookies, signOut } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [errorFetchNotesMessage, setErrorFetchNotesMessage] = useState();
    const [notes, setNotes] = useState([]);

    const handleLoadNotes = async () => {
        setIsLoading(true);
        const userid = cookies.auth?.id;
        const notes = await findAllNotesByUserID(userid);

        if (!notes.success) {
            setErrorFetchNotesMessage(notes.error);
            return;
        }
        setNotes(notes.data);
        setIsLoading(false);
    };

    useEffect(() => {
        handleLoadNotes();
    }, []);

    return (
        <MainLayout>
            <Navbar />
            <div className='mx-auto flex flex-col justify-center mt-5 w-16 '>
                <a
                    href='/new-notes'
                    className='btn btn-sm btn-secondary btn-outline mb-5'
                >
                    New
                </a>
            </div>

            {/* loading center absolute */}
            {isLoading && (
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <SpinnerIcon className='animate-spin h-12 w-12 text-secondary fill-current' />
                </div>
            )}

            <div className='flex flex-col items-center justify-center py-2'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {notes.map((note) => (
                        <CardNotes
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            body={note.body}
                            updated_at={note.updated_at}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
