import React from 'react';
import { StatusResult } from '../../Data/Utils/urlHelper';
import './MessageRoll.css'

export interface MessageRollProps {
   message: string | null;
   status: StatusResult;
}

const MessageRoll = (props: MessageRollProps): JSX.Element => {
   const { message, status } = props;

   var messageClass = "message-text";
   if (status !== 'ok') {
      messageClass = `message-text message-${status}`;
   }

   return (
      <div className="base-message-roll-container">
         {message ? (
            <p className={messageClass}>{message}</p>
         ) : ''}
      </div>
   );
};

export default MessageRoll;
