import React from 'react';
import './PartTagList.css';

export interface TagProps {
   tag: string;
   handleSelect: (tag: string) => void;
}

const Tag = (props: TagProps): JSX.Element => {
   const { tag, handleSelect } = props;

   return (
      <button className="tag-item" onClick={() => handleSelect(tag)}>
         {tag}
      </button>
   );
};

export default Tag;
