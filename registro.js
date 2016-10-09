
function getDatabase() {
    return "https://n10.firebaseio.com/";
}
function extraerDatos(emailO, passO) {
    var userRef = new Firebase("https://n10.firebaseio.com/admin/");
    userRef.on("child_added", function (snapshot, prevChildKey) {
        var id = snapshot.key();
        var adm = snapshot.val();
        if (adm.email == emailO && adm.pass == passO) {
            localStorage.setItem("nombre", adm.nombre);
            localStorage.setItem("userID", id);
            localStorage.setItem("email", adm.email);
            window.location.assign("panelDeControl.html");
        }else {
            document.getElementById('errorLabel').innerHTML = "Error: Usted no es Administrador.";
        }
    });
}