//FIREBASE CONFIG
var config = {
    apiKey: "AIzaSyB4JmaNIheFUZwMsjTBXCnFHKQNfpRFfXA",
    authDomain: "formularios-81a40.firebaseapp.com",
    databaseURL: "https://formularios-81a40.firebaseio.com",
    storageBucket: "formularios-81a40.appspot.com",
    messagingSenderId: "793947826055"
};
firebase.initializeApp(config);
//GETTING DATA 
var Prospectos = [];
//variables de paginación
var Paginas = [];
var CodigoEntrenador = localStorage.getItem("id");
var puntero = -1;
var itemsPorPagina = 100;
var maxvalue = 0;
var generarReporte = document.getElementById('generarReporte');
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
getData();
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
        //console.log(prospecto.nombre);        
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