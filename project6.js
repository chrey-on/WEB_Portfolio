// Project 6: Asynchronous Promises & Timed Sequences
const message = document.getElementById("message");
const button1 = document.getElementById("loadBtn");
const button2 = document.getElementById("showBtn");
const text_1 = document.getElementById("text_1");
const text_2 = document.getElementById("text_2");
const text_3 = document.getElementById("text_3");
const resetBtn = document.getElementById("resetBtn");

console.log(message);

// Visual step nodes
const stepInit = document.getElementById("step-init");
const stepConfig = document.getElementById("step-config");
const stepCompile = document.getElementById("step-compile");
const stepReady = document.getElementById("step-ready");
const line1 = document.getElementById("line-1");
const line2 = document.getElementById("line-2");
const line3 = document.getElementById("line-3");

const ind1 = document.getElementById("ind-1");
const ind2 = document.getElementById("ind-2");
const ind3 = document.getElementById("ind-3");

function resetStepper() {
  [stepInit, stepConfig, stepCompile, stepReady].forEach(n => n?.classList.remove("active"));
  [line1, line2, line3].forEach(l => l?.classList.remove("active"));
  stepInit?.classList.add("active");
}

function showMessage() {
  return new Promise(function(result) {
    setTimeout(function() {
      result("Configuring...");
    }, 1000);
  });
}

// Button 1: Promise Chain
button1.addEventListener("click", function() {
  message.innerHTML = "Loading...";
  message.style.color = "#94a3b8";
  resetStepper();

  showMessage()
    .then(function(result) {
      message.innerHTML = result;
      message.style.color = "blue";
      stepConfig?.classList.add("active");
      line1?.classList.add("active");

      return new Promise(function(result) {
        setTimeout(function() {
          result("Compiling...");
        }, 1000);
      });
    })
    .then(function(result) {
      message.style.color = "orange";
      message.innerHTML = result;
      stepCompile?.classList.add("active");
      line2?.classList.add("active");

      return new Promise(function(result) {
        setTimeout(function() {
          result("Ready!");
        }, 1000);
      });
    })
    .then(function(result) {
      message.style.color = "yellow";
      message.innerHTML = result;
      stepReady?.classList.add("active");
      line3?.classList.add("active");
    });
});

// Button 2: Timed Sequence
button2.addEventListener("click", function() {
  setTimeout(function() {
    text_1.style.color = "red";
    if (ind1) ind1.style.background = "red";
  }, 1000);

  setTimeout(function() {
    text_2.style.color = "green";
    if (ind2) ind2.style.background = "green";
  }, 2000);

  setTimeout(function() {
    text_3.style.color = "grey";
    if (ind3) ind3.style.background = "grey";
  }, 3000);

  setTimeout(function() {
    text_1.innerHTML = "Hello";
  }, 1000);

  setTimeout(function() {
    text_2.innerHTML = "World";
  }, 2000);

  setTimeout(function() {
    text_3.innerHTML = "Hii";
  }, 3000);

  button1.style.backgroundColor = "orange";
  button2.style.backgroundColor = "green";
});

// Reset Functionality
if (resetBtn) {
  resetBtn.addEventListener("click", function() {
    message.innerHTML = "Waiting...";
    message.style.color = "#94a3b8";
    resetStepper();

    text_1.innerHTML = "Profile";
    text_1.style.color = "#ffffff";
    if (ind1) ind1.style.background = "rgba(255, 255, 255, 0.06)";

    text_2.innerHTML = "Grades";
    text_2.style.color = "#ffffff";
    if (ind2) ind2.style.background = "rgba(255, 255, 255, 0.06)";

    text_3.innerHTML = "Schedules";
    text_3.style.color = "#ffffff";
    if (ind3) ind3.style.background = "rgba(255, 255, 255, 0.06)";

    button1.style.backgroundColor = "";
    button2.style.backgroundColor = "";
  });
}