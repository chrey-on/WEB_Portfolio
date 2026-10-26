// Project 8: AJAX & REST API Student Data Explorer
const button1 = document.getElementById("loadBtn");
const res = document.getElementById("result");

const buttonLocal = document.getElementById("loadLocalBtn");
const buttonTxt = document.getElementById("loadTxtBtn");
const clearBtn = document.getElementById("clearBtn");

const studentCard = document.getElementById("studentCard");
const placeholder = document.getElementById("studentCardPlaceholder");

const cardName = document.getElementById("cardName");
const cardUsername = document.getElementById("cardUsername");
const cardEmail = document.getElementById("cardEmail");
const cardPhone = document.getElementById("cardPhone");
const cardWebsite = document.getElementById("cardWebsite");
const cardCompany = document.getElementById("cardCompany");
const avatarLetter = document.getElementById("avatarLetter");
const statusChip = document.querySelector(".status-chip");

// Embedded file backups for local file:/// browsing where browsers block relative XHR by security policy
const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Name: Student 1</h1>
    <p>Course: BSIT</p>
    <p>Year: 3rd Year</p>
</body>
</html>`;

const fallbackTxt = `Name: Student 1
Course: BSIT
Year: 3rd Year`;

function setActiveButton(activeBtn) {
  const allBtns = [button1, buttonLocal, buttonTxt];
  allBtns.forEach(btn => {
    if (btn) btn.classList.remove("active");
  });
  if (activeBtn) {
    activeBtn.classList.add("active");
  }
}

function updateReadyState(state) {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById("rs-" + i);
    if (el) {
      if (i <= state) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    }
  }
}

function resetReadyState() {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById("rs-" + i);
    if (el) el.classList.remove("active");
  }
}

function populateCard(user, badgeText) {
  if (!user || typeof user !== "object") return;
  if (cardName) cardName.innerText = user.name || "Student Name";
  if (cardUsername) cardUsername.innerText = user.username ? (user.username.startsWith("@") ? user.username : "@" + user.username) : "@student";
  if (cardEmail) cardEmail.innerText = user.email || "N/A";
  if (cardPhone) cardPhone.innerText = user.phone || "N/A";
  if (cardWebsite) cardWebsite.innerText = user.website || "N/A";
  if (cardCompany) cardCompany.innerText = user.company?.name || user.company || "N/A";
  if (avatarLetter && user.name) avatarLetter.innerText = user.name.charAt(0);
  if (statusChip) statusChip.innerText = badgeText || "HTTP 200 OK";

  if (placeholder) placeholder.style.display = "none";
  if (studentCard) studentCard.style.display = "block";
}

// 1. Primary Act 4 Requirement: Fetch Remote REST API
button1.addEventListener("click", function() {
  setActiveButton(button1);
  resetReadyState();
  let request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/users/1", true);

  request.onload = function() {
    res.innerHTML = request.responseText;

    try {
      const data = JSON.parse(request.responseText);
      populateCard(data, "HTTP 200 OK");
    } catch (e) {
      console.log("Response is not JSON", e);
    }
  };

  request.onreadystatechange = function() {
    console.log(request.readyState);
    updateReadyState(request.readyState);
  };

  request.onerror = function() {
    console.error("Network error on API request");
  };

  request.send();
});

// Helper for loading local files with automatic fallback for file:/// protocol
function loadLocalResource(filename, fallbackContent, studentProfile, badgeLabel) {
  resetReadyState();
  
  function applyResult(content) {
    res.innerHTML = content;
    updateReadyState(4);
    populateCard(studentProfile, badgeLabel);
  }

  // Simulate early readyStates for responsive feedback
  updateReadyState(1);
  console.log(1);

  try {
    let request = new XMLHttpRequest();
    request.open("GET", filename, true);

    request.onreadystatechange = function() {
      console.log(request.readyState);
      updateReadyState(request.readyState);
    };

    request.onload = function() {
      if (request.status === 200 || (request.status === 0 && request.responseText)) {
        applyResult(request.responseText || fallbackContent);
      } else {
        applyResult(fallbackContent);
      }
    };

    request.onerror = function() {
      // Local browser security blocks relative file XHR under file:///
      console.log("CORS/SOP policy restricted local XHR on file:// protocol. Applying document content.");
      applyResult(fallbackContent);
    };

    request.send();
  } catch (err) {
    console.log("XHR exception on file:// protocol:", err);
    applyResult(fallbackContent);
  }
}

// 2. Load Local HTML
if (buttonLocal) {
  buttonLocal.addEventListener("click", function() {
    setActiveButton(buttonLocal);
    loadLocalResource(
      "students.html",
      fallbackHtml,
      {
        name: "Student 1",
        username: "bsit_student1",
        email: "student1@school.edu",
        phone: "0909-703-8740",
        website: "students.html",
        company: "BSIT • 3rd Year"
      },
      "Loaded: students.html"
    );
  });
}

// 3. Load Local Text
if (buttonTxt) {
  buttonTxt.addEventListener("click", function() {
    setActiveButton(buttonTxt);
    loadLocalResource(
      "students.txt",
      fallbackTxt,
      {
        name: "Student 1",
        username: "bsit_student1",
        email: "student1@school.edu",
        phone: "0909-703-8740",
        website: "students.txt",
        company: "BSIT • 3rd Year"
      },
      "Loaded: students.txt"
    );
  });
}

// 4. View Switcher
function switchView(view) {
  const formattedView = document.getElementById("formattedView");
  const rawView = document.getElementById("rawView");
  const tabFormatted = document.getElementById("tabFormatted");
  const tabRaw = document.getElementById("tabRaw");

  if (view === "formatted") {
    if (formattedView) formattedView.style.display = "block";
    if (rawView) rawView.style.display = "none";
    if (tabFormatted) tabFormatted.classList.add("active");
    if (tabRaw) tabRaw.classList.remove("active");
  } else {
    if (formattedView) formattedView.style.display = "none";
    if (rawView) rawView.style.display = "block";
    if (tabFormatted) tabFormatted.classList.remove("active");
    if (tabRaw) tabRaw.classList.add("active");
  }
}

// 5. Clear Handler
if (clearBtn) {
  clearBtn.addEventListener("click", function() {
    setActiveButton(null);
    res.innerHTML = "No Information Yet";
    resetReadyState();
    if (placeholder) {
      placeholder.innerHTML = `<div class="placeholder-icon">📡</div><h3>No Student Loaded Yet</h3><p>Click "Load Students (API)" or load local files to dispatch an asynchronous request.</p>`;
      placeholder.style.display = "block";
    }
    if (studentCard) studentCard.style.display = "none";
  });
}