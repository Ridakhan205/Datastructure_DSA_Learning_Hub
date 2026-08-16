const arrayContainer = document.getElementById("arrayContainer");
const dryRunBox = document.getElementById("dryRun");
const visualBox = document.getElementById("visualSteps");

const traverseBtn = document.getElementById("traverseBtn");
const insertBtn = document.getElementById("insertBtn");
const deleteBtn = document.getElementById("deleteBtn");
const quickSortBtn = document.getElementById("quickSortBtn");
const linearSearchBtn = document.getElementById("linearSearchBtn");

let arr = [100, 12, 56, 23, 78, 45, 90];

/* ---------------- RENDER ARRAY ---------------- */
function renderArray(activeIndex = -1, shiftIndex = -1) {
    arrayContainer.innerHTML = "";
    arr.forEach((value, index) => {
        const div = document.createElement("div");
        div.className = "cell";
        if (index === activeIndex) div.classList.add("active");
        if (index === shiftIndex) div.classList.add("shift");
        div.textContent = value;
        arrayContainer.appendChild(div);
    });
}
renderArray();

/* ---------------- HELPERS ---------------- */
function addDryRun(text) {
    const div = document.createElement("div");
    div.className = "step";
    div.textContent = text;
    dryRunBox.appendChild(div);
    dryRunBox.scrollTop = dryRunBox.scrollHeight;
}

function addVisualState(active = -1, shift = -1) {
    const step = document.createElement("div");
    step.className = "visual-step";
    arr.forEach((v, i) => {
        const box = document.createElement("div");
        box.className = "v-box";
        if (i === active) box.classList.add("active");
        if (i === shift) box.classList.add("shift");
        box.textContent = v;
        step.appendChild(box);
    });
    visualBox.appendChild(step);
}

function addVisualEnd(msg = "Process Completed Successfully ✔") {
    const p = document.createElement("p");
    p.style.color = "#22c55e";
    p.textContent = msg;
    visualBox.appendChild(p);
}

/* ================= LINEAR SEARCH ================= */
linearSearchBtn.addEventListener("click", () => {
    dryRunBox.innerHTML = "";
    visualBox.innerHTML = "";
    linearSearchBtn.disabled = true;

    let key = 78;
    let i = 0;

    addDryRun("START");
    addDryRun(`LinearSearch(arr, n, key = ${key})`);
    addDryRun("For i = 0 to n-1");

    const interval = setInterval(() => {
        if (i < arr.length) {
            addDryRun(`Compare key with A[${i}] = ${arr[i]}`);
            renderArray(i);
            addVisualState(i);

            if (arr[i] === key) {
                clearInterval(interval);
                addDryRun(`Key found at index ${i}`);
                addVisualEnd(`Key Found at Index ${i} ✔`);
                linearSearchBtn.disabled = false;
            }
            i++;
        } else {
            clearInterval(interval);
            addDryRun("Key not found → return -1");
            addVisualEnd("Key Not Found ❌");
            renderArray();
            linearSearchBtn.disabled = false;
        }
    }, 900);
});

/* ================= TRAVERSING ================= */
traverseBtn.addEventListener("click", () => {
    dryRunBox.innerHTML = "";
    visualBox.innerHTML = "";
    traverseBtn.disabled = true;

    let i = 0;
    addDryRun("START");
    addDryRun("For i = 0 to n-1");

    const interval = setInterval(() => {
        if (i < arr.length) {
            renderArray(i);
            addDryRun(`Visit A[${i}] = ${arr[i]}`);
            addVisualState(i);
            i++;
        } else {
            clearInterval(interval);
            renderArray();
            addDryRun("END");
            addDryRun("Traversal Done ✔");
            addVisualEnd();
            traverseBtn.disabled = false;
        }
    }, 900);
});

/* ================= INSERTION ================= */
insertBtn.addEventListener("click", () => {
    dryRunBox.innerHTML = "";
    visualBox.innerHTML = "";
    insertBtn.disabled = true;

    let x = 99;
    let pos = 3;
    let i = arr.length - 1;

    addDryRun("START");
    addDryRun(`Insert x = ${x} at pos = ${pos}`);

    const interval = setInterval(() => {
        if (i >= pos) {
            addDryRun(`Shift A[${i}] → A[${i + 1}]`);
            arr[i + 1] = arr[i];
            renderArray(-1, i);
            addVisualState(-1, i);
            i--;
        } else {
            clearInterval(interval);
            arr[pos] = x;
            renderArray(pos);
            addVisualState(pos);
            addDryRun("END");
            addDryRun("Insertion Completed ✔");
            insertBtn.disabled = false;
        }
    }, 1000);
});

/* ================= DELETION ================= */
deleteBtn.addEventListener("click", () => {
    dryRunBox.innerHTML = "";
    visualBox.innerHTML = "";
    deleteBtn.disabled = true;

    let k = 2; // index to delete
    let tempArr = [...arr]; // copy for simulation
    let j = k;

    addDryRun("START");
    addDryRun(`Delete element at index k = ${k}`);
    addDryRun(`Element to delete = ${arr[k]}`);

    const interval = setInterval(() => {

        // simulate comparison
        if (j < tempArr.length - 1) {
            addDryRun(`Compare A[${j}] with A[${j + 1}]`);
            addDryRun(`Shift A[${j + 1}] → A[${j}]`);

            tempArr[j] = tempArr[j + 1];

            // render simulated array
            renderSimulatedArray(tempArr, j);
            addVisualSimulatedState(tempArr, j);

            j++;
        } else {
            clearInterval(interval);

            addDryRun("All elements shifted");
            addDryRun("Now deleting last duplicate element");

            // 🔥 ACTUAL deletion happens here
            arr.splice(k, 1);

            renderArray();
            addVisualEnd("Deletion Completed ✔");
            addDryRun("END");
            addDryRun("Deletion Completed ✔");

            deleteBtn.disabled = false;
        }
    }, 1000);
});

/* ===== HELPER FUNCTIONS FOR SIMULATION ===== */

function renderSimulatedArray(simArr, activeIndex = -1) {
    arrayContainer.innerHTML = "";
    simArr.forEach((value, index) => {
        const div = document.createElement("div");
        div.className = "cell";
        if (index === activeIndex) div.classList.add("active");
        div.textContent = value;
        arrayContainer.appendChild(div);
    });
}

function addVisualSimulatedState(simArr, active = -1) {
    const step = document.createElement("div");
    step.className = "visual-step";

    simArr.forEach((v, i) => {
        const box = document.createElement("div");
        box.className = "v-box";
        if (i === active) box.classList.add("active");
        box.textContent = v;
        step.appendChild(box);
    });

    visualBox.appendChild(step);
}



/* ================= QUICK SORT ================= */
quickSortBtn.addEventListener("click", async () => {
    dryRunBox.innerHTML = "";
    visualBox.innerHTML = "";
    quickSortBtn.disabled = true;

    addDryRun("START QUICK SORT");
    await quickSort(0, arr.length - 1);
    addDryRun("END");
    addDryRun("Quick Sort Completed ✔");
    addVisualEnd();
    renderArray();
    quickSortBtn.disabled = false;
});

/* ===== QUICK SORT ===== */
async function quickSort(low, high) {
    if (low < high) {
        let p = await partition(low, high);
        await quickSort(low, p - 1);
        await quickSort(p + 1, high);
    }
}

async function partition(low, high) {
    let pivot = arr[low];
    let i = low + 1;
    let j = high;

    addDryRun(`PARTITION(low=${low}, high=${high})`);
    addDryRun(`Pivot = A[${low}] = ${pivot}`);
    renderArray(low);
    addVisualState(low);

    while (i <= j) {
        while (i <= high && arr[i] <= pivot) {
            renderArray(i);
            addVisualState(i);
            await new Promise(r => setTimeout(r, 700));
            i++;
        }
        while (arr[j] > pivot) {
            renderArray(-1, j);
            addVisualState(-1, j);
            await new Promise(r => setTimeout(r, 700));
            j--;
        }
        if (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            renderArray(i, j);
            addVisualState(i, j);
            await new Promise(r => setTimeout(r, 700));
        }
    }

    [arr[low], arr[j]] = [arr[j], arr[low]];
    renderArray(j);
    addVisualState(j);
    return j;
}


/* ================= VIDEO MODAL LOGIC (FIXED) ================= */

const videoBtn = document.getElementById("videoBtn");
const videoOverlay = document.getElementById("videoOverlay");
const closeVideo = document.getElementById("closeVideo");
const mainVideo = document.getElementById("mainVideo");
const videoItems = document.querySelectorAll(".video-item");

function showVideo() {
    videoOverlay.style.display = "flex";
}

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
