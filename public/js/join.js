const socket = io();
const select = document.querySelector("#options-template").innerHTML;
socket.on("rooms", (rooms) => {
  const html = Mustache.render(select, {rooms:rooms.rooms});
  document.querySelector("#rooms").innerHTML = html;
});
