//FIREBASE CONFIG
var config = {
    apiKey: "AIzaSyB4JmaNIheFUZwMsjTBXCnFHKQNfpRFfXA",
    authDomain: "formularios-81a40.firebaseapp.com",
    databaseURL: "https://formularios-81a40.firebaseio.com",
    storageBucket: "formularios-81a40.appspot.com",
    messagingSenderId: "793947826055"
};
firebase.initializeApp(config);
//VARIABLES
var Prospectos = [];
//variables de paginaci�n
var Paginas = [];
var CodigoEntrenador = localStorage.getItem("id");
var puntero = -1;
var itemsPorPagina = 100;
var maxvalue = 0;
var generarReporte = document.getElementById('generarReporte');

document.getElementById('hideContainer').style.display = 'none'; //block
//GETTING DATA 
getData();

var date = new Date();
var month = date.getMonth();
var day = date.getDate();
var year = date.getFullYear();
var nombreArchivo = CodigoEntrenador + "_Prospectos_Registro_General_" + (day + "/" + (month + 1) + "/" + year);

var button = document.getElementById('generarReporte');
button.setAttribute("download", nombreArchivo+".xls");

generarReporte.addEventListener('click', function () {
    return ExcellentExport.excel(this, 'tablaProspectos', 'Reporte');
});
function getData() {
    var prospectosRef = firebase.database().ref('prospecto/general');
    prospectosRef.orderByChild("timestamp").on("child_added", function(snapshot) {
        var snapshotProspecto = snapshot.val();
        var prospecto = new Object();
        prospecto.nombre = snapshotProspecto.nombre;
        prospecto.celular = snapshotProspecto.celular;
        prospecto.email = snapshotProspecto.email;
        prospecto.regalo = snapshotProspecto.regalo;
        prospecto.info = snapshotProspecto.info;
        prospecto.ciudad = snapshotProspecto.ciudad;
        prospecto.pais = snapshotProspecto.pais;
        prospecto.fecha = snapshotProspecto.fecha;
        prospecto.hora = snapshotProspecto.hora;
        prospecto.codigo = snapshotProspecto.codigo;
        //Subiendo prospecto al array
        Prospectos.push(prospecto);               
    });
    prospectosRef.once('value').then(function (dataSnapshot) {
        document.getElementById('hideContainer').style.display = 'block'; //block
        console.log("listado terminado");
        maxvalue = Prospectos.length - 1;
        calcularPaginas(maxvalue);
        //cargarDatosEnTabla(1,1);//no borres estos numero me serviran para la paginacion
    });
}
function createTable(){
    // Crear un reporte de prospectos
    var table = document.getElementById('data');

    /** Datos **/
    var prospectos = firebase.database().ref('prospecto/general/');
    prospectos.on('child_added', function(data) {
        console.log(data.val());
        
    });
}
//pages
var previus = document.getElementById('previus');
var next = document.getElementById('next');
previus.addEventListener('click', function () {
    showRecordsBack();
});
next.addEventListener('click', function () {
    showRecordsNext();
});
function cargarDatosEnTabla(inicio, final) {
    var table = document.getElementById("tablaProspectos");
    
    for (i = final; i <=inicio; i++) {
        //console.log(Prospectos[i]);
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        //celda de #
        var celda_0 = row.insertCell(0);
        celda_0.innerHTML = (i + 1) + ".";
        //celda Nombre
        var celda_1 = row.insertCell(1);
        celda_1.innerHTML = Prospectos[i].nombre;
        //celda Celular
        var celda_2 = row.insertCell(2);
        celda_2.innerHTML = Prospectos[i].celular;
        //celda Email
        var celda_3 = row.insertCell(3);
        celda_3.innerHTML = Prospectos[i].email;
        //celda Regalo
        var celda_4 = row.insertCell(4);
        celda_4.innerHTML = Prospectos[i].regalo;
        //celda Informaci�n
        var celda_5 = row.insertCell(5);
        celda_5.innerHTML = Prospectos[i].info;
        //celda Ciudad
        var celda_6 = row.insertCell(6);
        celda_6.innerHTML = Prospectos[i].ciudad;
        //celda Pa�s
        var celda_7 = row.insertCell(7);
        celda_7.innerHTML = Prospectos[i].pais;
        //celda Hora Registro
        var celda_8 = row.insertCell(8);
        celda_8.innerHTML = Prospectos[i].hora;
        //celda Fecha Registro
        var celda_9 = row.insertCell(9);
        celda_9.innerHTML = Prospectos[i].fecha;
    }
}
//FUNCIONES DE PAGINACION
function calcularPaginas(numRows) {
    for (i = numRows; i >= 0 ; i -= itemsPorPagina) {
        var p = new Object();
        if ((i - itemsPorPagina) <= 0) {
            p.inicio = i;
            p.final = 0;
        } else {
            p.inicio = i;
            p.final = i - itemsPorPagina;
        }
        Paginas.push(p);
    }
    showRecordsNext();
}
function showRecordsNext() {
    if ((puntero + 1) < Paginas.length) {
        puntero++;
        console.log(Paginas[puntero].inicio + " - " + Paginas[puntero].final);
        cargarDatosEnTabla(Paginas[puntero].inicio, Paginas[puntero].final);
        console.log(puntero);
    }
}
function showRecordsBack() {
    if (puntero > 0) {
        puntero--;
        console.log(Paginas[puntero].inicio + " - " + Paginas[puntero].final);
        cargarDatosEnTabla(Paginas[puntero].inicio, Paginas[puntero].final);
        console.log(puntero);
    }
}