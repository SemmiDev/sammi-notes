export default function MainLayout({ children }) {
    return (
        <main className='antialiased mx-auto flex flex-col bg-gradient-to-tr from-[#e472a2] via-[#fdc378] to-[#af8fe5] rounded-xl min-h-screen w-full'>
            {children}
        </main>
    );
}
