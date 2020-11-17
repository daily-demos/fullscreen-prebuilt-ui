// Helper function prints events to the console
// Will be passed as callback to callFrame event handlers
function showEvent(e) {
  console.log('video call event -->', e);
}

async function createRoom() {
  const newRoomEndpoint = `${window.location.origin}/.netlify/functions/rooms`;

  try {
    let response = await fetch(newRoomEndpoint, {
      method: 'POST'
    }),
      room = await response.json();
    return room.url;
  } catch (e) {
    console.error(e);
  }
}

async function run() {
  // we're assuming an incoming url from the chrome extension
  // in the following format: 
  // https://some-netlify-url.com/?room=https://mysubdomain.daily.co/roomname&screenshare=true
  const params = new URLSearchParams(window.location.search);
  const room = params.get("room") || await createRoom();
  const shareScreenOnJoin = params.get("screenshare");

  // Create the DailyIframe, passing styling properties to make it fullscreen
  window.callFrame = window.DailyIframe.createFrame({
    iframeStyle: {
      position: 'fixed',
      border: 0,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  });

  function doAfterJoin(e){ 
    showEvent(e);

    if (shareScreenOnJoin) {
      callFrame.startScreenShare();
    }
  }

  // Install event handlers
  callFrame
    .on('loading', showEvent)
    .on('loaded', showEvent)
    .on('started-camera', showEvent)
    .on('camera-error', showEvent)
    .on('joining-meeting', showEvent)
    .on('joined-meeting', doAfterJoin)
    .on('participant-joined', showEvent)
    .on('participant-updated', showEvent)
    .on('participant-left', showEvent)
    .on('recording-started', showEvent)
    .on('recording-stopped', showEvent)
    .on('recording-stats', showEvent)
    .on('recording-error', showEvent)
    .on('recording-upload-completed', showEvent)
    .on('app-message', showEvent)
    .on('input-event', showEvent)
    .on('error', showEvent)
    // Add a leave handler to clean things up
    .on('left-meeting', leave);

  // Join the room
  await callFrame.join({
    url: room,
    showLeaveButton: true,
  });

  // Leave handler
  function leave(e) {
    showEvent(e);
    callFrame.destroy();
    document.getElementsByClassName('start-button')[0].style.display =
      'initial';
  }

  // Once a call starts running, hide the start button and prompts
  document.getElementsByClassName('start-button')[0].style.display = 'none';

  // Log information about the call to the console
  console.log(
    ' You are connected to',
    callFrame.properties.url,
    '\n',
    'Use the window.callFrame object to experiment with',
    '\n',
    'controlling this call. For example, in the console',
    '\n',
    'try',
    '\n',
    '    callFrame.participants()',
    '\n',
    '    callFrame.setLocalVideo(false)',
    '\n',
    '    callFrame.startScreenShare()'
  );
}
