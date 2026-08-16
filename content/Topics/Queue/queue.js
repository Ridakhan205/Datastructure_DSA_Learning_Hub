// ================= QUEUE LOGIC =================

const linearBtn = document.getElementById("linearBtn");
const circularBtn = document.getElementById("circularBtn");
const controls = document.getElementById("queueControls");
const enqueueBtn = document.getElementById("enqueueBtn");
const dequeueBtn = document.getElementById("dequeueBtn");
const queueBox = document.getElementById("queue");
const dryRun = document.getElementById("dryRun");
const visualBucket = document.getElementById("visualBucket");

const N = 10;
let queue = new Array(N);
let front = -1;
let rear = -1;
let value = 1;
let mode = "linear";

/* RESET */
function resetQueue() {
    queue = new Array(N);
    front = -1;
    rear = -1;
    value = 1;
    queueBox.innerHTML = "";
}

/* MODE SELECT */
linearBtn.onclick = () => {
    mode = "linear";
    resetQueue();
    visualBucket.classList.remove("circular");
    controls.style.display = "flex";
    dryRun.innerHTML = "Linear Queue Selected.";
};

circularBtn.onclick = () => {
    mode = "circular";
    resetQueue();
    visualBucket.classList.add("circular");
    controls.style.display = "flex";
    dryRun.innerHTML = "Circular Queue Selected.";
};

/* POSITION ELEMENTS IN CIRCLE */
function positionCircularItems() {
    const items = document.querySelectorAll(".queue-item");
    const radius = 120;
    const center = 170;

    items.forEach((item, i) => {
        const angle = (2 * Math.PI / N) * i - Math.PI / 2;
        const x = center + radius * Math.cos(angle) - 28;
        const y = center + radius * Math.sin(angle) - 28;
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
    });
}

/* ENQUEUE */
enqueueBtn.onclick = () => {
    if (mode === "linear") {
        dryRun.innerHTML = `
ENQUEUE(queue, size, item)<br>
1. If rear == size - 1 → `;
        if (rear === N - 1) {
            dryRun.innerHTML += "Queue Overflow ❌";
            return;
        }
        if (front === -1) {
            front = 0;
            dryRun.innerHTML += "<br>2. front = 0";
        }
        rear++;
        queue[rear] = value;
    } else {
        dryRun.innerHTML = `
ENQUEUE(queue, N, item)<br>
1. If (rear + 1) % N == front → `;
        if ((rear + 1) % N === front) {
            dryRun.innerHTML += "Queue Overflow ❌";
            return;
        }
        if (front === -1) {
            front = 0;
            rear = 0;
            dryRun.innerHTML += "<br>2. front = 0, rear = 0";
        } else {
            rear = (rear + 1) % N;
            dryRun.innerHTML += `<br>2. rear = (rear + 1) % N → ${rear}`;
        }
        queue[rear] = value;
    }

    const el = document.createElement("div");
    el.className = "queue-item" + (mode === "circular" ? " circular-item" : "");
    el.textContent = value;

    queueBox.appendChild(el);
    if (mode === "circular") positionCircularItems();

    document.querySelectorAll(".queue-item").forEach(item => {
        item.classList.remove("front", "rear");
    });
    if (queueBox.children[front]) queueBox.children[front].classList.add("front");
    if (queueBox.children[rear]) queueBox.children[rear].classList.add("rear");

    dryRun.innerHTML += `
<br>3. queue[rear] = ${value}
<br><br>Front = ${front}, Rear = ${rear}`;

    value++;
};

/* DEQUEUE */
dequeueBtn.onclick = () => {
    if (mode === "linear") {
        dryRun.innerHTML = `
DEQUEUE(queue)<br>
1. If front == -1 OR front > rear → `;
        if (front === -1 || front > rear) {
            dryRun.innerHTML += "Queue Underflow ❌";
            return;
        }
        front++;
    } else {
        dryRun.innerHTML = `
DEQUEUE(queue, N)<br>
1. If front == -1 → `;
        if (front === -1) {
            dryRun.innerHTML += "Queue Underflow ❌";
            return;
        }
        if (front === rear) {
            front = -1;
            rear = -1;
            dryRun.innerHTML += "<br>3. front = rear = -1";
        } else {
            front = (front + 1) % N;
            dryRun.innerHTML += `<br>3. front = (front + 1) % N → ${front}`;
        }
    }

    if (queueBox.firstChild) queueBox.removeChild(queueBox.firstChild);

    document.querySelectorAll(".queue-item").forEach(item => {
        item.classList.remove("front", "rear");
    });
    if (queueBox.children[front]) queueBox.children[front].classList.add("front");
    if (queueBox.children[rear]) queueBox.children[rear].classList.add("rear");

    if (mode === "circular") positionCircularItems();

    dryRun.innerHTML += `
<br>4. Return item
<br><br>Front = ${front}, Rear = ${rear}`;
};

// ================= VIDEO MODAL LOGIC =================

const videoBtn = document.getElementById("videoBtn");
const videoOverlay = document.getElementById("videoOverlay");
const closeVideo = document.getElementById("closeVideo");
const videoItems = document.querySelectorAll(".video-item");

// OPEN MODAL
videoBtn.onclick = () => {
    videoOverlay.style.display = "flex";
};

// CLOSE MODAL
closeVideo.onclick = () => {
    videoOverlay.style.display = "none";

    // pause and remove any dynamic video
    const dynamicVideo = videoOverlay.querySelector(".dynamicVideo");
    if (dynamicVideo) {
        dynamicVideo.pause();
        dynamicVideo.remove();
    }
};

// CLICK OUTSIDE TO CLOSE
videoOverlay.onclick = (e) => {
    if (e.target === videoOverlay) closeVideo.click();
};

// CLICK ON VIDEO ITEM TO PLAY
videoItems.forEach(item => {
    item.onclick = () => {
        // Remove any previous video element
        const oldVideo = videoOverlay.querySelector(".dynamicVideo");
        if (oldVideo) oldVideo.remove();

        // Create new video element dynamically
        const videoSrc = item.getAttribute('data-video');
        const videoEl = document.createElement("video");
        videoEl.className = "dynamicVideo";
        videoEl.controls = true;
        videoEl.src = videoSrc;
        videoEl.style.width = "100%";
        videoEl.style.maxWidth = "600px";
        videoEl.style.maxHeight = "400px";
        videoEl.style.display = "block";
        videoEl.style.margin = "0 auto 20px";
        videoEl.style.borderRadius = "12px";
        videoEl.style.objectFit = "contain";

        // Insert video after clicked item
        item.insertAdjacentElement("afterend", videoEl);
        videoEl.play();
    };
});
