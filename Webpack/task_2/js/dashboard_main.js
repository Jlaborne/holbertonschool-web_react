import $ from "jquery";
import _ from "lodash";
import "../css/main.css";
import logo from "../assets/holberton-logo.jpg";

$(function () {
  const img = $("<img>")
    .attr("src", logo)
    .attr("alt", "Holberton Logo")
    .css("width", "150px");
  $("body").append(img);

  $("body").append("<p>Holberton Dashboard</p>");
  $("body").append("<p>Dashboard data for the students</p>");
  $("body").append(
    '<button id="clickButton">Click here to get started</button>'
  );
  $("body").append('<p id="count"></p>');
  $("body").append("<p>Copyright - Holberton School</p>");

  let count = 0;

  function updateCounter() {
    count++;
    $("#count").text(`${count} clicks on the button`);
  }

  $("#clickButton").on("click", _.debounce(updateCounter, 500));
});
