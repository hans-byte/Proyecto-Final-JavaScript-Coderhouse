//Voy a generar una clase de turnos

class turnos{
  sexo;
  nombre;
  appelido;
  mail;
  especialidad;
  fecha;
  constructor(sexo,nombre,apellido,mail,especialidad,fecha){
    this.sexo = sexo
    this.nombre = nombre
    this.apellido = apellido
    this.mail = mail
    this.especialidad = especialidad
    this.fecha = fecha
  }
}

//Genero una lista donde ir almacenando los turnos
const lista = []
const nombres = []

//Ahora voy a traer los elementos del DOM
const turno = document.getElementById("turno")
const name_ = document.getElementById("nameasd")

//Ahora coloco el disparador al presionar el botón de turnos

/*
turno.addEventListener("click",(evento)=>{
  nombres.push(new turnos(name_.value))
  console.log(nombres)
})
*/
turno.addEventListener("click",mostrar())

function mostrar(){
  console.log(name_.value)
}



/*


//Voy a generar las lógicas para solicitar al usuario sus datos
function turn(){
  let ingreso = new turnos()
  ingreso.sexo = prompt("Ingrese su sexo")
  ingreso.nombre = name_.value
  ingreso.apellido = prompt("Ingrese su apellido")
  ingreso.mail = prompt("Ingrese su mail")
  ingreso.especialidad = prompt("Ingrese la especialidad")
  ingreso.fecha = prompt("Ingrese la fecha")
  lista.push(ingreso)
  localStorage.setItem("turnos",JSON.stringify(lista))
  mostrarItems(lista)
}


//function traeritemslocal(){
//  const lista = JSON.parse(localStorage.getItem("turnos"))
//  mostrarItems()
//}

//Quiero mostrar los turnos generados en una tabla, con lo cual realizo una función
function mostrarItems(lista){
  const tbody = document.getElementById("tabla")
  tbody.innerHTML = "";
  let contador = 1;
  lista.forEach(element => {
    tbody.innerHTML +=
    `
    <tr>
      <th scope="row">${contador}</th>
      <td>${element.especialidad}</td>
      <td>${element.fecha}</td>
    </tr>`
    contador ++;
  });
}
*/