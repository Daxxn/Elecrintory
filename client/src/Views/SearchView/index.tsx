import React, { useState } from 'react';
import { PackageSearchProps, PartSearchProps } from '../../Data/Models/DataModels';
import ModelObserver from '../../Data/Models/ModelObserver';
import UserModel from '../../Data/Models/UserModel';
import Message from '../../Data/Utils/Message';
import PackageResults from './PackageResults';
import PartResults from './PartResults';
import SearchControls from './SearchControls';
import './SearchView.css';

export interface SearchViewProps {
   user: UserModel | null;
   selectedTag: string | null;
}

export type SearchMode = 'parts' | 'packages';

const SearchView = (props: SearchViewProps): JSX.Element => {
   const { user } = props;
   const [searchText, setSearchText] = useState<string>('');
   const [searchMode, setSearchMode] = useState<SearchMode>('parts');
   const [results, setResults] = useState<string[] | null>(null);
   const [partProp, setPartProp] = useState<PartSearchProps>('partName');
   const [packProp, setPackProp] = useState<PackageSearchProps>('name');

   const handleSearch = (searchText: string) => {
      if (searchText.length > 0) {
         var newResults = null;
         if (searchMode === 'parts') {
            newResults = ModelObserver.searchParts(partProp, searchText);
         } else {
            newResults = ModelObserver.searchPackages(packProp, searchText);
         }
         if (newResults) {
            Message.msg(
               `${newResults.length} Match${newResults.length > 1 ? 'es' : ''}`,
               'ok'
            );
            setResults(newResults);
         } else {
            Message.msg('No results found...', 'ok');
         }
      } else {
         Message.msg('No search text...', 'issue');
      }
   };

   const handlePropChange = (prop: string) => {
      if (searchMode === 'parts') {
         setPartProp(prop as PartSearchProps);
      } else {
         setPackProp(prop as PackageSearchProps);
      }
   };

   return user ? (
      <div className="search-view-cont">
         <SearchControls
            searchText={searchText}
            searchMode={searchMode}
            searchProp={searchMode === 'parts' ? partProp : packProp}
            handleTextChange={text => setSearchText(text)}
            handleSearch={handleSearch}
            handleSearchModeChange={mode => setSearchMode(mode)}
            handlePropChange={handlePropChange}
         />
         <div className="search-results-cont">
            {results ? (
               <>
                  {results.length > 0 ? (
                     <div>
                        {searchMode === 'parts' ? (
                           <PartResults parts={results} />
                        ) : (
                           <PackageResults packages={results} />
                        )}
                     </div>
                  ) : (
                     <p>No Results...</p>
                  )}
               </>
            ) : (
               <p>No Results...</p>
            )}
         </div>
      </div>
   ) : (
      <p>No User Logged In.</p>
   );
};

export default SearchView;
