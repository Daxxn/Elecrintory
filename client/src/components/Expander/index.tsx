import React, { ReactNode, useState } from 'react';
import './Expander.css';

export interface ExpanderProps {
   children: ReactNode;
}

const Expander = (props: ExpanderProps): JSX.Element => {
   const { children } = props;
   const [isOpen, setOpen] = useState<boolean>(false);

   return (
      <div className="base-expander">
         {!isOpen ? (
            <button onClick={() => setOpen(true)}>OPEN</button>
         ) : (
            <>
               <button onClick={() => setOpen(false)}>CLOSE</button>
               {children}
            </>
         )}
      </div>
   );
};

export default Expander;
