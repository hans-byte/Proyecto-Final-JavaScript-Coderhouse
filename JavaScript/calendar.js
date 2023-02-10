class nuevaConsulta {
  nombre;
  apellido;
  especialidad;
  horaExacta;
  fecha;
  hora;
  especialidadFechaHora;
  detalle;
  constructor(nombre,apellido,especialidad,horaExacta,fecha,hora,especialidadFechaHora,detalle){
      this.nombre = nombre;
      this.apellido = apellido;
      this.especialidad = especialidad;
      this.horaExacta = horaExacta
      this.fecha = fecha;
      this.hora = hora;
      this.especialidadFechaHora = especialidadFechaHora;
      this.detalle = detalle;
  }
}

let list = []

var DateTime = luxon.DateTime;

const nombre = document.getElementById("nombre")
const apellido = document.getElementById("apellido")
const especialidad = document.getElementById("especialidad")
const fecha = document.getElementById("fecha")
const hora = document.getElementById("hora")
const minutos = document.getElementById("minutos")
const detalle = document.getElementById("detalle")
const check = document.getElementById("check")
const tabla = document.getElementById("tabla")
const turno = document.getElementById("turno")
const formulario = document.querySelectorAll("form")

window.addEventListener('DOMContentLoaded',turnosagendados())

var date = new Date();
var time = date.toISOString().substring(11,14);


turno.addEventListener("click",(evento) =>{
  evento.preventDefault();
  if ((nombre.value && apellido.value && especialidad.value && fecha.value && hora.value && minutos.value) === "") {
      console.log(check.checked)
      swal({
          title: "Por favor ingrese todos los campos",
          icon: "error",
      })
  }
  else if (check.checked == false){
      swal({
          title: "Por favor acepte nuestros términos y condiciones",
          icon: "error",
      })
  }
  else{
      if (minutos.value === "0"){
          minutos.value = "00"
      }
      let fechaInput = fecha.value +"T"+hora.value+":"+minutos.value
      fechaInput = DateTime.fromISO(fechaInput)
      let ahora = DateTime.now()
      if (fechaInput - ahora <0){
          swal({
              title: "Usted a elegido una fecha pasada",
              icon: "error",
          });
      }
      else{
          let datosConsulta = especialidad.value+fechaInput.toFormat('dd-MM-yyyy')+fechaInput.toFormat('hh:mm')
          if(list.find((a) => a.especialidadFechaHora === datosConsulta)){
              swal({
                  text: "Usted a seleccionado una fecha y una especialidad para la cual ya existe un turno agendado. Le solicitamos que utilice otra fecha",
                  icon: "error",
              })
          }
          else{
              list.push(new nuevaConsulta(nombre.value,apellido.value,especialidad.value,fechaInput,fechaInput.toFormat('dd-MM-yyyy'),fechaInput.toFormat('hh:mm'),datosConsulta,detalle.value))
              localStorage.setItem("turnos",JSON.stringify(list))
              if (fechaInput - ahora < 600000000){
                  let start = fechaInput.toFormat('yyyy-MM-dd') 
                  fetch("https://api.open-meteo.com/v1/forecast?latitude=-32.89&longitude=-68.83&daily=temperature_2m_max,rain_sum&timezone=auto&start_date="+start+"&end_date="+start)
                  .then((response) => {
                      if (response.ok)
                          {
                          return response.json()
                          }
                      else {
                          throw new Error('Existe un error en el código: '+response.status)
                      }
                  }).then((json) => {
                      if(json.daily.temperature_2m_max > 30){
                          swal({
                              text: "Debido a las altas temperaturas que habrán para el día seleccionado ("+json.daily.temperature_2m_max+" °C), le recomendamos beber bastante agua",
                              icon: "warning",
                          })
                          .then(() => {
                          swal({
                              title: "Turno cargado correctamente",
                              icon: "success",
                          });
                          });
                      }
                      else if (json.daily.rain_sum > 10){
                          swal({
                              text: "Debido a las posibles precipitaciones que habrán en el día seleccionado ("+json.daily.rain_sum+" mm), le recomendamos traer paraguas",
                              icon: "warning",
                          })
                          .then((value) => {
                          swal({
                              title: "Turno cargado correctamente",
                              icon: "success",
                          });
                          });
                      }
                      else if((json.daily.temperature_2m_max > 30 && json.daily.rain_sum > 10)){
                          swal({
                              text: "Debido a las altas temperaturas ("+json.daily.temperature_2m_max+" °C) y la precipitaciones pronosticadas ("+json.daily.rain_sum+" mm) par el día seleccionado, le recomendamos beber bastante agua y traer paraguas",
                              icon: "warning",
                          })
                          .then((value) => {
                          swal({
                              title: "Turno cargado correctamente",
                              icon: "success",
                          });
                          });
                      }
                      else {
                          swal({
                              title: "Turno cargado correctamente",
                              icon: "success",
                          });
                      
                      }
                      }
                  ).catch((error) => console.log(error))
              }
              else{
                  swal({
                      title: "Turno cargado correctamente",
                      icon: "success",
                  });
              }
  
              limpiarFormulario()
              actualizacionTabla(list)
              turnosagendados()
          }
          
      }
  }
})

function limpiarFormulario(){
  formulario.forEach((campo) => {
      campo.reset()
  })
}

function sortByKey(array, key) {
  return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
  });
}


function actualizacionTabla(list){
  let counter = 1;
  tabla.innerHTML = '';
  if (list != null) {
      let sortedArray = sortByKey(list,'horaExacta');
      sortedArray.forEach((elemento) => {
      
          tabla.innerHTML +=
          `
          <tr>
              <th scope="row">${counter}</th>
              <td>${elemento.especialidad}</td>
              <td>${elemento.fecha}</td>
              <td>${elemento.hora}</td>
          </tr>
          
          `
          counter ++
  
  })
  }

}

function turnosagendados(){
  list = JSON.parse(localStorage.getItem("turnos")) || []
  actualizacionTabla(list)
}