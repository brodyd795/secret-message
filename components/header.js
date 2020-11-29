import React, {useState} from 'react';
import Link from 'next/link';

const A = ({children, href}) =>
    <Link href={href}>
        <a
            className={'p-3 uppercase w-full md:w-auto flex justify-center md:inline-block hover:bg-gray-800'}
        >
            {children}
        </a>
    </Link>;

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className={'h-screen w-full flex flex-col fixed'}>
            <div className={'w-full bg-blue-500 flex justify-between'}>
                <span>HOME</span>
                <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
            </div>
            <div style={{transition: '0.5s'}} className={`bg-green-500 flex flex-grow ${isOpen ? 'w-full' : 'w-0'} z-10 left-0 overflow-x-hidden`}>
                <div className={'relative w-full'}>
                    <span>Content</span>
                </div>
            </div>
        </header>
        // <header className={`${isOpen && 'h-screen'} sm:h-auto md:flex sm:justify-between bg-red-500`}>
        //     <div className={'w-full md:w-auto relative items-center flex justify-between h-1/5 bg-green-500'}>
        //         <div className={'inline-block flex items-center p-3'}>
        //             <Link href={'/'}>
        //                 <a className={'text-lg'}>Home</a>
        //             </Link>
        //         </div>
        //         <div className={'md:hidden'}>
        //             <button
        //                 type={'button'}
        //                 onClick={() => setIsOpen(!isOpen)}
        //                 className={'block hover:text-white focus:text-white focus:outline-none p-3'}
        //                 style={{color: 'blue'}}
        //             >
        //                 <svg
        //                     className="h-6 w-6 fill-current"
        //                     viewBox="0 0 24 24"
        //                 >
        //                     <path
        //                         className={!isOpen ? 'block' : 'hidden'}
        //                         fillRule="evenodd"
        //                         d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
        //                     />
        //                     <path
        //                         className={isOpen ? 'block' : 'hidden'}
        //                         fillRule="evenodd"
        //                         d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
        //                     />
        //                 </svg>
        //             </button>
        //         </div>
        //     </div>
        //     <div>
        //         <span>Hello</span>
        //     </div>
        //     {/* <div className={`h-full flex flex-col items-center mt-56 md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        //         <A href={'#'}>{'Send message'}</A>
        //         <A href={'https://github.com/brodyd795/secret-message'}>{'Source Code'}</A>
        //         <A href={'#'}>{'About'}</A>
        //     </div>
        //     <div className={`hidden md:block h-full flex flex-row items-center ${isOpen ? 'block' : 'hidden'} `}>
        //         <A href={'#'}>{'Send message'}</A>
        //         <A href={'https://github.com/brodyd795/secret-message'}>{'Source Code'}</A>
        //         <A href={'#'}>{'About'}</A>
        //     </div> */}
        // </header>
    );
};

export default Header;
