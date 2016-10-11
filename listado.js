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
//variables de paginación
var Paginas = [];
var CodigoEntrenador = localStorage.getItem("id");
var puntero = -1;
var itemsPorPagina = 100;
var maxvalue = 0;
var generarReporte = document.getElementById('generarReporte');

//GETTING DATA 
getData();


generarReporte.addEventListener('click', function () {
    var date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();
    var nombreArchivo = CodigoEntrenador + "_Prospectos_Registro_General_" + (day + "/" + (month + 1) + "/" + year);
    generarReporteEXCEL(Prospectos, nombreArchivo);
});
function generarReporteEXCEL(arrayProspectos, nombreArchivo) {
    console.log(nombreArchivo);
    var button = document.getElementById('buttonDescarga');
    button.setAttribute("download", nombreArchivo+".xls");

    var table = document.getElementById('data');
    for (i = 0; i < arrayProspectos.length; i++) { 
        console.log(arrayProspectos[i]);
        var row = table.insertRow(-1);

        cell = row.insertCell(-1);
        cell.innerHTML = (i + 1);

        cell = row.insertCell(-1);
        cell.innerHTML = arrayProspectos[i].nombre;

        cell = row.insertCell(-1);
        cell.innerHTML = arrayProspectos[i].celular;

        cell = row.insertCell(-1);
        cell.innerHTML = arrayProspectos[i].email;          

        cell = row.insertCell(-1);
        cell.innerHTML = arrayProspectos[i].regalo;

        cell = row.insertCell(-1);
        cell.innerHTML = arrayProspectos[i].info;

        cell = row.insertCell(-1);
        cell.innerHTML = arrayProspectos[i].ciudad;

        cell = row.insertCell(-1);
        cell.innerHTML = arrayProspectos[i].pais;

        cell = row.insertCell(-1);
        cell.innerHTML = arrayProspectos[i].fecha;
    }
}
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
        console.log("listado terminado");
        cargarDatosEnTabla(1,1);//no borres estos numero me serviran para la paginacion
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
function cargarDatosEnTabla(inicio, final) {
    var table = document.getElementById("tablaProspectos");
    
    for (i = 0; i < Prospectos.length; i++) {
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
        //celda Información
        var celda_5 = row.insertCell(5);
        celda_5.innerHTML = Prospectos[i].info;
        //celda Ciudad
        var celda_6 = row.insertCell(6);
        celda_6.innerHTML = Prospectos[i].ciudad;
        //celda País
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