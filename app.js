document.addEventListener("DOMContentLoaded", function () {
    const buttonList = document.getElementById("button-list");

    // Cargar los sonidos desde el archivo JSON
    fetch('assets/sounds.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(sound => {
                // Crear un botón para cada sonido
                const button = document.createElement("button");
                button.classList.add("sound-button");
                button.textContent = `${sound.name} (${sound.duration})`;
                button.setAttribute("data-sound", sound.file);
                
                // Agregar un evento de clic a cada botón
                button.addEventListener("click", () => {
                    playSound(sound.file);
                });

                // Añadir el botón a la lista de botones
                buttonList.appendChild(button);
            });
        })
        .catch(error => console.error("Error al cargar el archivo JSON:", error));

    // Función para reproducir el sonido
    function playSound(soundName) {
        const audio = new Audio(`sounds/${soundName}.mp3`); // Ruta a los archivos de sonido
        audio.play();
    }
});
