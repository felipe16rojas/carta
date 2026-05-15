let timeLeft = 20;

const countdown = document.getElementById("countdown");
const envelope = document.getElementById("envelope");
const text = document.getElementById("text");
const heartsContainer = document.querySelector(".hearts");

// 🔥 RUTAS SEGURAS (LOCAL + GITHUB)
const openSound = new Audio("./sound/open.mp3");
const messageSound = new Audio("./sound/music.mp3");

const message =
"No hay que esperar fechas importantes para este tipo de detalles. Esta carta es para decirte que te amo demasiado. Estoy profundamente agradecido con Dios, con la vida y contigo. Gracias por llegar a mi vida y por quedarte conmigo incluso en la distancia. Te amo más de lo que las palabras pueden decir 💕";

/* =========================
   DESBLOQUEO AUDIO
========================= */
function unlockAudio() {
    openSound.play().then(() => {
        openSound.pause();
        openSound.currentTime = 0;
    }).catch(()=>{});

    messageSound.play().then(() => {
        messageSound.pause();
        messageSound.currentTime = 0;
    }).catch(()=>{});
}

document.addEventListener("click", unlockAudio, { once: true });

/* =========================
   ESCRITURA
========================= */
function typeWriter(i = 0) {

    if (!text) return;

    if (i < message.length) {
        text.innerHTML += message.charAt(i);

        setTimeout(() => {
            typeWriter(i + 1);
        }, 45);
    }
}

/* =========================
   CORAZONES
========================= */
function createHeart() {

    if (!heartsContainer) return;

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💕";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 20 + 10) + "px";

    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
}

/* =========================
   MAIN
========================= */
function start() {

    countdown.innerHTML = timeLeft + "s";

    // 🎵 música inicio (solo una vez)
    if (timeLeft === 20) {
        messageSound.volume = 0.25;
        messageSound.play().catch(()=>{});
    }

    // 💌 abrir carta
    if (timeLeft <= 0) {

        clearInterval(timer);

        countdown.style.opacity = "0";

        setTimeout(() => {

            envelope.classList.add("open");

            openSound.currentTime = 0;
            openSound.play().catch(()=>{});

            setTimeout(() => {
                typeWriter();
                setInterval(createHeart, 250);
            }, 1500);

        }, 700);
    }

    timeLeft--;
}

let timer = setInterval(start, 1000);