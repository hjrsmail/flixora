
import { FilmIcon, MagnifyingGlassIcon, TvIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

type NavigationProps = {
   className?: string;
};

const Navigation = ({ className }: NavigationProps) => {

   const { pathname } = useLocation();

   const navItems = [
      { to: '/', icon: <FilmIcon className='size-8' />, label: 'Home' },
      { to: '/movies', icon: <VideoCameraIcon className='size-8' />, label: 'Movies' },
      { to: '/tvshows', icon: <TvIcon className='size-8' />, label: 'TV Shows' },
   ];

   return (
      <div
         className={clsx(
            "bg-black/20 backdrop-blur-sm lg:backdrop-blur-2xl `lg:max-w-[120px] w-full h-[80px] lg:max-h-[950px] lg:h-screen flex lg:flex-col items-center justify-between p-4 py-10 px-10 mb-4 lg:mb-0",
            className
         )} >
         <Link to={'/'}>
            <div className="top-icons w-[32px] h-[32px]">
               <img

                  src={'/images/brandLogo.webp'}
                  alt="Logo"
                  width={32}
                  height={32}
               />
            </div>
         </Link>

         <div className="middle-icons hidden md:flex lg:flex-col items-center justify-center space-x-4 lg:space-x-0 lg:space-y-5 text-gray-500">
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

         <div className="bottom-icons text-gray-500">
            <MagnifyingGlassIcon className='size-8' />
         </div>

      </div>
   );
};

export default Navigation;
