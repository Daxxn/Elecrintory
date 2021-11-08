import React from 'react';
import { SearchMode } from '..';
import ComboBox from '../../../Components/SimpleComponents/ComboBox';
import SearchBox from '../../../Components/SimpleComponents/SearchBox';
import {
   PackageSearchProps,
   PartSearchProps,
} from '../../../Data/Models/DataModels';
import '../SearchView.css';

export interface SearchControlsProps {
   searchText: string;
   searchMode: SearchMode;
   searchProp: string;
   handleTextChange: (text: string) => void;
   handleSearch: (searchText: string) => void;
   handleSearchModeChange: (mode: SearchMode) => void;
   handlePropChange: (prop: string) => void;
}

const SearchControls = (props: SearchControlsProps): JSX.Element => {
   const {
      searchText,
      searchMode,
      searchProp,
      handleTextChange,
      handleSearch,
      handleSearchModeChange,
      handlePropChange,
   } = props;

   return (
      <div className="search-controls-cont">
         <SearchBox
            searchText={searchText}
            handleTextChange={handleTextChange}
            handleSearch={handleSearch}
            searchProp={searchProp}
         />
         <ComboBox
            items={['parts', 'packages']}
            selectedItem={searchMode}
            handleSelected={mode => handleSearchModeChange(mode as SearchMode)}
         />
         {searchMode === 'parts' ? (
            <ComboBox
               selectedItem={searchProp}
               items={['partName', 'manufacturer', 'inventory', 'ordered', 'tags']}
               handleSelected={prop => handlePropChange(prop as PartSearchProps)}
            />
         ) : (
            <ComboBox
               items={['name', 'packageId', 'leads']}
               selectedItem={searchProp}
               handleSelected={prop => handlePropChange(prop as PackageSearchProps)}
            />
         )}
      </div>
   );
};

export default SearchControls;
