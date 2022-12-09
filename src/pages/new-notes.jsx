import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import Navbar from '../components/navbar';
import MainLayout from '../layouts/main';

export default function NewNotes() {
    const [value, setValue] = useState('what is up?');
    return (
        <MainLayout>
            <Navbar />
            <div className='flex flex-col justify-center items-center'>
                <div className='w-[300px] md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px]'>
                    <MDEditor
                        className='bg-transparent/60 shadow-md rounded-b-lg shadow-black mx-auto max-w-2xl h-96 w-full mt-8'
                        value={value}
                        preview={'edit'}
                        height={500}
                        onChange={setValue}
                    />
                </div>
            </div>
        </MainLayout>
    );
}
