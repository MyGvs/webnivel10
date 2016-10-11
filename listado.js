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
}
getData();
function getData() {
    var prospectosRef = firebase.database().ref('prospecto/lunes');
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