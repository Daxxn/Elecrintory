import React from 'react';
import './Item.css';

export type ItemTypes = 'str' | 'num' | 'bool';

export interface ItemProps {
   type: ItemTypes;
   label: string;
   value: any;
}

const Item = (props: ItemProps): JSX.Element => {
   const { type, label, value } = props;

   return (
      <div className="item-cont">
         <label className="item-label">{label}</label>
         {type === 'str' || type === 'num' ? (
            <p className="item-value">{value}</p>
         ) : (
            <input className="item-check" type="checkbox" value={value} disabled={true} />
         )}
      </div>
   );
};

export default Item;
