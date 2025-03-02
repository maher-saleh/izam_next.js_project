import { IconButton } from "@mui/material";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

type Position = {
    id: number;
    title: string;
    by: string;
    location: string;
    posted: string;
    qualifications: string[];
    categories: string[];
    match_index: number;
    newest_index: number;
    latest_index: number;
}

interface JobItemProps {
  position: Position;
}

export default function JobItem({ position }: JobItemProps) {
    const [like, setLike] = useState(false);

    return (
        <div key={position.id} className={`relative ${like?"!bg-green-200 border-green-600 hover:!border-green-600":"bg-white"} px-5 py-4 my-[10px] border border-gray-300
            rounded-md cursor-pointer hover:bg-green-100 hover:border-green-600 group transition-all duration-300`}>
            <IconButton onClick={() => setLike(!like)}
                className={`absolute ml-auto mr-[20px] right-0 shadow-md bg-gray-100 text-gray px-2 py-2 rounded-full border-4 border-black text-gray
                            hover:text-red-400 hover:bg-gray-100 transition-all duration-200
                            ${like?"!bg-red-100 !shadow-red-500/50 !text-red-600" : "bg-gray-100 text-gray"}`}
                        >
                <FavoriteIcon className="text-sm transition-all duration-200"></FavoriteIcon>
            </IconButton>
            <h6 className="font-bold text-[20px] leading-[1.4]">{position.title}</h6>
            <p className="text-[14px]">{position.by}</p>
            <div className="flex items-center">
                <span className="mr-1 text-[18px] text-gray-800 font-medium">⚲</span>
                <p className="text-[14px] inline">{position.location}</p>
                <CalendarMonthIcon className="ml-4 mr-1 text-[20px] text-gray-500"/>
                <p className="text-[14px] inline">{position.posted}</p>
            </div>
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
}