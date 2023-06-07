import React, { useContext, useState } from 'react';
import { SocketContext } from './SocketContext';

function Chat() {
  const { alert, alertEvents, socket } =
    useContext(SocketContext);
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // on enter
  const handleClick = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      socket.emit('test', e.target.value);
      console.log(e.target.value);
      setInput('');
    }
  };

  return (
    <div className='ChatContainer'>
      <div className='messages'>
        {alertEvents &&
          alertEvents.map((event, index) => <div key={index}>{event}</div>)}
      </div>
      <input
        type="text"
        onChange={handleChange}
        placeholder="chat..."
        value={input}
        onKeyDown={handleClick}
      />
    </div>
  );
}

export default Chat;