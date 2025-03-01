"use client";
import Dropdown from "./components/Dropdown";
import { useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { useDrawerContext } from "./contexts/drawer";

export default function Home() {

  const data = [
    {
      id: 1,
      title: "Gaming UI Designer",
      by: "Rockstar Games",
      location: "Elmansoura, Egypt",
      posted: "10 days ago",
      qualifications: ["0-3y of exp", "Full time", "Remote"],
      categories: ["Creative / Design", "IT / Software development", "Gaming"],
      match_index: 1,
      newest_index: 3,
      latest_index: 6
    },{
      id: 2,
      title: "Senior UX UI Designer",
      by: "Egabi",
      location: "Cairo, Egypt",
      posted: "month ago",
      qualifications: ["0-3y of exp", "Full time", "Hybrid"],
      categories: ["Creative / Design", "IT / Software development"],
      match_index: 2,
      newest_index: 5,
      latest_index: 3
    },{
      id: 3,
      title: "React Frontend Developer",
      by: "Magara",
      location: "Cairo, Egypt",
      posted: "month ago",
      qualifications: ["5-7y of exp", "Freelance", "Remote"],
      categories: ["Creative / Design", "IT / Software development"],
      match_index: 3,
      newest_index: 1,
      latest_index: 4
    },{
      id: 4,
      title: "Gaming UI Designer",
      by: "Rockstar Games",
      location: "Elmansoura, Egypt",
      posted: "10 days ago",
      qualifications: ["0-3y of exp", "Full time", "Remote"],
      categories: ["Creative / Design", "IT / Software development", "Gaming"],
      match_index: 4,
      newest_index: 6,
      latest_index: 2
    },{
      id: 5,
      title: "Senior UX UI Designer",
      by: "Egabi",
      location: "Cairo, Egypt",
      posted: "month ago",
      qualifications: ["0-3y of exp", "Full time", "Hybrid"],
      categories: ["Creative / Design", "IT / Software development"],
      match_index: 5,
      newest_index: 2,
      latest_index: 5
    },{
      id: 6,
      title: "React Frontend Developer",
      by: "Magara",
      location: "Cairo, Egypt",
      posted: "month ago",
      qualifications: ["5-7y of exp", "Freelance", "Remote"],
      categories: ["Creative / Design", "IT / Software development"],
      match_index: 6,
      newest_index: 4,
      latest_index: 1
    }
  ];

  const [positions, setPositions] = useState(data);
  const { isDrawerOpen, setIsDrawerOpen } = useDrawerContext();

  return (
    <div id="body" className="pb-[30px]">
      <Dropdown positions={positions} setPositions={setPositions}></Dropdown>
      <div className="flex gap-2">
        <div className="flex flex-grow bg-green-600 px-[.5rem] sm:px-5 sm:py-2 flex items-center rounded-md ">
          <div className="flex-2 flex-grow text-gray-200">
            <h6 className="text-[clamp(16px,1.62vw,20px)] font-bold sm:text-[20px] leading-[1.4]">UI Designer in Egypt</h6>
            <p className="text-[14px]">70 job positions</p>
          </div>
          <div className="ml-[auto] group">
            <label className="flex flex-col-reverse items-center space-x-2 cursor-pointer relative block group sm:flex-row sm:justify-end">
              <span className="line-height-1 mt-[2px] text-[clamp(12px,1.62vw,.875rem)] text-sm text-gray-200 group-has-[input:checked]:text-white group-hover:text-white">Set alert</span>
              <div className="relative ml-0 sm:ml-2">
                <input type="checkbox" className="sr-only peer"/>
                <div className="group-hover:bg-green-600 absolute left-[.1rem] top-[.15rem] sm:top-[.1rem] w-[1rem] h-[1rem] bg-gray-600 rounded-full transition-all duration-300 peer-checked:translate-x-[20px] peer-checked:bg-green-600 z-10"/>
                <div className="group-hover:bg-gray-200 w-10 h-5 bg-gray-300 rounded-full relative transition-all duration-300 peer-checked:bg-gray-100"/>
              </div>
            </label>
          </div>
        </div>
        <div className="flex-basis inline-block lg:hidden">
          <IconButton style={{ backgroundColor: '#E6E6E6', borderRadius: 8 }} onClick={()=>setIsDrawerOpen(!isDrawerOpen)}>
            <GridViewRoundedIcon style={{ fontSize: 40, color: 'gray' }} />
          </IconButton>
        </div>
      </div>

      <div className="items-center rounded-md">
        {positions.map((position)=>{
          const [like, setLike] = useState(false);
          return (
          <div key={position.id} className={`relative ${like?"!bg-green-200 border-green-600 hover:!border-green-600":"bg-white"} px-5 py-4 my-[10px] border border-gray-300
            rounded-md cursor-pointer hover:bg-green-100 hover:border-green-600 group transition-all duration-300`}>
              <IconButton onClick={() => setLike(!like)}
              className={`absolute ml-auto mr-[20px] right-0 shadow-md bg-gray-100 text-gray px-2 py-2 rounded-full border-4 border-black text-gray
                          hover:text-red-400 hover:bg-gray-100 transition-all duration:200
                          ${like?"!bg-red-100 !shadow-red-500/50 !text-red-600" : "bg-gray-100 text-gray"}`}
                        >
                <FavoriteIcon className="text-sm transition-all duration:200"></FavoriteIcon>
              </IconButton>
            <h6 className="font-bold text-[20px] leading-[1.4]">{position.title}</h6>
            <p className="text-[14px]">{position.by}</p>
            <p className="text-[14px]">{position.location}</p>
            <p className="text-[14px]">{position.posted}</p>
            <div className="mt-2 mb-3">
              {position.qualifications.map((q, index)=>{
                return <span key={index} className="text-[14px] px-2 py-1 border border-gray-400 rounded bg-gray-100 mr-1 group-hover:bg-white transition-all duration-300">{q}</span>
              })}
            </div>
            <hr className={`border ${like?"!border-b-green-600":"border-b-gray-300"} group-hover:border-b-green-600 transition-all duration-300`}/>
            <div className="mt-2 whitespace-pre text-[clamp(14px,1.62vw,18px)] text-wrap">
              {position.categories.join("  -  ")}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
