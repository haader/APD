
// chrome.storage.sync.remove("rowsAPD", function() {
//     alert("Clave eliminada exitosamente");
//   });




//pasos de la extension
//1. crear en div en la página

// Obtener el elemento body de la página
const rowBarraBlanca = document.querySelector('.row.barraBlanca');

// Crear un nuevo elemento div para el banner
const banner = document.createElement('div');

//variable de publicada
let numpublic = 0;

const mihtml = `
<h3 class="tittle">APD: extensión (Adrian Benitez)</h3>

<div class="center" id="menu">

</div>

<div id="tablas">
        
</div>

<table id="newRow">

</table>



<style>     

            .seccionDistrito{
                font-size:40px;
                color:white;
                width:100%;
                font-weight: 300;
                text-align:center;
                background:#474545;
            }
            .center{
                width:100%;
                display: flex;
                justify-content: space-around;
                padding:10px;
            }
           
            .center p{
                color:black;
            }
            .icon{
                font-size:10px;
            }

            table{
                width:100%;
            }
            tr{
                border-bottom:solid #b040a8 1px;
                width:33,3%;
            }
            th{
                background: rgb(203 203 202);
                text-align:center;
            }
            td{
                color:black;
                text-align:center;
                color: black;
                font-size: 20px;
                justify-content: center;
                width:33,3%;
            }
            #distritoSelect,#nivelSelect,#cargoSelect,#estadoSelect,#accionSelect{
                background:pink;
                text-align:center;
                color:black;
            }
            .tittle {
            
            text-align:center;
            font-family: 'Encode Sans';
            color: #707070;
            font-size: 2rem;
            }
           
            .cargo{
                font-size: 20px;
                height: 100%;
                text-align: center;
                margin-bottom: 0px
            }
            .column{
                display:flex;
                flex-direction:column;
                align-item:center;
            }

            .buttonExtensionoff{
                color: red;
                background-color: "#f474545";
                display: inline-block;
                font-weight: 400;
                
                text-align: center;
                vertical-align: middle;
                border: 1px solid red;
                padding: 0.375rem 0.75rem;
                font-size: 1rem;
                line-height: 1.5;
                border-radius: 0.25rem;

            }
            .buttonExtension:not(:disabled):not(.disabled) {
                cursor: pointer;
            }
            .buttonExtension {
                color: #ffffff;
                background-color: var(--color-primary);
                display: inline-block;
                font-weight: 400;
                
                text-align: center;
                vertical-align: middle;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                
                border: 1px solid transparent;
                padding: 0.375rem 0.75rem;
                font-size: 1rem;
                line-height: 1.5;
                border-radius: 0.25rem;
                transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            
                margin: 0;
                font-family: inherit;
            
                overflow: visible;
            }
            .buttonExtension:hover {
                color: #474545;
                background-color: #dad5de;
            }

            .close{
                height:100%;
            }
            #accion {
                display: flex;
                flex-direction: row; /* dirección de flexbox por defecto */
              }
              
              @media (max-width: 700px) {
                #accion {
                  flex-direction: column; /* cambia la dirección de flexbox a columna cuando el ancho de la ventana es menor a 700px */
                }
              }
              
            
</style>

`;


// Agregar el contenido HTML del banner
banner.insertAdjacentHTML('beforeend', mihtml);

// Estilizar el banner con CSS
banner.style.position = 'relative';
banner.style.top = 0;
banner.style.left = 0;
banner.style.width = '100%';
banner.style.alignItems = 'center';
banner.style.justifyContent = 'center';
banner.style.backgroundColor = 'white';
banner.style.color = 'white';
banner.style.padding = '10px';

// Agrega el banner como un elemento hermano de .row.barraBlanca
rowBarraBlanca.parentNode.insertBefore(banner, rowBarraBlanca);

//DECLARACION DE VARIABLES

var distrito = '';
var nivel = '';
var cargo = '';

var arrayJSONtraido = [{}];
var arrayJSONSelect = [{ "distrito": distrito, "nivel": nivel, "cargo": cargo }];
var arrayJSONenviar = [{}];
const consultaURL = 'https://servicios3.abc.gob.ar/valoracion.docente/api/apd.oferta.encabezado/';

const color2 = 'white';
const color1 = '#7cc';
let colorSelect = color1;


let colorFuente = "black";
let fuentegris = "#707070";

let distritoActual = '';
let pintaren = 'distrito';
let numTablas = 0;
let vernivelboolean = false;
let vertodoboolean = false;
repintarTabla();

//-trae los datos en json de la cuenta de google y 
//-actualiza la tabla y 
//-las variable arrayJSONtraido
function repintarTabla() {

    //traemos los datos guardados en el LOCAL storage
    chrome.storage.sync.get("rowsAPD", function (datos) {

        console.log("rowsAPD (traido):", datos.rowsAPD);
        arrayJSONtraido = datos.rowsAPD;
        console.log(arrayJSONtraido)
        //imprimimos los datos en el HTML

        //si los datos del LOCALSTORAGE estan vacios solo cargamos 1 row
        if (arrayJSONtraido === undefined) {

            {/* <td id="distritoSelect" color="red">selecciona un distrito</td> */ }
            document.getElementById("newRow").innerHTML = `
    tr>
        <td id="distritoSelect">1.Selecciona un distrito</td>
        <td id="nivelSelect">2.Selecciona un nivel</td>
        <td id="cargoSelect">3.Selecciona un cargo</td>
        
        <td id="accionSelect">
                            <button class="buttonExtension" id="guardarSelect">Guardar</button>
                            <button type="button" class="close" id="LimpiarSeleccion" aria-label="Close"></button>
        </td>

    </tr>`;


            ListenerGuardarSelectJSON();
            ListenerLimpiarSeleccion();

            //si hay datos en LOCALSTORAGE cargamos los datos mas la row de carga
        } else {
            //limpiamos los contenidos de la tablas
            document.getElementById("tablas").innerHTML = '';
            //ordenamos el arrayJSONtraido según el valor de distrito
            arrayJSONtraido.sort((a, b) => {
                //ordenamos el array
                if (a.distrito < b.distrito) {
                    return -1;
                } else if (a.distrito > b.distrito) {
                    return 1;
                } else {
                    return 0;
                }
            });

            //creamos una variable que contenga el valor del distrito actual para ser comparado
            // distritoActual=arrayJSONtraido[0].distrito;
            //nombramos la tabla



            //realizamos la iteración del arrayJSONtraido para pintar en el DOM
            arrayJSONtraido.forEach((element, index) => {

                //actualizamos el valor del distrito actual    
                if (element.distrito != distritoActual) {
                    numTablas++;
                    distritoActual = element.distrito;
                    pintaren = 'tabla' + numTablas;
                    console.log("pintar en= " + pintaren);
                    //insertamos el div que contene el nombre del distrito y lostitulos de las columnas
                    document.getElementById("tablas").innerHTML += `

                    <div class="seccionDistrito">
                        ${convertMayuscula(distritoActual)}
                    </div>

                    <table>
                            <thead>
                                    <tr>
                                        ${vernivelboolean ? `<th><div class="column"><i class="iconoFiltro fas fa-layer-group"></i> Nivel</div></th>` : ''}
                                        <th><div class="column"><i class="iconoFiltro fas fa-graduation-cap"></i> Cargo</div></th>
                                        <th><div class="column"><i class="iconoFiltro fas fa-eye"></i> Publicada</div></th>
                                        <th><div class="column"><i class="iconoFiltro fas fa-briefcase"></i>Acción</div></th>
                                    </tr>
                            </thead>

                            <tbody id=${pintaren}>

                            </tbody>
                    </table>
        `;
                    // document.getElementById("seccionDistrito").innerText=distritoActual;    
                }


                if (colorSelect == color1) {
                    colorSelect = color2;
                } else {
                    colorSelect = color1;
                }

                mostrarResultado(index, pintaren, colorSelect, element.distrito, element.nivel, element.cargo);




            });

            distritoActual = '';
            numTablas = 0;


            document.getElementById("newRow").innerHTML = `
    tr>
    <td id="distritoSelect">1.Selecciona un distrito</td>
    <td id="nivelSelect">2.Selecciona un nivel</td>
    <td id="cargoSelect">3.Selecciona un cargo</td>
    
    <td id="accionSelect">
                        <button class="buttonExtension" id="guardarSelect">Guardar</button>
                        <button type="button" class="close" id="LimpiarSeleccion">
                                    <span aria-hidden="true">×</span>
                        </button>
    </td>

    </tr>`;
            ListenerGuardarSelectJSON();
            ListenerLimpiarSeleccion();


        }


    });


}



function ListenerGuardarSelectJSON() {

    setTimeout(() => {
        //guardamos los datos de la rowsAPD al apretar guardar
        document.getElementById("guardarSelect").addEventListener("click", () => {

            try {
                //verificamos que las variables contengan valores
                if ((arrayJSONSelect.distrito == undefined) || (arrayJSONSelect.nivel == undefined) || (arrayJSONSelect.cargo == undefined)) {

                    alert("ATENCION!! los datos estan incompletos")

                } else {


                    if (arrayJSONtraido === undefined) {
                        arrayJSONenviar = [{ "distrito": arrayJSONSelect.distrito, "nivel": arrayJSONSelect.nivel, "cargo": arrayJSONSelect.cargo }];



                        chrome.storage.sync.set({ "rowsAPD": arrayJSONenviar }, function () {
                            alert("Datos almacenados correctamente");
                            console.log("rowsAPD (enviar):" + arrayJSONenviar)
                        });

                        repintarTabla();

                        console.log("traidos:" + arrayJSONtraido);
                        console.log("seleccionado:" + JSON.stringify(arrayJSONSelect));
                        console.log("enviar:" + JSON.stringify(arrayJSONenviar));

                    } else {
                        arrayJSONenviar = arrayJSONtraido.concat({ "distrito": arrayJSONSelect.distrito, "nivel": arrayJSONSelect.nivel, "cargo": arrayJSONSelect.cargo });

                        chrome.storage.sync.set({ "rowsAPD": arrayJSONenviar }, function () {
                            alert("Datos almacenados correctamente");
                            console.log("rowsAPD (enviar):" + JSON.stringify(arrayJSONenviar))
                        });

                        repintarTabla();


                        console.log("traidos:" + arrayJSONtraido);
                        console.log("seleccionado:" + JSON.stringify(arrayJSONSelect));
                        console.log("enviar:" + JSON.stringify(arrayJSONenviar));
                    }

                }


            } catch (error) {
                console.log(error)
                alert("ATENCION!!: Los datos NO fueron guardados correctamente");
                console.log("traidos:" + arrayJSONtraido);
                console.log("seleccionado:" + JSON.stringify(arrayJSONSelect));
                console.log("enviar:" + JSON.stringify(arrayJSONenviar));
            }

        })


    }, 2000)

}

function ListenerLimpiarSeleccion(){
    document.getElementById("LimpiarSeleccion").addEventListener('click',()=>{
        
        distrito = '';
        nivel = '';
        cargo = '';
        
        document.getElementById("distritoSelect").innerText="1.Selecciona un distrito";
        document.getElementById("nivelSelect").innerText="2.Selecciona un nivel";
        document.getElementById("cargoSelect").innerText="3.Selecciona un cargo";

    })
}


//2.escucha los cambios de distritos,niveles,cargos y los renderiza en el html de la extensión

//2.A) distrito:
// Selecciona el elemento que quieres observar
const distritoSelection = document.getElementById("currentDistritoSelection");

// Crea un nuevo MutationObserver
const observerDistrito = new MutationObserver(function (mutations) {

    try {

        distrito = document.getElementById("currentDistritoSelection").children[1].children[0].textContent;

        //guardamos el distrito elegido el el arrayJSONSelect
        arrayJSONSelect.distrito = distrito;
        //colocamos el distrito elegido en la tabla
        document.getElementById("distritoSelect").innerText = arrayJSONSelect.distrito;

    } catch (error) {

    }


    //DEBEMOS LLEVARL EL DATO AL APDBANNER
    //CREAMOS VARIABLES QUE CONTENGAN
});

// Configura el MutationObserver para observar los cambios en los hijos del elemento seleccionado
const config = { childList: true };
observerDistrito.observe(distritoSelection, config);



//2.B) nivel:
// Selecciona el elemento que quieres observar
const nivelSelection = document.getElementById("currentRamaSelection");

// Crea un nuevo MutationObserver
const observerNivel = new MutationObserver(function (mutations) {

    try {
        nivel = document.getElementById("currentRamaSelection").children[1].children[0].textContent;

        //guardamos el nivel elegido el el arrayJSONSelect
        arrayJSONSelect.nivel = nivel;
        //colocamos el distrito elegido en la tabla
        document.getElementById("nivelSelect").innerText = arrayJSONSelect.nivel;

    } catch (error) {

    }

    //DEBEMOS LLEVARL EL DATO AL APDBANNER
    //CREAMOS VARIABLES QUE CONTENGAN
});

// Configura el MutationObserver para observar los cambios en los hijos del elemento seleccionado

observerNivel.observe(nivelSelection, config);


//2.C) cargo:
// Selecciona el elemento que quieres observar
const cargoSelection = document.getElementById("currentCargoSelection");

// Crea un nuevo MutationObserver
const observerCargo = new MutationObserver(function (mutations) {

    try {
        cargo = document.getElementById("currentCargoSelection").children[1].children[0].textContent;

        //guardamos el nivel elegido el el arrayJSONSelect
        arrayJSONSelect.cargo = cargo;
        //colocamos el distrito elegido en la tabla
        document.getElementById("cargoSelect").innerText = arrayJSONSelect.cargo;
    } catch (error) {

    }


    //DEBEMOS LLEVARL EL DATO AL APDBANNER
    //CREAMOS VARIABLES QUE CONTENGAN
});

// Configura el MutationObserver para observar los cambios en los hijos del elemento seleccionado

observerCargo.observe(cargoSelection, config);


// código para agregar el evento onclick

//res. 2502/22]  (mg5)
//res.%202502%2F22%5D %20%20(mg5)%22&wt=json&json.wrf=jQuery351006595121222063138_1681529054852&_=1681529054866
//res.%202502%222]%20%20(mg5)%22&wt=json

//cargamos el javascript que realiza la consulta
async function consultar(dis = '', niv = '', car = '') {
    let distrito = dis.replaceAll(' ', '%20');
    let nivel = niv.replaceAll(' ', '%20');
    let cargo = car.replaceAll(' ', '%20').replaceAll('[','%5B').replaceAll('[','%5D').replaceAll('/','%2F');

    let urlFinal = consultaURL +'select?q=*%3A*&rows=6&sort=finoferta%20desc&json.nl=map&fq=descdistrito%3A%22'+ distrito + '%22&fq=descnivelmodalidad%3A%22' + nivel + '%22&fq=estado%3Apublicada&fq=cargo%3A%22' + cargo + '%22&wt=json';
    console.log("URL:"+urlFinal)
    let res = await fetch(urlFinal)
        .then(response => response.json())
        .then(data => {
            let publicado = data.response.numFound
            return publicado;
        })
    return res;
    //   .catch(error => console.error(error));
}


async function mostrarResultado(id, pintaren, color, dis, niv, car) {
    let resultado = await consultar(dis, niv, car);

    //determinamos el color de la fuente segun el valor de resultado
    if (resultado == 0) {
        //pintamos la fuente de rojo
        colorFuente = "red";


    } else {
        //pintamos la fuente de negro
        colorFuente = "black";

    }

    //si vertodobolean
    if (vertodoboolean) {

        document.getElementById(pintaren).innerHTML += `
    <tr style="background: ${color};">
            
    ${vernivelboolean ? `<td class="fuente" id="nivel" style="color:${colorFuente}">${niv}</td>` : ''}        
    
            <td>
                    <p class="cargo fuente" id="cargo" style="color:${colorFuente}">${car}</p>
                    
            </td>
            <td calss="fuente" id="estado${id}" style="color:${colorFuente}">(*)</td>

            <td id="accion">
            

            ${colorFuente=="red"?`<button class="buttonExtensionoff" id="noneoff">Ver</button>`:`<button class="buttonExtension" id="ver${id}">Ver</button>`}
            
                            <button class="buttonExtension" id="copiar${id}">Copiar</button>
                            <button class="buttonExtension" id="eliminar${id}">Eliminar</button>
            </td>
    </tr>
    `;
        {/* <button class="buttonExtension" id="ver">Ver</button> */ }

        document.getElementById("estado" + id).innerText = '(' + resultado + ')';

        colorFuente=="black" && listenerVer(id);
        listenerCopiar(id);
        listenerEliminar(id);

    } else {//si el boleano ver todo es falso
        if (resultado > 0) {

            document.getElementById(pintaren).innerHTML += `
                        <tr style="background: ${color};">
                                
                        ${vernivelboolean ? `<td class="fuente" id="nivel" style="color:${colorFuente}">${niv}</td>` : ''}        
                        
                                <td>
                                        <p class="cargo fuente" id="cargo" style="color:${colorFuente}">${car}</p>
                                        
                                </td>
                                <td calss="fuente" id="estado${id}" style="color:${colorFuente}">(*)</td>

                                <td id="accion">
                                                <button class="buttonExtension" id="ver${id}">Ver</button>
                                                <button class="buttonExtension" id="copiar${id}">Copiar</button>
                                                <button class="buttonExtension" id="eliminar${id}">Eliminar</button>
                                </td>
                        </tr>
                        `;
            {/* <button class="buttonExtension" id="ver">Ver</button> */ }

            document.getElementById("estado" + id).innerText = '(' + resultado + ')';

            listenerVer(id);
            listenerCopiar(id);
            listenerEliminar(id);

        }
    }



    function listenerVer(id) {
        setTimeout(() => {
            document.getElementById("ver" + id).addEventListener('click', function () {
                pintarJSON(arrayJSONtraido[id].distrito, arrayJSONtraido[id].nivel, arrayJSONtraido[id].cargo, 0);
                
                document.getElementsByClassName("container-fluid resultados")[0].scrollIntoView({ behavior: "smooth" });

            })
        }, 2000)
    }


    function listenerCopiar(id) {
        setTimeout(() => {
            document.getElementById("copiar" + id).addEventListener('click', function () {
                alert("copiado!")
                arrayJSONSelect.distrito = arrayJSONtraido[id].distrito;
                document.getElementById("distritoSelect").innerText = arrayJSONSelect.distrito;

                arrayJSONSelect.nivel = arrayJSONtraido[id].nivel;
                document.getElementById("nivelSelect").innerText = arrayJSONSelect.nivel;

                arrayJSONSelect.cargo = arrayJSONtraido[id].cargo;
                document.getElementById("cargoSelect").innerText = arrayJSONSelect.cargo;
            })
        }, 2000)
    }

    function listenerEliminar(id) {

        setTimeout(() => {
            //3. eliminar un elemento del array
            document.getElementById("eliminar" + id).addEventListener('click', () => {
                //preguntamos si realmente quiere eliminar los datos 
                let confirmar = confirm("realmente quieres eliminar los datos?");
                if (confirmar) {

                    try {
                        //eliminamos del array de objeto
                        arrayJSONtraido.splice(id, 1);
                        //guardamos el nuevo array en el local storage de google

                        chrome.storage.sync.set({ "rowsAPD": arrayJSONtraido }, function () {
                            alert("se elimino correctamente la fila " + (id + 1))
                            //pintamos la tabla trayendo los datos del local estorage de google
                            repintarTabla();
                        })

                    } catch (error) {
                        alert("ocurrio un error al eliminar la fila " + id)
                    }

                } else {


                }

            })

        }, 2000);
    };


}

//colocamos el contenido a el menu (información, compartir extenció a amigos (whatsapp))
document.getElementById("menu").innerHTML = `

    <button class="buttonExtension" id="vernivel"><i class="icon fa-light fa-share-from-square"></i>Ver Niveles</button>  
    <button class="buttonExtension" id="vertodo"><i class="icon fa-light fa-share-from-square"></i>Ver Todo</button>  
    <button class="buttonExtension"><i class="icon fa-light fa-share-from-square"></i>Información</button>    
    <button class="buttonExtension" onclick="window.location.href='whatsapp://send?text=Descarga%20mi%20extensión%20aquí:%20[insertar%20aquí%20la%20URL%20de%20tu%20extensión]'">Compartir</button>


  `;
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>whatsapp</title><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z" /></svg>
//<button class="buttonExtension"><i class="iconoFiltro fa-light fa-share-from-square"></i>Compartir Extención (whatsapp)</button>
//colocamos el listener para vernivel
listenerVerNivel();
listenerVerTodo();

function listenerVerTodo() {
    setTimeout(() => {
        document.getElementById("vertodo").addEventListener('click', () => {
            if (vertodoboolean) {
                vertodoboolean = false;
                document.getElementById("vertodo").innerText = 'Ver Todo';
            } else {
                vertodoboolean = true;
                document.getElementById("vertodo").innerText = 'Ver menos';
            }

            repintarTabla();
        })
    }, 2000)

}

function listenerVerNivel() {
    setTimeout(() => {
        document.getElementById("vernivel").addEventListener('click', () => {
            if (vernivelboolean) {
                vernivelboolean = false;
                document.getElementById("vernivel").innerText = '  Ver Niveles  ';
            } else {
                vernivelboolean = true;
                document.getElementById("vernivel").innerText = 'Ocultar Niveles';
            }
            repintarTabla();
        })
    }, 2000)

}

setTimeout(() => {

    document.getElementsByClassName("close")[0].click();

}, 1000);

function convertMayuscula(string) {

    var capitalizedString = string.split(' ').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');

    return capitalizedString;

}


function tarjeta(obj = {}) {

    function formatearFecha(fecha) {
        let date = new Date(fecha);

        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        };

        date.setUTCFullYear(date.getUTCFullYear());
        date.setUTCMonth(date.getUTCMonth());
        date.setUTCDate(date.getUTCDate());
        date.setUTCHours(date.getUTCHours());
        date.setUTCMinutes(date.getUTCMinutes());
        date.setUTCSeconds(date.getUTCSeconds());
        date.setUTCMilliseconds(date.getUTCMilliseconds());

        let fechaFormateada = new Intl.DateTimeFormat('es-ES', options).format(date);
        let retorno = fechaFormateada.replaceAll('00:00', '').replaceAll(',', '')
        return retorno;
    }


    let card = `
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 card-deck">
        <div class="card mb-4" data-postulated="none" data-iddetalle="${obj.iddetalle}" data-idoferta="${obj.idferta}">
        <div class="card-header">
        <div id="ofertaEncabezado${obj.iddetalle}" class="alert alert-success ofertaId${obj.idoferta}" role="alert">
         PUBLICADA
         <i data-oferta="${obj.idoferta}" data-detalle="${obj.iddetalle}" class="fas fa-list-ol" onclick="$.fn.list(this)" data-toggle="tooltip" data-placement="top" title="Listar postulados">
         </i>
         </div>
         <p class="dni">${obj.escuela}</p>
         <p class="nombreDocentelof">${obj.cargo}</p>
         <p>
         <b>CIERRE DE OFERTA: </b>
         <span class="nombreDocentelof">${formatearFecha(obj.finoferta)}</span>
         </p>
         </div>
         <div class="card-body d-flex flex-column text-secondary">
         <div class="ordenPrimeraFila">
         <div>
         <p class="detalleGrisLof">IGE</p>
         <p class="detalleNro">${obj.ige}</p>
         </div>
         <div>
         <p class="detalleGrisLof">AREA</p>
         <p class="detalleNro">${obj.areaincumbencia}</p>
         </div>
         <div>
         <p class="detalleGrisLof">NIVEL O MODALIDAD</p>
         <p class="detalleNro">${obj.descnivelmodalidad}</p>
         </div>
         </div>
         <div class="cardCuerpo">
         <div class="ordenCuerpo">
         <p>
         <i class="fas fa-layer-group">
         </i>
         <b> Nivel: </b>${obj.areaincumbencia}</p>
         </div>
         <div class="ordenCuerpo">
         <p>
         <i class="fas fa-street-view">
         </i>
         <b> Distrito: </b>${obj.descdistrito}</p>
         </div>
         <div class="ordenCuerpo">
         <p>
         <i class="fas fa-map-marker-alt">
         </i>
         <b> Domicilio: 
         </b>${obj.domiciliodesempeno}</p>
         </div
         ><div class="ordenCuerpo">
         <p>
         <i class="fas fa-briefcase">
         </i>
         <b> Área: </b>${obj.areaincumbencia}</p>
         </div>
         <div class="ordenCuerpo">
         <p>
         <i class="fas fa-briefcase">
         </i>
         <b> Dirección a cargo: </b>${obj.acargodireccion}</p>
         </div>
         <div class="ordenCuerpo">
         <p>
         <i class="fas fa-briefcase">
         </i>
         <b> Curso/División: 
         </b>${obj.cursodivision}</p>
         </div>
         <div class="ordenCuerpo">
         <p>
         <i class="fas fa-briefcase">
         </i>
         <b> Turno: </b>${obj.turno}</p>
         </div>
         <div class="ordenCuerpo">
         <p>
         <i class="fas fa-briefcase">
         </i>
         <b> Jornada: </b>${obj.jornada}</p>
         </div>
         <div class="ordenCuerpo">
         <p>
         <i class="fas fa-briefcase">
         </i>
         <b> Revista: </b>${obj.supl_revista}</p>
         </div>
         <div class="ordenCuerpo">
         <p>
         <i class="fas fa-briefcase">
         </i>
         <b> Infectocontagiosa en el Establecimiento: </b>${obj.infectocontagiosa ? 'SI' : 'NO'}</p>
         </div>
         <div class="ordenCuerpo">
         <p>
         <i class="fas fa-user-graduate">
         </i>
         <b> Toma de Posesión: </b>${formatearFecha(obj.tomaposesion)}</p>
         </div>
         <div class="ordenCuerpo">
         <p>
         <i class="fas fa-calendar-day">
         </i>
         <b> Inicio Oferta: </b>${formatearFecha(obj.iniciooferta)}</p>
         </div>
         <div class="ordenCuerpo">
         <p>
         <i class="fas fa-calendar-day">
         </i>
         <b> Desde: </b>${obj.supl_desde.includes('9999') ? '' : formatearFecha(obj.supl_desde)}</p>
         </div>
         <div class="ordenCuerpo">
         <p>
         <i class="fas fa-calendar-check">
         </i>
         <b> Hasta: </b>${obj.supl_hasta.includes('9999') ? '' : formatearFecha(obj.supl_hasta)}</p>
         </div>
${(obj.lunes != '') ? `<div class="ordenCuerpo"><p><i class="fas fa-clock"></i><b> Lunes: </b>${obj.lunes}</p></div>` : ''}
${(obj.martes != '') ? `<div class="ordenCuerpo"><p><i class="fas fa-clock"></i><b> Martes: </b>${obj.martes}</p></div>` : ''}
${(obj.miercoles != '') ? `<div class="ordenCuerpo"><p><i class="fas fa-clock"></i><b> Miercoles: </b>${obj.miercoles}</p></div>` : ''}
${(obj.jueves != '') ? `<div class="ordenCuerpo"><p><i class="fas fa-clock"></i><b> Jueves: </b>${obj.jueves}</p></div>` : ''}
${(obj.viernes != '') ? `<div class="ordenCuerpo"><p><i class="fas fa-clock"></i><b> Viernes: </b>${obj.viernes}</p></div>` : ''}
${(obj.sabado != '') ? `<div class="ordenCuerpo"><p><i class="fas fa-clock"></i><b> Sabado: </b>${obj.sabado}</p></div>` : ''}
         
         <div class="ordenCuerpo">
         <p>
         <i class="fas fa-briefcase">
         </i>
         <b> Observaciones: </b>${obj.observaciones}</p>
         </div>
         </div>
         </div>
         </div>
         </div>
        `;
    return card
}

//esto va adentro de un addeventlistener
//cargamos el javascript que realiza la consulta
//trae los datos para pintar en el dom
async function traerJSON(dis = '', niv = '', car = '',start) {
    // creamos el gif cargando
    const img = document.createElement('img');
    img.src = 'img/ajax-loader.gif';
    docs.innerHTML = '';
    docs.appendChild(img);

    //declaramos las variables
    let distrito = dis.replaceAll(' ', '%20');
    let nivel = niv.replaceAll(' ', '%20');
    let cargo = car.replaceAll(' ', '%20').replaceAll('[','%5B').replaceAll('[','%5D').replaceAll('/','%2F');


    let urlFinal = consultaURL +'select?q=*%3A*&rows=6&sort=finoferta%20desc&json.nl=map&start='+start+'&fq=descdistrito%3A%22'+ distrito + '%22&fq=descnivelmodalidad%3A%22' + nivel + '%22&fq=estado%3Apublicada&fq=cargo%3A%22' + cargo + '%22&wt=json';
    //parametros de la consulta fetch
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };

    let res = await fetch(urlFinal, requestOptions)
        .then(response => response.json())
        .then(data => {
            let publicado = data.response
            return publicado;
        })
    return res;
    //   .catch(error => console.error(error));
}


async function pintarJSON(dis, niv, car, start) {

    let docs = document.getElementById("docs");
    let carlof = '<div class="row rowCardslof"></div>'
    
    let JSON = await traerJSON(dis, niv, car,start);
    //limpiamos el docs
    docs.innerHTML=''
    //agrregamos el carlof al docs
    docs.innerHTML += carlof;
    pintarNavResultados(dis, niv, car,JSON.numFound,start);
    JSON.docs.forEach((element, index) => {
        // console.log("OBJETO " + (index + 1))
        // console.log(element)
        if (index < 3) {
            document.getElementsByClassName("row rowCardslof")[0].innerHTML += tarjeta(element);
        } else {
            docs.innerHTML += carlof;
            document.getElementsByClassName("row rowCardslof")[1].innerHTML += tarjeta(element);
        }

        // Object.entries(element).forEach(([key, value], index) => {
        //     console.log(`${index + 1}). ${key}: ${value}`);
        // });

    })

    console.log("*****************************************")
}



function pintarNavResultados(dis, niv, car,numFound,actual) {
    
    //se activa si numfound>6
    //en tal caso se imprime los primeros 6
    //se apreta el btn netx y se realiza otra consulta con
    //rows o start con num definido segun el actual
    
    let rowResultadosUP = `
  
    <div class="col">
        <hr>
        <div class="ordenLeyenda">
            <!-- <a href="">
                <p class="izq"><i class="fas fa-angle-left"></i></p>
            </a>-->
            <p class="leyendaResultados">RESULTADOS</p>
            <!--  <a href="">
                <p class="der"><i class="fas fa-angle-right"></i></p>
            </a>-->
        </div>
        <p id="pager-header-top" class="mostrando"><span>mostrando ${actual+1} a ${(actual+6)>numFound?numFound:actual+6} de ${numFound}</span></p>
        <nav aria-label="Page navigation example">
            
            <ul id="pagerTop" class="pagination justify-content-center">

                    <li class="page-item">
                        <a class="page-link" id="prevJson${actual}" rel="prevstart" ">
                            <p class="izq">
                                <i class="fas fa-angle-left">
                                </i>
                            </p>
                        </a>
                    </li>
                    
                        <li class="page-item">
                            <a class="page-link" rel="prevstart">
                                1
                            </a>
                        </li>
                    
                    <li class="page-item">
                        <a class="page-link" id="nextJson${actual}" rel="next" ">
                            <p class="der">
                                <i class="fas fa-angle-right">
                                </i>
                            </p>
                        </a>
                    </li>
            </ul>

        </nav>
    </div>

`;
function ListenernextJSON(dis, niv, car,actual,numFound,id){
document.getElementById(id+actual).addEventListener('click',()=>{
if(actual+6<numFound){
    let newActual=actual+6;
    pintarJSON(dis, niv, car,newActual);
}
})
}
function ListenerprevJSON(dis, niv, car,actual,id){
    document.getElementById(id+actual).addEventListener('click',()=>{
        if(actual-6>=0){
            let newActual=actual-6;
            pintarJSON(dis, niv, car,newActual);
        }
})
}

//pager-next
//pager-prev
document.getElementsByClassName("row RowResultados")[0].innerHTML=rowResultadosUP;

    
let rowResultadosDOWN = `
  
<div class="col">
    
    
    
    <nav aria-label="Page navigation example">
        
        <ul id="pagerTop" class="pagination justify-content-center">

                <li class="page-item">
                    <a  class="page-link" id="prevJsondown${actual}" >
                        <p class="izq">
                            <i class="fas fa-angle-left">
                            </i>
                        </p>
                    </a>
                </li>
                
                    <li class="page-item">
                        <a href="#" class="page-link" rel="prevstart">
                            1
                        </a>
                    </li>
                
                <li class="page-item">
                    <a  class="page-link" id="nextJsondown${actual}">
                        <p class="der">
                            <i class="fas fa-angle-right">
                            </i>
                        </p>
                    </a>
                </li>
        </ul>

    </nav>
    <p id="pager-header-top" class="mostrando"><span>mostrando ${actual+1} a ${(actual+6)>numFound?numFound:actual+6} de ${numFound}</span></p>
</div>

`;

document.getElementsByClassName("row RowResultadosInferior")[0].innerHTML=rowResultadosDOWN;

ListenernextJSON(dis, niv, car,actual,numFound,'nextJson');
ListenerprevJSON(dis, niv, car,actual,'prevJson');


ListenernextJSON(dis, niv, car,actual,numFound,'nextJsondown');
ListenerprevJSON(dis, niv, car,actual,'prevJsondown');
}

