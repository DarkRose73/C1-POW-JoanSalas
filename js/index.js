tinymce.init({
    selector: '#detalle-txt',
    height: 200,
    menubar: false,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});

const reos = [];
const ciudades = ["Viña del Mar", "Quilpue", "Santiago", "Otro que no sea Santiago"];

const cargarSelect = () => {
    let select = document.querySelector("#ciudad-select");
    for (let i = 0; i < ciudades.length; ++i) {
        let opcion = document.createElement("option");
        opcion.text = ciudades[i];
        opcion.value = String(i + 1);
        select.appendChild(opcion);
    }
};

const cargarTabla = () => {
    let tbody = document.querySelector("#tbody-tabla");
    tbody.innerHTML = "";
    for (let i = 0; i < reos.length; ++i) {
        let r = reos[i];
        let tr = document.createElement("tr");
        let tdNombre = document.createElement("td");
        let tdDetalle = document.createElement("td");
        let tdCiudad = document.createElement("td");
        let tdGravedad = document.createElement("td");

        tdNombre.innerText = r.nombre;
        tdDetalle.innerHTML = r.detalle_crim
        //TODO: ver si para agregar ciudades a la tabla es solo con 4 o no
        if (r.ciudad == "1") {
            tdCiudad.innerText = "Viña del Mar";
        }
        else if (r.ciudad == "2") {
            tdCiudad.innerText = "Quilpue";
        }
        else if (r.ciudad == "3") {
            tdCiudad.innerText = "Santiago";
        }
        else {
            tdCiudad.innerText = "Otro que no sea Santiago";
        }
        //TODOCLOSE

        let estado = document.createElement("i");

        if (r.crimenes <= 3) {
            estado.classList.add("fas", "fa-meh", "fa-2x", "text-success");
        }
        else if ((r.crimenes >= 4) && (r.crimenes <= 6)) {
            estado.classList.add("fas", "fa-dizzy", "fa-2x", "text-secondary");
        }
        else if ((r.crimenes >= 7) && (r.crimenes <= 15)) {
            estado.classList.add("fas", "fa-exclamation-triangle", "fa-2x", "text-warning");
        }
        else if (r.crimenes > 15) {
            estado.classList.add("fas", "fa-skull-crossbones", "fa-2x", "text-danger");
        }
        tdGravedad.classList.add("text-center");
        tdGravedad.appendChild(estado);

        tr.appendChild(tdNombre);
        tr.appendChild(tdDetalle);
        tr.appendChild(tdCiudad);
        tr.appendChild(tdGravedad);

        tbody.appendChild(tr);
    }
};
document.addEventListener("DOMContentLoaded", () => {
    cargarSelect();
});

document.querySelector("#agregar-btn").addEventListener("click", () => {
    let nombre = document.querySelector("#nombre-reo").value;
    let apellido = document.querySelector("#apellido-reo").value;
    let nombre_completo = nombre + " " + apellido;
    let crimenes = document.querySelector("#crimenes-num").value;
    let detalle = tinymce.get("detalle-txt").getContent();
    let ciudad = document.querySelector("#ciudad-select").value;

    let reo = {};
    reo.nombre = nombre_completo;
    reo.crimenes = crimenes;
    reo.detalle_crim = detalle;
    reo.ciudad = ciudad;

    reos.push(reo);
    cargarTabla();
    Swal.fire("Registro de criminal realizado");
})