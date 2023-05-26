// Se crea una variable "screens" que almacena todos los elementos de la página con la clase "screen". Estos son los contenedores que se utilizarán para mostrar diferentes pantallas del juego.
const screens = document.querySelectorAll('.screen');

// botones que se usan para seleccionar los diferentes Paw patrol
const choose_paw_btns = document.querySelectorAll('.choose-paw-btn');

// Este botón es el que comienza el juego.
const start_btn = document.getElementById('start-btn')

// 
const game_container = document.getElementById('game-container')

//Muestra el tiempo transcurrido del juego.
const timeEl = document.getElementById('time')

//Muestra la puntuación del jugador.
const scoreEl = document.getElementById('score')

//Muestra un mensaje al jugador cuando alcanza una cierta puntuación.
const message = document.getElementById('message')

// Se crea una variable "miaudio"  que contiene el audio que al precionar en el boton play game  se empezara a reproducir.
const miaudio = document.getElementById('miaudio')

const gamePaw = document.getElementById('gamePaw')

// Se crean tres variables iniciales: "seconds" almacena la cantidad de segundos que han pasado en el juego, "score" almacena la puntuación del jugador, y "selected_paw" es un objeto vacío que se utilizará para almacenar la huella de animal seleccionada por el jugador.
let seconds = 0
let score = 0
let selected_paw = {}
let interval;
// Se agrega un evento de clic al botón de inicio del juego, y cuando se hace clic, se agrega la clase "up" al primer contenedor de pantalla, que hace que se deslice hacia arriba y se oculte de la vista
start_btn.addEventListener('click', () =>{ screens[0].classList.add('up')
miaudio.volume = 0.3
miaudio.play()
})

// Creo funcion para reproducir el audio que tengo en el html

// Agrega un evento de clic al botón de inicio para llamar a la función 'reproducirAudio'




// Se agrega un evento de clic a cada uno de los botones paw patrol. Cuando se hace clic en un botón, se extrae la imagen y su atributo "alt" asociado, y se guarda en la variable "selected_paw". Luego, se agrega la clase "up" al segundo contenedor de pantalla para mostrar la pantalla de juego. Después de un segundo, se llama a la función "createpaw()" para comenzar el juego y se llama a la función "startGame()".
choose_paw_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_paw = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createpaw, 1000)
        startGame()
    })
})

// La función "startGame()" se utiliza para iniciar un intervalo de tiempo que aumentará la cantidad de segundos que han pasado en el juego cada segundo.
function startGame() {
    interval = setInterval(increaseTime, 1000)

}

// La función "increaseTime()" se utiliza para aumentar la cantidad de segundos que han pasado en el juego cada segundo. La función actualiza el valor del elemento "timeEl" en la página para mostrar el tiempo transcurrido. Si el tiempo transcurrido supera un valor determinado, se llama a la función "endGame()", que detiene el juego y muestra un mensaje de finalización en la pantalla.
function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++

    if (seconds >= 30) {
        endGame();
    }
}
    // Detener el juego.
function endGame() {
    const puntaje = score
    screens[1].classList.remove('up')
    screens[0].classList.remove('up')
    seconds = 0
    score = 0
    selected_paw = {}
    clearInterval(interval)
    gamePaw.innerHTML = ''
    Swal.fire({
        title: 'Sweet!',
        text: 'Modal with a custom image.',
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })

    timeEl.innerHTML = "Game Over";

}
// "createpaw" crea un elemento "div" en el documento HTML, lo configura con una clase CSS llamada "paw" y lo agrega a un contenedor de juegos (game_container). Además, le da una ubicación aleatoria en la pantalla mediante la función "getRandomLocation".
// Después de configurar su ubicación, la función crea una etiqueta "img" dentro del elemento "div" que se acaba de crear, que tiene como fuente de la imagen y texto alternativo, la información de una imagen previamente seleccionada (selected_paw). Además, esta imagen se rota un número aleatorio de grados para agregar un poco de variabilidad visual.
// Finalmente, la función agrega un evento "click" al elemento "div" que llama a otra función llamada "catchpaw" cuando se hace clic en el elemento.
function createpaw() {
    const paw = document.createElement('div')
    paw.classList.add('paw')
    const { x, y } = getRandomLocation()
    paw.style.top = `${y}px`
    paw.style.left = `${x}px`
    paw.innerHTML = `<img src="${selected_paw.src}" alt="${selected_paw.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    paw.addEventListener('click', catchpaw)

    gamePaw.appendChild(paw)
}

// ubicación aleatoria de los paw patrol en la pantalla.
// const width = window.innerWidth - Obtiene el ancho de la ventana del navegador y lo almacena en una variable llamada "width".
// const height = window.innerHeight - Obtiene la altura de la ventana del navegador y lo almacena en una variable llamada "height".
// const x = Math.random() * (width - 200) + 100 - Genera un número aleatorio entre 100 y "width-100", que es la anchura de la pantalla menos 200 (para asegurarse de que el objeto no aparezca demasiado cerca del borde) y lo almacena en la variable "x".
// const y = Math.random() * (height - 200) + 100 - Genera un número aleatorio entre 100 y "height-100", que es la altura de la pantalla menos 200 (para asegurarse de que el objeto no aparezca demasiado cerca del borde) y lo almacena en la variable "y".
// return { x, y } - Retorna un objeto con las coordenadas "x" e "y" generadas aleatoriamente.
// En resumen, esta función se utiliza para generar una ubicación aleatoria en la pantalla y se utiliza en otra función para establecer la posición de un objeto en un juego o aplicación web.
function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}


// Esta función se ejecuta cuando se hace click en el paw patrol aleatorio
// increaseScore(): Incrementa el puntaje del jugador cada vez que el usuario hace click
// this.classList.add('caught'): Agrega la clase CSS "caught" Al que fue clickeado Esta clase podría tener un estilo que haga que la figura desaparezca o cambie su apariencia, por ejemplo.
// setTimeout(() => this.remove(), 10): Espera 10 milisegundos y luego elimina la figura que fue clickeada del DOM. Esto significa que la pata ya no será visible en la pantalla.
// addpaw(): Agrega una nueva pata a la pantalla después de que la pata anterior fue clickeada y eliminada.
function catchpaw() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 10)
    addpaw()
}

function addpaw() {
    setTimeout(createpaw, 20)
    setTimeout(createpaw, 30)
}

function increaseScore() {
    score++
    scoreEl.innerHTML = `Score: ${score}`
}

// Define la función para reproducir el audio

