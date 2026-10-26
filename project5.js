// Project 5: Interactive DOM Events Lab
console.log(document);

const click = document.getElementById("click");
const dblclick = document.getElementById("dclick");
const hover = document.getElementById("hover");
const fullname = document.getElementById("name");
const course = document.getElementById("course");
const desc = document.getElementById("description");
const img = document.getElementById("image");
const res = document.getElementById("result");
const inp = document.getElementById("text");
const resetBtn = document.getElementById("resetBtn");
const eventFeed = document.getElementById("eventFeed");

// Store initial values for clean reset
const initialName = fullname.innerHTML;
const initialCourse = course.innerHTML;
const initialDesc = desc.innerHTML;

function logEvent(actionName, detail) {
  if (!eventFeed) return;
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];
  const item = document.createElement("div");
  item.className = "feed-entry";
  item.innerHTML = `<span class="feed-time">${timeStr}</span><span class="feed-msg"><strong>${actionName}:</strong> ${detail}</span>`;
  eventFeed.prepend(item);
  while (eventFeed.children.length > 5) {
    eventFeed.removeChild(eventFeed.lastChild);
  }
}

// 1. Click Event
click.addEventListener("click", function() {
  course.innerHTML = "BSTM";
  res.innerHTML = "You clicked a button";
  res.style.color = "#38bdf8";
  logEvent("Click", "Program changed to BSTM");
});

// 2. Double Click Event
dblclick.addEventListener("dblclick", function() {
  desc.innerHTML = "I miss you hehe";
  desc.style.color = "#f43f5e";
  res.innerHTML = "You double clicked a button";
  res.style.color = "#ec4899";
  logEvent("Double Click", "Description updated & colored red");
});

// 3. Hover (Mouseover / Mouseout)
hover.addEventListener("mouseover", function() {
  res.style.color = "Orange";
  res.innerHTML = "You are hovering a button";
  fullname.style.color = "Blue";
  logEvent("Mouseover", "Cursor entered hover button");
});

hover.addEventListener("mouseout", function() {
  res.style.color = "#ffffff";
  res.innerHTML = "Your mouse is not hovering a button";
  fullname.style.color = "#10b981";
  logEvent("Mouseout", "Cursor left hover button");
});

// 4. Live Text Input
inp.addEventListener("input", function() {
  res.innerHTML = "typing...";
  res.style.color = "#facc15";
  fullname.innerHTML = inp.value || initialName;
  logEvent("Input", `Name live updated to "${inp.value}"`);
});

// 5. Input Focus & Blur
inp.addEventListener("focus", function() {
  inp.style.backgroundColor = "#fef08a";
  inp.style.color = "#0f172a";
  res.style.color = "#eab308";
  res.innerHTML = "Currently focusing on the text input";
  logEvent("Focus", "Text field active");
});

inp.addEventListener("blur", function() {
  inp.style.backgroundColor = "rgba(15, 23, 42, 0.6)";
  inp.style.color = "#ffffff";
  res.style.color = "#94a3b8";
  res.innerHTML = "You clicked a blank space";
  logEvent("Blur", "Focus lost from text field");
});

// 6. Image Transform
img.addEventListener("mouseover", function() {
  img.style.transform = "scale(1.2)";
  img.style.boxShadow = "0 12px 30px rgba(59, 130, 246, 0.5)";
});

img.addEventListener("mouseout", function() {
  img.style.transform = "scale(1)";
  img.style.boxShadow = "none";
});

// Reset functionality
if (resetBtn) {
  resetBtn.addEventListener("click", function() {
    fullname.innerHTML = initialName;
    fullname.style.color = "#ffffff";
    course.innerHTML = initialCourse;
    desc.innerHTML = initialDesc;
    desc.style.color = "#94a3b8";
    inp.value = "";
    inp.style.backgroundColor = "rgba(15, 23, 42, 0.6)";
    inp.style.color = "#ffffff";
    res.innerHTML = "Reset complete. Ready for new interaction.";
    res.style.color = "#38bdf8";
    logEvent("Reset", "All fields restored to initial values");
  });
}