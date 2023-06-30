//Variables

//busca los botones con la clase comparar
const btnComprar = document.querySelectorAll(".btn-comprar");
//el formulario para añadir obras
const form = document.getElementById("artworkForm");
//tabla que contiene las obras de arte
const tableBody = document.querySelector("#artworkTable tbody");
//boton del formulario de filtro
const btnFiltro = document.querySelector(".filtros");

//--------Foto perfil----------------//
const profileImage = document.getElementById("profileImage");

const profileImageButton = document.getElementById("profileImageButton");

const cameraModal = document.getElementById("cameraModal");

const cameraVideo = document.getElementById("cameraVideo");

const icono = document.querySelector(".profile-image i.fa-user");

function openCameraModal() {
  cameraModal.style.display = "block";
  startCamera();
}

function startCamera() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      cameraVideo.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Error al acceder a la cámara: ", error);
    });
}

function capturePhoto() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = cameraVideo.videoWidth;
  canvas.height = cameraVideo.videoHeight;
  context.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);
  const photoURL = canvas.toDataURL();
  profileImage.style.display = "block";
  icono.style.display = "none";
  profileImage.src = photoURL;
  closeCameraModal();
}

function closeCameraModal() {
  cameraModal.style.display = "none";
  stopCamera();
}

function stopCamera() {
  const stream = cameraVideo.srcObject;
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach(function (track) {
      track.stop();
    });
  }
}

//-------------formulario de registro-------------------
const formRegister = document.querySelector("#registerForm");
if (formRegister !== null) {
  formRegister.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío del formulario

    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    var messageElement = document.getElementById("message");

    var regexUppercase = /[A-Z]/;
    var regexNumber = /[0-9]/;

    if (password !== confirmPassword) {
      messageElement.textContent = "Las contraseñas no coinciden.";
      messageElement.style.color = "red";
      messageElement.style.marginBottom = "2rem";
    } else if (password.length < 8) {
      messageElement.textContent =
        "La contraseña debe tener al menos 8 caracteres.";
      messageElement.style.color = "red";
      messageElement.style.marginBottom = "2rem";
    } else if (!regexUppercase.test(password)) {
      messageElement.textContent =
        "La contraseña debe contener al menos una mayúscula.";
      messageElement.style.color = "red";
      messageElement.style.marginBottom = "2rem";
    } else if (!regexNumber.test(password)) {
      messageElement.textContent =
        "La contraseña debe contener al menos un número.";
      messageElement.style.color = "red";
      messageElement.style.marginBottom = "2rem";
    } else {
      messageElement.textContent = "Contraseña válida.";
      messageElement.style.color = "green";
      messageElement.style.marginBottom = "2rem";
    }
  });
}

//funciones
//al dar click abre el carrito de compra
if (btnComprar !== null) {
  btnComprar.forEach((boton) => {
    boton.onclick = () => {
      window.location.href = "/carrito.html";
    };
  });
}

//al dar click abre el formulario
if (btnFiltro !== null) {
  btnFiltro.addEventListener("click", () => {
    var formulario = document.querySelector(".filtros-campos-container");
    if (formulario.style.display === "none") {
      formulario.style.display = "block";
    } else {
      formulario.style.display = "none";
    }
  });
}

// crea y añade  los elemetos en la tabla de las obras

if (form !== null) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const size = document.getElementById("size").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
      const imgSrc = e.target.result;
      const newRow = createTableRow(imgSrc, name, price, size, description);
      tableBody.appendChild(newRow);
      form.reset();
    };
    reader.readAsDataURL(image);
  });
}

function createTableRow(imgSrc, name, price, size, description) {
  const row = document.createElement("tr");

  const imageCell = document.createElement("td");
  const image = document.createElement("img");
  image.src = imgSrc;
  imageCell.appendChild(image);
  row.appendChild(imageCell);

  const nameCell = document.createElement("td");
  nameCell.textContent = name;
  row.appendChild(nameCell);

  const priceCell = document.createElement("td");
  priceCell.textContent = price;
  row.appendChild(priceCell);

  const sizeCell = document.createElement("td");
  sizeCell.textContent = size;
  row.appendChild(sizeCell);

  const descriptionCell = document.createElement("td");
  descriptionCell.textContent = description;
  row.appendChild(descriptionCell);

  return row;
}

//Controlando el login

window.addEventListener("DOMContentLoaded", function () {
  
  var loginButton = document.getElementById("loginButton");
  var loginPopup = document.querySelector(".popup");
  var closeButton = document.querySelector(".icon-close");
  var loginForm = document.getElementById("loginForm");
  loginButton.addEventListener("click", function () {
    loginPopup.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    loginPopup.style.display = "none";
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Realizar lógica de inicio de sesión aquí

    // Después de la autenticación, puedes redirigir al usuario a otra página
    // o mostrar un mensaje de éxito/error dentro del popup.
  });
});

const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");

registerLink.addEventListener("click", () => {
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
