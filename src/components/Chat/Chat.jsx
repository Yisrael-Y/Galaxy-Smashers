import React, { useContext, useState } from 'react';
import { SocketContext } from './SocketContext';

export default function Chat() {
  const { alert, alertEvents, socket, setAlertEvents } =
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
      setAlertEvents((prev) => [e.target.value, ...prev]);
      console.log(e.target.value);
      setInput('');
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        placeholder="chat..."
        value={input}
        onKeyDown={handleClick}
      />
      {alertEvents &&
        alertEvents.map((event, index) => (
          <div key={index}>
             {event}
          </div>
        ))}
    </div>
  );
}
