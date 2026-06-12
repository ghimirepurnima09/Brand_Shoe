let io;

export const setIO = (socketInstance) => {
  io = socketInstance;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};