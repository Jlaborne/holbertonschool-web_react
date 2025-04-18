import $ from "jquery";
import _ from "lodash";
import "./body.css";

$("body").append("<p>Dashboard data for the students</p>");

const buttonContainer = $("<div></div>");
const button = $('<button id="clickButton">Click here to get started</button>');
const counter = $('<p id="count"></p>');
buttonContainer.append(button).append(counter);
$("body").append(buttonContainer);

let count = 0;

function updateCounter() {
  count++;
  $("#count").text(`${count} clicks on the button`);
}

$("#clickButton").on("click", _.debounce(updateCounter, 500));
