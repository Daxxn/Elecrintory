import React from 'react';
import Item from '../../../Components/SimpleComponents/Item';
import PartModel from '../../../Data/Models/DataModels';
import '../SearchView.css';

export interface PartProps {
   part: PartModel;
}

const Part = (props: PartProps): JSX.Element => {
   const { part } = props;

   return (
      <div className="part-cont">
         <Item label="Part Name" value={part.partName} type="str" />
         <Item label="Manufacturer" value={part.manufacturer} type="str" />
         <Item label="Inventory" value={part.inventory} type="num" />
         <Item label="Ordered" value={part.ordered} type="num" />
      </div>
   );
};

export default Part;
