const images = [
  'images/img1.jpg',
  'images/img2.jpg',
  'images/img3.jpg',
  'images/img4.jpg',
  'images/img5.jpg',
  'images/img6.jpg',
  'images/img7.jpg',
  'images/img8.jpg',
  'images/img9.jpg',
  'images/img10.jpg',
  'images/img11.jpg',
  'images/img12.jpg',
  'images/img13.jpg',
  'images/img14.jpg',
  'images/img15.jpg',
  'images/img16.jpg',
  'images/img17.jpg',
  'images/img18.jpg',
  'images/img19.jpg',
  'images/img20.jpg',
  'images/img21.jpg',
  'images/img22.jpg',
  'images/img23.jpg',
  'images/img24.jpg',
  'images/img25.jpg',
  'images/img26.jpg',
  'images/img27.jpg',
  'images/img28.jpg',
  'images/img29.jpg',
  'images/img30.jpg'
];

const grid = document.getElementById("grid");
const selectedBox = document.getElementById("selectedBox");
const selectButton = document.getElementById("selectButton");

let selectedImage = null;
let selecting = false;

function createCell(imgSrc) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.style.position = "relative"; // مهم لتوسيط ✖

  const img = document.createElement("img");
  img.src = imgSrc;

  const xMark = document.createElement("div");
  xMark.className = "delete-x";
  xMark.innerText = "✖";
  xMark.style.display = "none";
  xMark.style.position = "absolute";
  xMark.style.top = "50%";
  xMark.style.left = "50%";
  xMark.style.transform = "translate(-50%, -50%)";
  xMark.style.fontSize = "40px";
  xMark.style.fontWeight = "bold";
  xMark.style.color = "red";
  xMark.style.pointerEvents = "none"; // عشان ما يمنع ضغط الصورة

  cell.appendChild(img);
  cell.appendChild(xMark);

  // اختيار الصورة عند الضغط العادي
  cell.addEventListener("click", () => {
    if (selecting) {
      selectedImage = imgSrc;
      selectedBox.innerHTML = `<img src='${imgSrc}'>`;
      selectButton.style.display = "none";
      selecting = false;
    }
  });

  // إظهار أو إخفاء X عند الضغط مرتين
  cell.addEventListener("dblclick", () => {
    xMark.style.display = xMark.style.display === "flex" ? "none" : "flex";
    xMark.style.justifyContent = "center";
    xMark.style.alignItems = "center";
  });

  grid.appendChild(cell);
}

function setupGrid() {
  grid.innerHTML = "";
  const uniqueImages = [...images];
  for (let i = 0; i < uniqueImages.length; i++) {
    createCell(uniqueImages[i]);
  }
}

function resetGame() {
  setupGrid();
  selectedBox.innerHTML = "";
  selectedImage = null;
  selectButton.style.display = "inline-block";

  // إرسال إلى Webhook
  fetch("https://discord.com/api/webhooks/1381319218821337271/yCzV8vwqBSOaREM7iBeFkumzOPNYU09DE3MmYEXHDBe4DdiaBcUr7WbNGc0iewuT3q0u", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: "🔄 تم إعادة اللعبة بواسطة أحد المستخدمين."
    })
  });
}


selectButton.onclick = () => {
  selecting = true;
};



let playerName = ""; // اسم اللاعب

function startGame() {
  const nameInput = document.getElementById("playerNameInput");
  const name = nameInput.value.trim();

  if (name === "") {
    alert("الرجاء إدخال اسمك قبل بدء اللعبة.");
    return;
  }

  playerName = name;
  document.getElementById("nameScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  setupGrid();
}

setupGrid();
