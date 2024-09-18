document.addEventListener("DOMContentLoaded", function () {
    const buttonList = document.getElementById("button-list");
    let currentAudio = null;  // Variable para almacenar el audio que se está reproduciendo

    // Cargar los sonidos desde el archivo JSON
    fetch('assets/sounds.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(sound => {
                // Crear un elemento de audio para calcular la duración
                const audio = new Audio(`sounds/${sound.file}.mp3`);
                
                // Cargar los metadatos del archivo de audio para obtener su duración
                audio.addEventListener("loadedmetadata", () => {
                    const duration = audio.duration.toFixed(1); // Redondear a un decimal
                    
                    // Crear un botón para cada sonido
                    const button = document.createElement("button");
                    button.classList.add("sound-button");
                    button.textContent = `${sound.name} (${duration}s)`;
                    button.setAttribute("data-sound", sound.file);
                    
                    // Agregar un evento de clic a cada botón para reproducir el sonido
                    button.addEventListener("click", () => {
                        stopCurrentAudio();  // Detener el sonido actual antes de reproducir otro
                        playSound(sound.file);  // Reproducir el nuevo sonido
                    });

                    // Añadir el botón a la lista de botones
                    buttonList.appendChild(button);
                });
            });
        })
        .catch(error => console.error("Error al cargar el archivo JSON:", error));

    // Función para reproducir el sonido
    function playSound(soundName) {
        currentAudio = new Audio(`sounds/${soundName}.mp3`);  // Crear una nueva instancia del audio
        currentAudio.play().catch(err => console.error("Error al reproducir sonido:", err));
    }

    // Función para detener el sonido actual
    function stopCurrentAudio() {
        if (currentAudio) {
            currentAudio.pause();  // Pausar el audio
            currentAudio.currentTime = 0;  // Reiniciar el tiempo del audio
            currentAudio = null;  // Limpiar la referencia al audio actual
        }
    }
});
