import React from 'react';
import { StatusResult } from '../../Data/Utils/urlHelper';
import './MessageRoll.css'

export interface MessageRollProps {
   message: string | null;
   status: StatusResult;
}

const MessageRoll = (props: MessageRollProps): JSX.Element => {
   const { message, status } = props;

   return (
      // <div className="message-roll-container">
      <div className={`message-roll-container message-${status}`}>
         {message ? (
            // <p className={`message-text message-${status}`}>{message}</p>
            <p className="message-text">{message}</p>
         ) : ''}
      </div>
   );
};

export default MessageRoll;
