// ================= VIDEO MODAL LOGIC (LinkedList-style) =================
const videoBtn = document.getElementById("videoBtn");
const videoOverlay = document.getElementById("videoOverlay");
const closeVideo = document.getElementById("closeVideo");
const mainVideo = document.getElementById("mainVideo");
const videoItems = document.querySelectorAll(".video-item");

videoBtn.onclick = () => videoOverlay.style.display = "flex";

closeVideo.onclick = () => {
    videoOverlay.style.display = "none";
    mainVideo.pause();
    mainVideo.currentTime = 0;
    mainVideo.style.display = "none";
};

videoOverlay.onclick = e => {
    if (e.target === videoOverlay) closeVideo.click();
};

videoItems.forEach(item => {
    item.onclick = () => {
        const source = mainVideo.querySelector("source");
        source.src = item.dataset.video;
        item.after(mainVideo);
        mainVideo.style.display = "block";
        mainVideo.load();
        mainVideo.play();
    };
});

// ================= STACK LOGIC =================
const stackContainer = document.getElementById("stack");
const dryRun = document.getElementById("dryRun");
const elements = document.querySelectorAll(".elem");

let stackArray = [];   // Actual stack storage
let stackMax = elements.length;

// Helper: render current stack visually
function renderStack() {
    stackContainer.innerHTML = "";
    for (let i = stackArray.length - 1; i >= 0; i--) {
        const item = document.createElement("div");
        item.className = "stack-item";
        item.textContent = stackArray[i];
        stackContainer.appendChild(item);
    }
}

// ================= PUSH OPERATION =================
function pushOperation() {
    if (stackArray.length >= stackMax) {
        dryRun.innerHTML = "<b>Stack Overflow!</b>";
        return;
    }

    const value = Math.floor(Math.random() * 100);
    stackArray.push(value);

    dryRun.innerHTML = `
<b>Push Operation</b><br><br>
value = ${value}<br>
stackArray[stackTop + 1] = value<br>
stackTop++<br>
`;

    renderStack();
}

// ================= POP OPERATION =================
function popOperation() {
    if (stackArray.length === 0) {
        dryRun.innerHTML = "<b>Stack Underflow!</b>";
        return;
    }

    const value = stackArray.pop();

    dryRun.innerHTML = `
<b>Pop Operation</b><br><br>
value = stackArray[stackTop]<br>
stackTop--<br>
popped value = ${value}<br>
`;

    renderStack();
}

// ================= BACK BUTTON =================
function goBack() {
    history.back();
}

// ================= INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
    renderStack();
    dryRun.innerHTML = "Click Insertion or Deletion to perform stack operations";
});
