import React from 'react';
import keyGenSync from '../../Data/Utils/keyGen';
import './PartTagList.css';
import Tag from './Tag';

export interface PartTagListProps {
   tags: string[];
   handleSelectTag: (tag: string) => void;
}

const PartTagList = (props: PartTagListProps): JSX.Element => {
   const { tags, handleSelectTag } = props;

   return (
      <div className="base-tag-list">
         {tags.length ? (
            <>
               {tags.map(t => <Tag key={`part-tag-item-${keyGenSync()}`} tag={t} handleSelect={handleSelectTag}/>)}
            </>
         ) : (
            <h4>No Tags</h4>
         )}
      </div>
   );
};

export default PartTagList;
