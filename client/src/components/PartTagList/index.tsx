import React from 'react';
import './PartTagList.css';
import Tag from './tag';

export interface PartTagListProps {
   tags: string[];
   handleSelectTag: (tag: string) => void;
}

const PartTagList = (props: PartTagListProps): JSX.Element => {
   const { tags, handleSelectTag } = props;

   return (
      <div className="base-tag-list">
         {tags.length ? (
            <div>
               {tags.map(t => <Tag tag={t} handleSelect={handleSelectTag}/>)}
            </div>
         ) : (
            <h4>No Tags</h4>
         )}
      </div>
   );
};

export default PartTagList;
