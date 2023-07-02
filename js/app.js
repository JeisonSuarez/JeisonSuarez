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

const formRegister = document.querySelector("#registerForm");
if (formRegister !== null) {
  formRegister.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío del formulario

    let username = document.querySelector(".userName").value;
    let email = document.querySelector(".email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let termsCheckbox = document.querySelector('input[type="checkbox"]');
    let messageElement = document.getElementById("message");

    let regexUsername = /^[a-zA-Z0-9_]{3,20}$/; // Expresión regular para validar el nombre de usuario
    let regexEmail = /^[a-zA-Z0-9_.+-]+@gmail.com$/; // Expresión regular para validar el correo electrónico de Gmail
    let regexUppercase = /[A-Z]/;
    let regexNumber = /[0-9]/;

    if (!regexUsername.test(username)) {
      messageElement.textContent =
        "El nombre de usuario debe contener entre 3 y 20 caracteres alfanuméricos (letras, números y guiones bajos).";
      messageElement.style.color = "red";
      messageElement.style.marginBottom = "2rem";
    } else if (!regexEmail.test(email)) {
      messageElement.textContent =
        "El correo electrónico debe ser una dirección de Gmail válida.";
      messageElement.style.color = "red";
      messageElement.style.marginBottom = "2rem";
    } else if (password !== confirmPassword) {
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
    } else if (!termsCheckbox.checked) {
      messageElement.textContent = "Debes aceptar los términos y condiciones.";
      messageElement.style.color = "red";
      messageElement.style.marginBottom = "2rem";
    } else {
      messageElement.textContent = "Registro exitoso.";
      messageElement.style.color = "green";
      messageElement.style.marginBottom = "2rem";

      // Limpiar los campos del formulario
      formRegister.reset();
    }
  });

  // Event listener para ocultar el mensaje de error cuando un elemento tenga el foco
  formRegister.addEventListener("focusin", function () {
    let messageElement = document.getElementById("message");
    messageElement.textContent = "";
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

//al dar click abre el formulario de los filtros
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
    const images = document.getElementById("image").files;

    // Validar que solo se seleccionen archivos de imagen
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const selectedImages = Array.from(images).filter((file) =>
      validImageTypes.includes(file.type)
    );
    if (selectedImages.length !== images.length) {
      alert("Por favor, selecciona solo archivos de imagen.");
      return;
    }

    const imagePromises = Array.from(selectedImages).map((image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          resolve(e.target.result);
        };
        reader.onerror = function (e) {
          reject(e);
        };
        reader.readAsDataURL(image);
      });
    });

    Promise.all(imagePromises).then((results) => {
      const newRow = createTableRow(results, name, price, size, description);
      tableBody.appendChild(newRow);
      form.reset();
    });
  });

  function createTableRow(imgSrcArray, name, price, size, description) {
    const row = document.createElement("tr");

    const imageCell = document.createElement("td");
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    imgSrcArray.forEach((imgSrc) => {
      const imageItem = document.createElement("div");
      imageItem.classList.add("image-item");

      const image = document.createElement("img");
      image.src = imgSrc;
      imageItem.appendChild(image);

      const deleteButton = document.createElement("button");
      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fas", "fa-circle-xmark");
      deleteButton.appendChild(deleteIcon);
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", function () {
        imageItem.remove();
      });
      imageItem.appendChild(deleteButton);

      imageContainer.appendChild(imageItem);
    });
    imageCell.appendChild(imageContainer);
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

    const actionsCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", function () {
      row.remove();
    });
    actionsCell.appendChild(deleteButton);
    row.appendChild(actionsCell);

    return row;
  }
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
