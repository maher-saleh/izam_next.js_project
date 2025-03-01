"use client";
import Dropdown from "./components/Dropdown";
import { useState } from "react";
import { IconButton } from "@mui/material";
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { useDrawerContext } from "./contexts/drawer";
import JobItem from "./components/JobItem";

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
        {positions.map((position, index)=>{
            return <JobItem key={index} position={position}/>;
          })}
      </div>
    </div>
  );
};