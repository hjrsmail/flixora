
import { BookmarkIcon, FilmIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

type BottomNavProps = {
    className?: string;
};

const BottomNav = ({ className }: BottomNavProps) => {

    const { pathname } = useLocation();

    const navItems = [
        { to: '/', icon: <FilmIcon className='size-8' />, label: 'Home' },
        { to: '/tvshow', icon: <VideoCameraIcon className='size-8' />, label: 'TV Shows' },
        { to: '/bookmark', icon: <BookmarkIcon className='size-8' />, label: 'Bookmarks' },
    ];

    return (
        <div
            className={clsx(
                "bg-black/50 backdrop-blur-sm w-full h-[40px] flex items-center justify-center p-4 py-8 px-10 ",
                className
            )} >

            <div className="middle-icons flex md:hidden items-center  justify-center space-x-16  text-gray-500">
                {navItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        aria-label={item.label}
                        className={clsx(
                            "transition-colors duration-300",
                            pathname === item.to
                                ? "text-flixora-dark scale-110"
                                : "text-gray-500 hover:text-flixora-dark"
                        )}
                    >
                        {item.icon}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
