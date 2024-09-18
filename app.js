document.addEventListener("DOMContentLoaded", function () {
    const buttonList = document.getElementById("button-list");
    let currentAudio = null;

    // Cargar los sonidos desde el archivo JSON
    fetch('assets/sounds.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(sound => {
                const audio = new Audio(`sounds/${sound.file}.mp3`);
                audio.addEventListener("loadedmetadata", () => {
                    const duration = audio.duration.toFixed(1); // Redondear a un decimal
                    const button = document.createElement("button");
                    button.classList.add("sound-button");
                    button.textContent = `${sound.name} (${duration}s)`;
                    button.setAttribute("data-sound", sound.file);
                    button.addEventListener("click", () => {
                        stopCurrentAudio();
                        playSound(sound.file);
                    });
                    buttonList.appendChild(button);
                });
            });
        })
        .catch(error => console.error("Error al cargar el archivo JSON:", error));

    function playSound(soundName) {
        currentAudio = new Audio(`sounds/${soundName}.mp3`);
        currentAudio.play().catch(err => console.error("Error al reproducir sonido:", err));
    }

    function stopCurrentAudio() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
    }

    // --- Contador de visitas ---
    const visitCountElement = document.getElementById("visit-count");

    // Obtener el número de visitas del almacenamiento local
    let visitCount = localStorage.getItem("visitCount");

    // Si no existe, inicializar a 0
    if (!visitCount) {
        visitCount = 0;
    }

    // Incrementar el contador
    visitCount++;

    // Guardar el nuevo número de visitas en localStorage
    localStorage.setItem("visitCount", visitCount);

    // Actualizar el contador en la página
    visitCountElement.textContent = visitCount;
});
