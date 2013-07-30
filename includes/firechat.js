var fbUser = 'Not logged in';

//New instance of firebase class to connect to our url
var myConn = new Firebase('https://harbuckle.firebaseio.com/chat');

//new instance to login with connection above 
var auth = new FirebaseSimpleLogin(myConn, function(error, user) {
  console.log('Here I am', user);
  fbUser = user;
});

//applying a keypress listener
$('#messageInput').keypress(function (e) {
  // if enter key hit
  if (e.keyCode == 13) {
    //attach value of inputs to vars
     var name = fbUser.displayName,
         text = $('#messageInput').val();
    //Push vars to firebase
     myConn.push({name: name, text: text});
     //clears out message input
     $('#messageInput').val('');
  }
});

//listen for an entry using websockets
myConn.on('child_added', function(data) {
  //extracts the value of the entry
  var message = data.val();
  //displays each chat message
  displayChatMessage(message.name, message.text);
});

$('#fbLoginBtn').on('click',function(){
  auth.login('facebook');
})

// takes the params and building a display of the message
// param name: string of username
// param text: string of message content
function displayChatMessage(name, text) {
  $('<li class="list-group-item"></li>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
  // scroll to tbe bottom of the display
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};