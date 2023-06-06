import io from 'socket.io-client';

const URL = import.meta.env.VITE_SERVER;
const socket = io(URL);

export { socket };
