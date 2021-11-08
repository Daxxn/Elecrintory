import React from 'react';
import './SearchBox.css';

export interface SearchBoxProps {
   searchText: string;
   handleTextChange: (text: string) => void;
   handleSearch: (searchText: string) => void;
   searchProp?: string;
}

const SearchBox = (props: SearchBoxProps): JSX.Element => {
   const { searchText, searchProp, handleTextChange, handleSearch } = props;

   return (
      <div className="search-cont">
         <input
            className="search-field"
            placeholder={`Search in ${searchProp}`}
            onChange={e => handleTextChange(e.target.value)}
            value={searchText}
         />
         <div className="button-cont">
            <button className="clear-button" onClick={() => handleTextChange('')}>
               X
            </button>
            <button
               className="search-button"
               onClick={() => handleSearch(searchText)}
            >
               Search
            </button>
         </div>
      </div>
   );
};

export default SearchBox;
