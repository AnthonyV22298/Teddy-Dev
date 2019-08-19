var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

var robot_id = "raspberrypi";

function set_robot_id() {
  robot_id = document.getElementById("idInput").value;
}

function connect_to_wifi() {
  var http = new XMLHttpRequest();
  ssid = document.getElementById("email").value;
  pass = document.getElementById("password").value;
  path = "/wifi/" + ssid + "/" + pass;
  http.open("GET", "http://" + robot_id + ".local:5000" + path, /*async*/true);
  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      var ended = new Date().getTime();

      var milliseconds = ended - started;

      if (pong != null) {
        pong(milliseconds);
      }
    }
  };
  try {
    http.send(null);
  } catch(exception) {
    // this is expected
  }
}

async function ping_status() {

  var started = new Date().getTime();

  var http = new XMLHttpRequest();
  
  http.open("GET", "http://" + robot_id + ".local:5000/status", /*async*/true);
  http.onreadystatechange = function() {
    if (http.status == 200) {
      document.getElementById("status").innerHTML = "Connected";
    } else {
      document.getElementById("status").innerHTML = "Not Connected";
    }
    if (http.readyState == 4) {
      var ended = new Date().getTime();

      var milliseconds = ended - started;

      if (pong != null) {
        pong(milliseconds);
      }
    }
  };
  try {
    http.send(null);
  } catch(exception) {
  }

}

setInterval(ping_status, 5000);