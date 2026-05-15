let timeLeft = 20;

const countdown = document.getElementById("countdown");
const envelope = document.getElementById("envelope");
const text = document.getElementById("text");

const openSound = new Audio("sound/open.mp3");
const messageSound = new Audio("sound/music.mp3");

const message =
"No hay que esperar fechas importantes para este tipo de detalles. Esta carta es para decirte que te amo demasiado. Estoy profundamente agradecido con Dios, con la vida y contigo. Gracias por llegar a mi vida y por quedarte conmigo incluso en la distancia. Te amo más de lo que las palabras pueden decir 💕";

/* EFECTO MAQUINA DE ESCRIBIR */
function typeWriter(i = 0) {

    if (i < message.length) {

        text.innerHTML += message.charAt(i);

        setTimeout(() => {
            typeWriter(i + 1);
        }, 45);
    }
}

/* CORAZONES */
function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "💕";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (Math.random() * 20 + 10) + "px";

    document.querySelector(".hearts").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

/* COUNTDOWN PRINCIPAL */
function start() {

    countdown.innerHTML = timeLeft + "s";

    /* MUSICA SUAVE DESDE EL INICIO */
    if (timeLeft == 20) {

        messageSound.volume = 0.25;

        music.play();
    }

    /* ABRIR CARTA */
    if (timeLeft <= 0) {

        clearInterval(timer);

        /* desaparecer contador */
        countdown.style.opacity = "0";

        setTimeout(() => {

            /* abrir sobre */
            envelope.classList.add("open");

            /* sonido apertura */
            openSound.play();

            /* esperar para mostrar letras */
            setTimeout(() => {

                /* escribir mensaje */
                typeWriter();

                /* corazones */
                setInterval(createHeart, 250);

            }, 1500);

        }, 700);
    }

    timeLeft--;
}

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

/* INICIAR */
let timer = setInterval(start, 1000);