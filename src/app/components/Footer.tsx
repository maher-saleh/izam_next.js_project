export default function Footer() {
    return (
        <div className="fixed bottom-0 bg-black pt-[2px] pb-[1px] px-[10px] w-full z-40">
            <p className="text-gray-300 text-xs">© {new Date().getFullYear()} by Maher Saleh</p>
        </div>
    );
}