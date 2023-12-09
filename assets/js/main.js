const tareas = [
  { id: 101, nombre: "Hacer las compras", estado: false },
  { id: 102, nombre: "Pasear al perro", estado: false },
  { id: 103, nombre: "Recoger la ropa de la secadora", estado: false },
];

const listaDeTareas = document.querySelector("#listaTareas");
const tareaInput = document.querySelector("#nuevaTarea");
const totalTareas = document.querySelector("#totalTareas");
const realizadasTareas = document.querySelector("#realizadasTareas");
const btnAgregar = document.querySelector("#agregarTarea");
let idContador = 103;

function actualizarContadores() {
  const tareasHechas = tareas.filter((tarea) => tarea.estado).length;
  totalTareas.innerHTML = `<strong>Total:</strong> ${tareas.length}`;
  realizadasTareas.innerHTML = `<strong>Realizadas:</strong> ${tareasHechas}`;
}

function renderTareas() {
  actualizarContadores();
  listaDeTareas.innerHTML = tareas
    .map(
      (tarea) => `
    <tr id="tarea-${tarea.id}">
      <td>${tarea.id}</td>
      <td style="word-break: break-word">${tarea.nombre}</td>
      <td>
        <input type="checkbox" ${
          tarea.estado ? "checked" : ""
        } onclick="cambioEstado(${
        tarea.id
      })" style="height: 1rem; padding-right: 1rem;">
      </td>
      <td>
        <button onclick="borrar(${tarea.id})">❌</button>
      </td>
    </tr>
  `
    )
    .join("");
}

renderTareas();

btnAgregar.addEventListener("click", () => {
  const nuevaTarea = tareaInput.value.trim();
  if (nuevaTarea === "") {
    alert("El campo esta vacío. Por favor ingresar un nombre de tarea.");
  } else {
    idContador += 1;
    tareas.push({ id: idContador, nombre: nuevaTarea, estado: false });
    tareaInput.value = "";
    renderTareas();
  }
});

function borrar(id) {
  const index = tareas.findIndex((ele) => ele.id === id);
  tareas.splice(index, 1);
  renderTareas();
}

function cambioEstado(id) {
  const tarea = tareas.find((ele) => ele.id === id);
  tarea.estado = !tarea.estado;
  actualizarContadores();
  pintarEstado(tarea);
}

function pintarEstado(tarea) {
  const fila = document.getElementById(`tarea-${tarea.id}`);

  if (tarea.estado) {
    fila.style.backgroundColor = "lightgreen";
  } else {
    fila.style.backgroundColor = "";
  }
}
// la pagina al actualizarse se borra lo verde pero no el checked
