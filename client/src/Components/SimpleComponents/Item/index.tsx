import React from 'react';
import Number from '../Number';
import './Item.css';

export type ItemTypes = 'str' | 'num' | 'bool';

export interface ItemProps {
   label: string;
   value: any;
   type?: ItemTypes;
}

const switchType = (type: ItemTypes | undefined, value: any) => {
   if (type) {
      if (type === 'str') {
         return <p>{value}</p>;
      } else if (type === 'num') {
         return <Number value={value} disabled={true} />;
      }
      return (
         <input
            className="item-check"
            type="checkbox"
            value={value}
            disabled={true}
         />
      );
   }
   return <p>{value}</p>;
};

const Item = (props: ItemProps): JSX.Element => {
   const { type, label, value } = props;

   return (
      <div className="item-cont">
         <label className="item-label">{label}</label>
         {/* {type === 'str' || type === 'num' ? (
            <p className="item-value">{value}</p>
         ) : (
            <input className="item-check" type="checkbox" value={value} disabled={true} />
         )} */}
         {switchType(type, value)}
      </div>
   );
};

export default Item;
