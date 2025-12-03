// Lista de usuarios (automática con inicial + número)
const usuarios = {
    "aaron": { pass: "a1", tipo: "gratis" },
    "luana": { pass: "l2", tipo: "premium" },
    "juan": { pass: "j3", tipo: "gratis" },
    // AQUÍ PUEDES AGREGAR MÁS…
};

// Guardar tareas
if (!localStorage.tareas) localStorage.tareas = JSON.stringify([]);

// LOGIN
function login() {
    let user = document.getElementById("username").value.toLowerCase();
    let pass = document.getElementById("password").value;

    if (!usuarios[user]) {
        document.getElementById("msg").innerText = "Usuario no encontrado.";
        return;
    }

    if (usuarios[user].pass !== pass) {
        document.getElementById("msg").innerText = "Contraseña incorrecta.";
        return;
    }

    localStorage.usuario = user;

    if (user === "admin") {
        window.location = "panel-admin.html";
    } else {
        window.location = "cursos.html";
    }
}

// SUBIR TAREA
function subirTarea() {
    let c = document.getElementById("curso").value;
    let t = document.getElementById("titulo").value;
    let d = document.getElementById("descripcion").value;

    let lista = JSON.parse(localStorage.tareas);

    lista.push({ curso: c, titulo: t, descripcion: d });

    localStorage.tareas = JSON.stringify(lista);

    document.getElementById("msg").innerText = "Tarea subida correctamente ✔️";
    mostrarTareas();
}

// ADMIN: mostrar tareas
function mostrarTareas() {
    if (!document.getElementById("listaTareas")) return;

    let lista = JSON.parse(localStorage.tareas);
    let html = "";

    lista.forEach(t => {
        html += `<p><strong>${t.curso}:</strong> ${t.titulo} → ${t.descripcion}</p>`;
    });

    document.getElementById("listaTareas").innerHTML = html;
}
mostrarTareas();

// ESTUDIANTE: mostrar cursos
const cursos = [
    "Matemática","Inglés","Comunicación","EPT","CCSS","CyT",
    "Educación Física","DPCC","Tutoría","Religión","Arte y Cultura"
];

if (document.getElementById("cursos")) {
    let html = "";
    cursos.forEach(c => {
        html += `<p><a class='btn' href="tareas.html?curso=${c}">${c}</a></p>`;
    });
    document.getElementById("cursos").innerHTML = html;
}

// MOSTRAR TAREAS POR CURSO
if (document.getElementById("contenidoTareas")) {
    let params = new URLSearchParams(location.search);
    let curso = params.get("curso");

    let lista = JSON.parse(localStorage.tareas);
    let html = `<h2>${curso}</h2>`;

    lista
        .filter(t => t.curso === curso)
        .forEach(t => {
            html += `<div class='card'><h3>${t.titulo}</h3><p>${t.descripcion}</p></div>`;
        });

    document.getElementById("contenidoTareas").innerHTML = html;
}
