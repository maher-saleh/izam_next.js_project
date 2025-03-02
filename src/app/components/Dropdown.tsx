"use client";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

type DropDownProps = {
  positions: Position[];
  setPositions: React.Dispatch<React.SetStateAction<Position[]>>;
}

const Dropdown = ({positions, setPositions}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Top match');

  const handleSortByChange = (value: string) => {
    setIsOpen(false);
    setSortBy(value);
    sortPositions(value);
  }

  const sortPositions = (value: string) => {
    if(value=='Top match'){
      const sortedPositions = [...positions].sort((a, b) => a.match_index - b.match_index);
      setPositions(sortedPositions);
    }else if(value=='Newest'){
      const sortedPositions = [...positions].sort((a, b) => a.newest_index - b.newest_index);
      setPositions(sortedPositions);
    }else if(value=='Latest'){
      const sortedPositions = [...positions].sort((a, b) => a.latest_index - b.latest_index);
      setPositions(sortedPositions);
    }
  }
  
  return (
    <div className="relative block text-end mb-2">
      <label>Sorting by: </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-green-600 rounded-md"
      >
        {sortBy} <ExpandMoreIcon className="text-green-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-0 bg-white border rounded-md shadow z-20">
          <ul className="py-2 text-center">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>handleSortByChange('Top match')}>Top match</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>handleSortByChange('Newest')}>Newest</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>handleSortByChange('Latest')}>Latest</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;