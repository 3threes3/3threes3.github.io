let colors = ["#24d05a", "#eb4888", "#10a2f5", "#e9bc3f"];

// Self invoking function, función autoinvocada? Es simplemente que se ejecuta automáticamente (y con ella, todas las que he 
// metido dentro, vaya)
(function() {
  setModeEventListener();
  setRandomLinkColor();
  setColorHoverListener();
  setBioEventListener();
  setRandomPhoto();

  // Cada 2500 milisegundos cambio de foto. Dos segundos y medio, vaya. 
  setInterval(() => {
    setRandomPhoto();
  }, 2500);

  // Aún a riesgo de que parezca una feria, cambio de color los enlaces cada 5 segundos; además de otras acciones posteriormente
  // definidas que también los hacen cambiar
  setInterval(() => {
    setRandomLinkColor();
  }, 5000);
})();

// Mueve entre modo oscuro y claro en función de si está marcado o no el checkbox del html 
function setModeEventListener() {
  let list = document.body.classList;
  document.getElementById("toggler").addEventListener("change", event => {
    event.target.checked ? list.add("dark-mode") : list.remove("dark-mode");
  });
}

// Saca un color aleatorio de la lista de la primera línea

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Para cada elemento <a> del html, ejecuta la función previa y le asigna el color que haya tocado 

function setRandomLinkColor() {
  Array.from(document.getElementsByTagName("a")).forEach(e => {
    e.style.color = getRandomColor();
  });
}

// Lo mismo que antes, pero lo hace cuando se coloca el ratón encima del enlace (se cambia para todos los enlaces, no sólo
// para el enlace sobre el que tengamos el ratón)

function setColorHoverListener() {
  Array.from(document.querySelectorAll("a, button")).forEach(e => {
    e.addEventListener("mouseover", setRandomLinkColor);
  });
}

// Genera un número random entre 1 y 14 y lo uso como substring para enviar el valor de src a la imagen que uso en la cabecera de la web

function setRandomPhoto() {
  let num = Math.floor(Math.random() * 14) + 1;
  document.getElementById("propic").src = `./pics/face${num}.jpg`;
}

// Similar a lo anterior, recojo los eventos de tipo click y llamo a la función bioToggle

function setBioEventListener() {
  Array.from(document.getElementsByTagName("button")).forEach(e => {
    e.addEventListener("click", bioToggle);
  });
}

// Llamada desde la anterior función, reinicio todas las etiquetas con clase bio a través de la función off 
// Posteriormente doy un color al borde y al texto de la etiqueta donde se ha clickado y se muestra la etiqueta en cuestión
// Esto lo gestiono a través de los ids de los botones, donde añado o quito la clase show
// Por defecto aparece la versión breve, se puede ver en la línea 38 del archivo index.html

function bioToggle(e) {
  let bioType = e.target;
  let color = getRandomColor();
  off();
  bioType.style.cssText = `border-color: ${color}; color: ${color}; font-weight: bold;`;
  let bioTypeElement = document.getElementsByClassName(bioType.id)[0];
  bioTypeElement.classList.add("show");
}

// Doy color por defecto y quito todas las etiquetas posibles de muestreo que pueda haber de anteriores clicks. 

function off() {
  Array.from(document.getElementsByTagName("button")).forEach(button => {
    button.style.borderColor = "#96979c";
    button.style.color = "#96979c";
  });
  Array.from(document.getElementsByClassName("bio")).forEach(bio => {
    bio.classList.remove("show");
  });
}
