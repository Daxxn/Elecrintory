import React from 'react';
import Item from '../../../Components/SimpleComponents/Item';
import { PackageModel } from '../../../Data/Models/DataModels';
import '../SearchView.css';

export interface PackageProps {
   packageItem: PackageModel;
}

const Package = (props: PackageProps): JSX.Element => {
   const { packageItem } = props;

   return (
      <div className="result-item-cont">
         <Item label="Name" value={packageItem.name} type="str" />
         <Item label="ID" value={packageItem.packageId} type="str" />
         <Item label="Leads" value={packageItem.leads} type="num" />
      </div>
   );
};

export default Package;
