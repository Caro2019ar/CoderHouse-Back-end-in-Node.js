/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor
const schemaAuthor = new normalizr.schema.Entity('author',{},{idAttribute: 'id'});

// Definimos un esquema de mensaje
const schemaMensaje = new normalizr.schema.Entity('post', {
    author: schemaAuthor
},{idAttribute: '_id'})

// Definimos un esquema de posts
const schemaMensajes = new normalizr.schema.Entity('posts', {
  mensajes: [schemaMensaje]
},{idAttribute: 'id'})
/* ----------------------------------------------------------------------------- */

/* ----------------------------------------------------------------- */
socket.on('messages', function(mensajesN) { 

  let mensajesNsize = JSON.stringify(mensajesN).length
  console.log(mensajesN, mensajesNsize);

  let mensajesD = normalizr.denormalize(mensajesN.result, schemaMensajes,mensajesN.entities)

  let mensajesDsize = JSON.stringify(mensajesD).length
  console.log(mensajesD, mensajesDsize);

  let porcentajeC = parseInt((mensajesNsize * 100) / mensajesDsize)
  console.log(`Porcentaje de compresión ${porcentajeC}%`)
  document.getElementById('compresion-info').innerText = porcentajeC

  render(mensajesD.mensajes);
});

function render(data) { 
    var html = data.map(function(elem, index){ 
      return(`
            <div>
                <b style="color:blue;">${elem.author.email}</b> 
                [<span style="color:brown;">${elem.fyh}</span>] : 
                <i style="color:green;">${elem.text}</i>
                <img width="50" src="${elem.author.avatar}" alt=" ">
            </div>
        `) 
    }).join(" "); 
    document.getElementById('messages').innerHTML = html; 
}

const userCentroMensajes = document.getElementById('username')
const textoCentroMensajes = document.getElementById('texto')
const botonCentroMensajes = document.getElementById('enviar')

function addMessage(e) { 

  e.preventDefault()

  var mensaje = { 
    author: {
        email: userCentroMensajes.value, 
        nombre: document.getElementById('firstname').value, 
        apellido: document.getElementById('lastname').value, 
        edad: document.getElementById('age').value, 
        alias: document.getElementById('alias').value,
        avatar: document.getElementById('avatar').value
    },
    text: textoCentroMensajes.value
  }

  socket.emit('new-message', mensaje); 

  textoCentroMensajes.value = ''
  textoCentroMensajes.focus()

  botonCentroMensajes.disabled = true
}

userCentroMensajes.addEventListener('input', () => {
    let hayEmail = userCentroMensajes.value.length
    let hayTexto = textoCentroMensajes.value.length
    textoCentroMensajes.disabled = !hayEmail
    botonCentroMensajes.disabled = !hayEmail || !hayTexto
})

textoCentroMensajes.addEventListener('input', () => {
    let hayTexto = textoCentroMensajes.value.length
    botonCentroMensajes.disabled = !hayTexto
})