// ================= VIDEO MODAL LOGIC =================

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

// ================= INSERTION + DELETION LOGIC =================

document.addEventListener("DOMContentLoaded", () => {

    const insertionBtn = document.getElementById("InsertionBtn");
    const deletionBtn = document.getElementById("DeletionBtn");
    const addBtn = document.getElementById("addNodeBtn");
    const insertControl = document.getElementById("insertControl");

    const dryRun = document.getElementById("dryRun");
    const visualBucket = document.getElementById("visualBucket");
    const mainList = document.getElementById("mainList");

    let mode = ""; // "insert" | "delete"
    let count = 0;
    let deleteCount = 0;
    let visualList = null;

    const INSERT_INDEX = 3;
    const random4Digit = () => Math.floor(1000 + Math.random() * 9000);

    // ================= INSERTION =================
    insertionBtn.onclick = () => {
        mode = "insert";
        insertControl.style.display = "block";
        addBtn.textContent = "Add";

        dryRun.innerHTML = "Click <b>Add</b> to insert node at index 3";

        visualBucket.innerHTML = "";
        visualList = mainList.cloneNode(true);
        visualList.id = "visualList";
        visualBucket.appendChild(visualList);
    };

    // ================= DELETION =================
    deletionBtn.onclick = () => {
        mode = "delete";
        insertControl.style.display = "block";
        addBtn.textContent = "Delete";

        dryRun.innerHTML = `
<b>Deletion Algorithm</b><br><br>
ptr = head<br>
while(ptr->next->next != NULL)<br>
&nbsp;&nbsp;ptr = ptr->next<br><br>
temp = ptr->next<br>
ptr->next = NULL<br>
free(temp)
`;

        visualBucket.innerHTML = "";
        visualList = mainList.cloneNode(true);
        visualList.id = "visualList";
        visualBucket.appendChild(visualList);
    };

    // ================= ADD / DELETE BUTTON =================
    addBtn.onclick = () => {

        if (!visualList) return;

        // ---------- INSERT ----------
        if (mode === "insert") {

            count++;
            const value = Math.floor(Math.random() * 100);
            const nextValue = random4Digit();

            // ✅ ORIGINAL INSERTION ALGORITHM (UNCHANGED)
            dryRun.innerHTML = `
<b>Insertion #${count}</b><br><br>

Create a new node<br>
Set newNode.data = ${value}<br><br>

Traverse to the node at position index - 1<br>
Initialize current = head<br>
Move current forward ${INSERT_INDEX - 1} times<br><br>

Insert the new node<br>
newNode.next = current.next<br>
current.next = newNode
`;

            const children = Array.from(visualList.children);
            const nodePos = INSERT_INDEX * 2;
            if (nodePos >= children.length) return;

            const oldArrow = children[nodePos - 1];
            if (oldArrow?.classList.contains("arrow")) {
                visualList.removeChild(oldArrow);
            }

            const arrow1 = document.createElement("div");
            arrow1.className = "arrow";
            arrow1.textContent = "→";

            const arrow2 = document.createElement("div");
            arrow2.className = "arrow";
            arrow2.textContent = "→";

            const newNode = document.createElement("div");
            newNode.className = "node";
            newNode.innerHTML = `
                <div class="data">${value}</div>
                <div class="next">${nextValue}</div>
            `;

            visualList.insertBefore(arrow1, children[nodePos]);
            visualList.insertBefore(newNode, children[nodePos]);
            visualList.insertBefore(arrow2, children[nodePos]);
        }

        // ---------- DELETE ----------
        if (mode === "delete") {

            const children = Array.from(visualList.children);
            const nodes = children.filter(el => el.classList.contains("node"));

            if (nodes.length <= 2) {
                dryRun.innerHTML += `<br><br><b>No more nodes can be deleted</b>`;
                return;
            }

            deleteCount++;

            const lastNode = nodes[nodes.length - 1];
            const lastIndex = children.indexOf(lastNode);

            const arrowBefore = children[lastIndex - 1];
            if (arrowBefore?.classList.contains("arrow")) {
                visualList.removeChild(arrowBefore);
            }

            visualList.removeChild(lastNode);

            const updatedNodes = visualList.querySelectorAll(".node");
            updatedNodes[updatedNodes.length - 1]
                .querySelector(".next").textContent = "NULL";

            dryRun.innerHTML = `
<b>Deletion #${deleteCount}</b><br><br>
ptr = head<br>
while(ptr->next->next != NULL)<br>
&nbsp;&nbsp;ptr = ptr->next<br><br>
temp = ptr->next<br>
ptr->next = NULL<br>
free(temp)
`;
        }
    };
});


// ================= SEARCHING LOGIC =================

document.addEventListener("DOMContentLoaded", () => {

    const searchingBtn = document.getElementById("SearchingBtn");
    const insertControl = document.getElementById("insertControl");
    const dryRun = document.getElementById("dryRun");
    const visualBucket = document.getElementById("visualBucket");
    const mainList = document.getElementById("mainList");

    const searchKeyBox = document.getElementById("searchKeyBox");
    const searchKeyText = document.getElementById("searchKey");

    let timers = [];

    searchingBtn.onclick = () => {

        insertControl.style.display = "none";
        timers.forEach(t => clearTimeout(t));
        timers = [];

        visualBucket.innerHTML = "";
        const visualList = mainList.cloneNode(true);
        visualBucket.appendChild(visualList);

        const nodes = Array.from(visualList.querySelectorAll(".node"));

        if (nodes.length === 0) {
            dryRun.innerHTML = "Linked List is empty";
            return;
        }

        // Select random key (ignore Start)
        const validNodes = nodes.filter(
            n => n.querySelector(".data").textContent !== "Start"
        );

        const targetNode = validNodes[Math.floor(Math.random() * validNodes.length)];
        const key = targetNode.querySelector(".data").textContent;

        searchKeyBox.style.display = "block";
        searchKeyText.textContent = key;

        dryRun.innerHTML = `
<b>Searching Algorithm</b><br><br>
temp = head<br>
pos = 1
        `;

        let pos = 1;
        let foundNode = null;

        nodes.forEach((node, index) => {

            const timer = setTimeout(() => {

                node.classList.add("search-compare");

                dryRun.innerHTML += `
<br><br>
Comparing temp.data with key<br>
Position = ${pos}
                `;

                const value = node.querySelector(".data").textContent;

                if (value === key && !foundNode) {
                    foundNode = node;

                    dryRun.innerHTML += `
<br><br>
<b>Element found at position ${pos}</b>
                    `;

                    finalizeSearch(foundNode);
                } else {
                    node.classList.remove("search-compare");
                    pos++;
                }

                if (!foundNode && index === nodes.length - 1) {
                    dryRun.innerHTML += `
<br><br>
<b>Element not found</b>
                    `;
                }

            }, index * 1000);

            timers.push(timer);
        });

        function finalizeSearch(foundNode) {
            timers.forEach(t => clearTimeout(t));

            nodes.forEach(n => n.classList.remove("search-compare"));
            foundNode.classList.add("search-found");
        }
    };
});
