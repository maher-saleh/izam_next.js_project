import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import Badge from "@mui/material/Badge";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useProfileContext } from '../contexts/profile';
import { useEffect } from 'react';

export default function Navbar() {
  
  const { isProfileOpen, setIsProfileOpen } = useProfileContext();
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isProfileOpen && !document.getElementById("profile-dropdown")?.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isProfileOpen, setIsProfileOpen]);

  return (
    <nav className="inline-flex items-center w-full bg-gray-800 text-white p-4 fixed top-0 left-0 z-30">
      <h1 className="fixed right-[8px] lg:!relative lg:inline-flex lg:!right-auto tracking-tight [transform:scaleX(0.9)] text-4xl font-bold inline-flex ml-5 pr-5">
        {"iZAM".split("").map((letter, index) => (
            <span key={index} className={`${index == 1 ? "text-green-600" : "text-white"}`}>
            {letter}
            </span>
          )
      )}
      </h1>
      <div className="invisible inline-flex items-center lg:visible transition-opacity duration-200">
        <button className="absolute inline-flex items-center justify-center bg-green-600 rounded-full ml-1 p-1 w-7 h-7"><SearchIcon className="text-white text-[20px]"/></button>
        <input className="text-black rounded-[50px] h-[36px] w-[250px] pl-10" type="text" name="" id="" />
        <div className='right-[40px] flex absolute gap-[20px] text-gray-400 font-sans'>
          <button className="inline-flex flex-col items-center group justify-center mt-[8px]">
            <HomeOutlinedIcon className='group-hover:text-gray-300'/>
            <span className="text-xs mt-1 group-hover:text-gray-300 items-center">Home</span>
          </button>
          <button className="inline-flex flex-col items-center justify-center mt-[8px]">
          <BusinessCenterIcon className='text-white'/>
            <span className="text-xs mt-1 text-white">Jobs</span>
          </button>
          <button className="inline-flex flex-col items-center group justify-center mt-[8px]">
          <GroupOutlinedIcon className='group-hover:text-gray-300'/>
            <span className="text-xs mt-1 group-hover:text-gray-300 items-center">Employees</span>
          </button>
          <span className='w-[1px] border-r'></span>
          <button className="inline-flex flex-col items-center group justify-center mt-[8px]">
            <NotificationsOutlinedIcon className='group-hover:text-gray-300'/>
            <span className="text-xs mt-1 group-hover:text-gray-300 items-center">Notifications</span>
          </button>
          <button className="inline-flex flex-col items-center group justify-center mt-[8px]">
            <Badge badgeContent={1} color='error' className='p-0' classes={{ badge: "text-[10px] px-1 py-1 w-[20px] h-[20px]" }}>
              <MessageOutlinedIcon className='group-hover:text-gray-300'/>
            </Badge>
            <span className="text-xs mt-1 group-hover:text-gray-300 items-center">Messaging</span>
          </button>
          <div className='fixed flex visible left-[30px] lg:relative lg:block lg:left-auto'>
            <button className="inline-flex flex-col items-center group" onClick={()=>setIsProfileOpen(!isProfileOpen)}>
              {/* <AccountCircleOutlinedIcon className='group-hover:text-gray-300'/> */}
              <img className="rounded-full object-cover" src="/profile.jpg" alt="Profile" srcSet="" width={33} height={33} />
              <span className="text-xs mt-1 group-hover:text-gray-300 items-center">Profile ▼</span>
            </button>
            {isProfileOpen && (
              <div className="absolute top-[50px] flex flex-col gap-5 left-0 lg:left-auto lg:right-0 mt-2 bg-white border rounded-md shadow z-30 p-5 text-gray-500 w-max">
                <div className='flex items-center gap-3'>
                  {/* <AccountCircleOutlinedIcon className='group-hover:text-gray-300 w-[72px] h-[72px]'/> */}
                  <img className="rounded-full object-cover" src="/profile.jpg" alt="Profile" srcSet="" width={50} height={50} />
                  <div className='flex-col h-full line-height-1'>
                    <h3 className='flex font-bold text-md text-gray-600 whitespace-nowrap'>Maher Saleh</h3>
                    <p className='flex text-xs whitespace-nowrap'>UX UI Designer</p>
                  </div>
                  <ExpandMoreIcon className="-rotate-90"/>

                </div>
                <div className='flex flex-col gap-3 text-sm'>
                  <hr />
                  <div className='flex flex-col gap-0 cursor-pointer'>
                    <p className='flex font-medium whitespace-nowrap px-2 py-1 hover:bg-gray-200 rounded-lg'>Setting and privacy</p>
                    <p className='flex font-medium whitespace-nowrap px-2 py-1 hover:bg-gray-200 rounded-lg'>Language</p>
                    <p className='flex font-medium whitespace-nowrap px-2 py-1 hover:bg-gray-200 rounded-lg'>Help</p>
                  </div>
                  <hr />
                  <p className='flex font-medium text-red-600 px-2 py-1 whitespace-nowrap hover:bg-gray-200 rounded-lg cursor-pointer'>Logout</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
