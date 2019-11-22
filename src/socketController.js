import events from "./events";

const socketController = socket => {
  socket.on(events.setNickname, ({ nickname }) => {
    const broadcast = (event, data) => socket.broadcast.emit(event, data);
    socket.nickname = nickname;
    broadcast(events.newUser, { nickname });
  });
  socket.on(events.disconnect, () => {
    broadcast(events.disconnected, { nickname: socket.nickname });
  });
};

export default socketController;
