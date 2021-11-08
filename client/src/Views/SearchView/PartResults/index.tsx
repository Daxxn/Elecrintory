import React from 'react';
import ModelObserver from '../../../Data/Models/ModelObserver';
import '../SearchView.css';
import Part from './Part';

export interface PartResultsProps {
   parts: string[];
   handleSelected?: (id: string) => void;
}

const PartResults = (props: PartResultsProps): JSX.Element => {
   const { parts } = props;
   const allParts = ModelObserver.getPartCollection();

   return (
      <div className="part-results-cont">
         {parts
            ? Object.values(parts).map(id => (
                 <Part key={`part-result-${id}`} part={allParts[id]} />
              ))
            : ''}
      </div>
   );
};

export default PartResults;
