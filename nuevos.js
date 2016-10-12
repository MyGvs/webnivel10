var CodigoEntrenador = localStorage.getItem("id");
contarNuevos();
function contarNuevos() {
    console.log("listando: " + localStorage.getItem("id"));
    var count_general = 0;
    var count_lunes = 0;
    var count_jueves = 0;
    var generalRef = firebase.database().ref('prospecto/general');
    generalRef.orderByChild("codigo").equalTo(CodigoEntrenador).on("child_added", function (snapshot) {
        if (snapshot.val().visto == 0) {
            count_general++;
        }
    });
    generalRef.once('value').then(function (dataSnapshot) {
        if (count_general ==0) {
            document.getElementById('reporteGeneral').innerHTML = "Registro general";
        } else {
            document.getElementById('reporteGeneral').innerHTML = "Registro general <span class='badge'>" + count_general + "</span>";
        }        
    });
    var lunesRef = firebase.database().ref('prospecto/lunes');
    lunesRef.orderByChild("codigo").equalTo(CodigoEntrenador).on("child_added", function (snapshot) {
        if (snapshot.val().visto == 0) {
            count_lunes++;
        }
    });
    lunesRef.once('value').then(function (dataSnapshot) {
        if (count_lunes == 0) {
            document.getElementById('reporteLunes').innerHTML = "Registro seminarios (Lunes)";
        } else {
            document.getElementById('reporteLunes').innerHTML = "Registro seminarios (Lunes) <span class='badge'>" + count_lunes + "</span>";
        }        
    });
    var juevesRef = firebase.database().ref('prospecto/jueves');
    juevesRef.orderByChild("codigo").equalTo(CodigoEntrenador).on("child_added", function (snapshot) {
        if (snapshot.val().visto == 0) {
            count_jueves++;
        }
    });
    juevesRef.once('value').then(function (dataSnapshot) {
        if (count_jueves == 0) {
            document.getElementById('reporteJueves').innerHTML = "Registro seminarios (Jueves)";
        } else {
            document.getElementById('reporteJueves').innerHTML = "Registro seminarios (Jueves) <span class='badge'>" + count_jueves + "</span>";
        }
    });
}