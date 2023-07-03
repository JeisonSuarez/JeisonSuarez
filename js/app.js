//Variables

//busca los botones con la clase comparar
const btnComprar = document.querySelectorAll(".btn-comprar");

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

const formRegister = document.querySelector("#registerForm");
if (formRegister !== null) {
  formRegister.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario

    let username = document.querySelector(".userName").value;
    let email = document.querySelector(".email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let termsCheckbox = document.querySelector("#checkboxTerminos");
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
      messageElement.style.fontSize = "14px";
      messageElement.style.textAlign = "center";
    } else if (!regexEmail.test(email)) {
      messageElement.textContent =
        "El correo electrónico debe ser una dirección de Gmail válida.";
      messageElement.style.color = "red";
      messageElement.style.marginBottom = "2rem";
      messageElement.style.fontSize = "14px";
      messageElement.style.textAlign = "center";
    } else if (password !== confirmPassword) {
      messageElement.textContent = "Las contraseñas no coinciden.";
      messageElement.style.color = "red";
      messageElement.style.marginBottom = "2rem";
      messageElement.style.fontSize = "14px";
      messageElement.style.textAlign = "center";
    } else if (password.length < 8) {
      messageElement.textContent =
        "La contraseña debe tener al menos 8 caracteres.";
      messageElement.style.color = "red";
      messageElement.style.marginBottom = "2rem";
      messageElement.style.fontSize = "14px";
      messageElement.style.textAlign = "center";
    } else if (!regexUppercase.test(password)) {
      messageElement.textContent =
        "La contraseña debe contener al menos una mayúscula.";
      messageElement.style.color = "red";
      messageElement.style.marginBottom = "2rem";
      messageElement.style.fontSize = "14px";
      messageElement.style.textAlign = "center";
    } else if (!regexNumber.test(password)) {
      messageElement.textContent =
        "La contraseña debe contener al menos un número.";
      messageElement.style.color = "red";
      messageElement.style.marginBottom = "2rem";
      messageElement.style.fontSize = "14px";
      messageElement.style.textAlign = "center";
    } else if (!termsCheckbox.checked) {
      messageElement.textContent = "Debes aceptar los términos y condiciones.";
      messageElement.style.color = "red";
      messageElement.style.marginBottom = "2rem";
      messageElement.style.fontSize = "14px";
      messageElement.style.textAlign = "center";
    } else {
      messageElement.textContent = "Registro exitoso.";
      messageElement.style.color = "green";
      messageElement.style.marginBottom = "2rem";
      messageElement.style.fontSize = "14px";
      messageElement.style.textAlign = "center";
      // Limpiar los campos del formulario
      formRegister.reset();
      //limpia la camara
      profileImage.style.display = "none";
      icono.style.display = "block";
    }
  });

  // Event listener para ocultar el mensaje de error cuando un elemento tenga el foco
  formRegister.addEventListener("focusin", function () {
    let messageElement = document.getElementById("message");
    messageElement.textContent = "";
  });
}

// Función para restablecer los valores de los campos del formulario
function resetFields() {
  document.querySelector(".userName").value = "";
  document.querySelector(".email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirmPassword").value = "";
  document.querySelector('input[type="checkbox"]').checked = false;
  profileImage.style.display = "none";
  icono.style.display = "block";
}

//al dar click abre el carrito de compra
if (btnComprar !== null) {
  // Obtener todos los botones de compra
  const botonesCompra = document.querySelectorAll(".btn-comprar");

  // Agregar evento de clic a cada botón de compra
  const btnComprar = document.querySelectorAll(".btn-comprar");

  btnComprar.forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.dataset.id;
      const titulo = this.dataset.titulo;
      const descripcion = this.dataset.descripcion;
      const tiempo = this.dataset.tiempo;
      const precio = this.dataset.precio;
      const cantidad = this.dataset.cantidad;

      // Redireccionar a la página informacionPlan.html y pasar los datos
      window.location.href = `carrito.html?id=${id}&titulo=${titulo}&descripcion=${descripcion}&tiempo=${tiempo}&precio=${precio}&cantidad=${cantidad}`;
    });
  });
}

//verifico si la pagina carrito esta cargada
window.addEventListener("load", function () {
  // Obtener el nombre del archivo actual
  var currentPage = location.pathname.split("/").pop();
  // Obtener la cadena de consulta de la URL
  const queryString = window.location.search;

  // Crear un objeto URLSearchParams a partir de la cadena de consulta
  const params = new URLSearchParams(queryString);
  // Verificar si la página "carrito.html" está cargada

  const contenedor = this.document.querySelector('.contenedor-carrito');
  const contenedorPorDefecto = this.document.querySelector('.contenedor-defecto');


  if (currentPage === "carrito.html" && queryString) {
    // Obtener los valores de los parámetros
    const contenedor = this.document.querySelector('.contenedor-carrito');
    const contenedorPorDefecto = this.document.querySelector('.contenedor-defecto');
    contenedor.style.display="block";
    contenedorPorDefecto.style.display = "none";

    const id = params.get("id");
    const titulo = params.get("titulo");
    const descripcion = params.get("descripcion");
    const tiempo = params.get("tiempo");
    const precio = params.get("precio");
    const cantidad = params.get("cantidad");
                  
    const tituloPlan = document.querySelector(".titulo-plan");
    const descripcionPlan = this.document.querySelector(".plan-description");
    const precioPlan = this.document.querySelector(".plan-price")

    tituloPlan.textContent = titulo;
    precioPlan.textContent =" A un increible precio de $ " + precio;
    descripcionPlan.textContent = `Con nuestro plan de publicación de arte, 
    tendrás la oportunidad de mostrar hasta ${cantidad} pinturas de arte, 
    sin límites a tu imaginación y expresión artística. 
    Desde paisajes impresionantes hasta retratos fascinantes, 
    cada obra será apreciada y admirada por
     amantes del arte de todo el mundo por un tiempo de ${tiempo}.`;
    
    addArtworkWithLimit(cantidad);
  }else { 
    const contenedor = this.document.querySelector('.contenedor-carrito');
    const contenedorPorDefecto = this.document.querySelector('.contenedor-defecto');
    if(contenedor !==null && contenedorPorDefecto !== null){
      contenedor.style.display="none";
    contenedorPorDefecto.style.display = "flex";
    }
    
  }
});

//------------------------------------------------------

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

function addArtworkWithLimit(maxRows) {
  const form = document.getElementById("artworkForm");
  // tabla que contiene las obras de arte
  const tableBody = document.querySelector("#artworkTable tbody");

  let rowCount = tableBody.rows.length;

  if (form !== null) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (rowCount >= maxRows) {
        alert("Se ha alcanzado el límite máximo de obras.");
        return;
      }

      const name = document.getElementById("name").value;
      const price = document.getElementById("price").value;
      const size = document.getElementById("size").value;
      const description = document.getElementById("description").value;
      const images = document.getElementById("image").files;

      // Validar que todos los campos estén completos
      if (
        !name ||
        !price ||
        !size ||
        !description ||
        !images ||
        images.length === 0
      ) {
        alert("Por favor, completa todos los campos del formulario.");
        return;
      }

      // Validar que el precio sea un número válido
      if (isNaN(price) || parseFloat(price) <= 0) {
        alert("Por favor, ingresa un precio válido.");
        return;
      }

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
        rowCount++;
        form.reset();
      });
    });
  }
}

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
    resetFields();
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    validateLoginForm();

    // Realizar lógica de inicio de sesión aquí

    // Después de la autenticación, puedes redirigir al usuario a otra página
    // o mostrar un mensaje de éxito/error dentro del popup.
  });
});

function validateLoginForm() {
  const emailInput = document.querySelector(".login-form .emailLogin");
  const passwordInput = document.querySelector(".login-form .passwordLogin");
  const messageElement = document.getElementById("message");

  let isValid = true;

  // Validar el correo electrónico (formato de correo válido)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value)) {
    isValid = false;
    emailInput.classList.add("invalid");
    showMessage("Ingrese un correo electrónico válido.", "red");
  } else {
    emailInput.classList.remove("invalid");
  }

  // Validar la contraseña (mínimo 8 caracteres)
  if (passwordInput.value.length < 8) {
    isValid = false;
    passwordInput.classList.add("invalid");
    showMessage("La contraseña debe tener al menos 8 caracteres.", "red");
  } else {
    passwordInput.classList.remove("invalid");
  }

  if (isValid) {
    // El formulario es válido, puedes realizar acciones adicionales aquí
    showMessage("Inicio de sesión exitoso.", "green");

    // Limpiar los campos del formulario
    loginForm.reset();
  }
}

// Event listener para ocultar el mensaje de error cuando un elemento tenga el foco
loginForm.addEventListener("focusin", function () {
  const messageElement = document.getElementById("message");
  showMessage("", ""); // Oculta el mensaje
});

// Función para mostrar el mensaje
function showMessage(message, color) {
  const messageElement = document.getElementById("messageLogin");
  messageElement.textContent = message;
  messageElement.style.color = color;
  messageElement.style.marginBottom = message ? "2rem" : "0";
}

const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");

registerLink.addEventListener("click", () => {
  wrapper.classList.add("active");
  resetFields();
});

loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
