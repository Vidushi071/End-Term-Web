const socket = io();

async function loadMsgs() {
  const allMsgs = await axios.get("/allmessages");
  console.log(allMsgs);

  for (let msg of allMsgs.data) {

    // const time = timeDifference(new Date(),new Date(msg.createdAt))
    const time = new Date();

    $("#all-msg-container").append(
      `<li>
        <span>${msg.user}</span>
        <p>${msg.content}</p>
        <div>
          <span>${time}</span>
        </div>
      </li>`
    );
  }
}

loadMsgs();

$("#send-msg-btn").click(() => {
  const textMsg = $("#msg-text").val();

  socket.emit("send-msg", {
    user: currentUser,
    msg: textMsg,
  });

  $("#msg-text").val("");
});

socket.on("recived-msg", (data) => {

  const time= new Date()
  
  $("#all-msg-container").append(
    `<li>
        <span>${data.user}</span>
        <span>${time}</span>
        <p>${data.msg}</p>
      </li>`
  );
});

