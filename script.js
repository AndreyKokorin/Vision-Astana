const canvas = document.querySelector(".glass");
const context = canvas.getContext("2d");
const main = document.querySelector(".main");
const lastic = document.querySelector(".lastic");
const eraseText = document.querySelector(".erase");
const aftertext = document.querySelector(".aftertext");
const afterBtn = document.querySelector(".afterbtn");
const smileImg = document.querySelector(".smile")
const mouth = document.querySelector(".mouth");
const face = document.querySelector(".face")

const image = new Image();
image.src = "img/glass.svg";

image.onload = function() {
    context.drawImage(image, 0, 0, 300, 130);
};

const mouseMoveListener = (event) => {
    if (event.buttons === 1) {
        updateCanvas(event.clientX, event.clientY);
    }
};

const touchMoveListener = (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    updateCanvas(touch.clientX, touch.clientY);
};

const updateCanvas = (clientX, clientY) => {
    canvas.classList.add("pouseAnim");

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(x, y, 40, 0, 2 * Math.PI);
    context.fill();

    lastic.style.top = clientY - 20 + "px";
    lastic.style.left = clientX - 40 + "px";

    lastic.classList.remove("lasticOff");
    lastic.classList.add("lasticShow");
    canvas.classList.add("cursorN");

    eraseText.classList.add("opacity0");

    if (isFullyTransparent()) {
        face.classList.add("faceMove")
        mouth.classList.add("opacity0")
        smileImg.classList.add("opacity1");
        canvas.classList.add("opacity0");
        main.classList.add("mainMove");

        aftertext.classList.add("aftertextAnim");
        afterBtn.classList.add("opacity1");
        lastic.remove();
    }
};

function isFullyTransparent() {
    const d = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let noZero = 0;

    for (let i = 3; i < d.length; i += 4) {
        if (d[i] != 0) {
            noZero++;
        }
    }
    return (noZero * 100) / d.length < 0.1;
}

canvas.addEventListener("mouseup", () => {
    lastic.classList.add("lasticOff");
    lastic.classList.remove("lasticShow");
    canvas.classList.remove("cursorN");
});

canvas.addEventListener("mousemove", mouseMoveListener);
canvas.addEventListener("mousedown", (event) => {
    updateCanvas(event.clientX, event.clientY);
});

canvas.addEventListener("touchmove", touchMoveListener);
canvas.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    updateCanvas(touch.clientX, touch.clientY);
});