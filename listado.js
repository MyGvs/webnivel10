//variables etc
var codigos = [];
var nombres = [];
var emails = [];
var registered = true;
var randomAsesor = 0;
document.getElementById('registro').style.display = 'none'; //block
document.getElementById('registrado').style.display = 'none';
document.getElementById('timeError').style.display = 'none'; 

//var obtenerCodigo = document.getElementById('obtenerCodigo');
var myInput = document.getElementById('inputCodigo');

/*obtenerCodigo.addEventListener('click', function () {
    contarASsesor();
});*/
//FundcionesObtener Código
/*function contarASsesor() {
    var c = 0;
    codigos = [];
    nombres = [];
    emails = [];
    var ref = new Firebase("https://n10.firebaseio.com/asesor");
    ref.on('child_added', function (snapshot) {
        var asesor = snapshot.val();
        var nombreAsesor = asesor.firstName + " " + asesor.lastName;
        emails.push(asesor.email);
        nombres.push(nombreAsesor);
        codigos.push(asesor.memberID);
        c++;
    });
    ref.once('value', function (snapshot) {
        //Aqui se recibe el codigo obtenido
        var rand = randomIntFromInterval(0, c);
        randomAsesor = rand;
        document.getElementById('inputCodigo').value = codigos[rand];
        //console.log(rand);
        document.getElementById('registro').style.display = 'block';
    });
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}*/
//Fundciones Validar Código
function validarCodigo(codigoIngresado) {
    if (codigoIngresado != "") {
        var ref = new Firebase("https://n10.firebaseio.com/asesor");
        var valido = false;
        ref.orderByChild("memberID").equalTo(codigoIngresado.replace(/\s/g, '')).on("child_added", function (snapshot) {
            valido = true;
        });
        ref.once('value', function (snapshot) {
            //Aqui se verifica True: existe el codigo, False: no existe el codigo
            if (valido) {
                document.getElementById('registro').style.display = 'block';
            } else {
                document.getElementById('registro').style.display = 'none';
            }
        });
    } else {
        document.getElementById('registro').style.display = 'none';
    }
}
function attachTextListener(input, func) {
    if (window.addEventListener) {
        input.addEventListener('input', func, false);
    } else
        input.attachEvent('onpropertychange', function () {
            func.call(input);
        });
}
attachTextListener(myInput, function () {
    // Check and manipulate this.value here
    validarCodigo(this.value);
    var converted = this.value.toUpperCase();
    document.getElementById('inputCodigo').value = converted;
});
function register() {    
    var nombre = document.getElementById("inputNombre");
    var email = document.getElementById("inputEmail");
    var celular = document.getElementById("inputCelular");
    var ciudad = document.getElementById("inputCiudad");
    var pais = document.getElementById("inputPais");
    var codigo = document.getElementById("inputCodigo");
    var regalo = document.getElementById("inputRegalo");
    var info = document.getElementById("inputInformacion");
    var date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();    
    if (nombre.value != "" && email.value != "" && celular.value != "" && ciudad.value != "" && pais.value != "" && codigo.value != "" && regalo.value != "" && info.value != "" && validateEmail("inputEmail") && registered) {
        //bloqueando boton
        registered = false;
        document.getElementById('registro').disabled = true;
        console.log("disabled");
        //document.getElementById('registro').innerHTML = "Registrando...";
        //logs
        /*console.log(nombre.value + "-" + email.value + "-" + celular.value + "-" + ciudad.value + "-" + pais.value + "-" + codigo.value);
        console.log((month + 1) + "-" + day + "-" + year);
        console.log(hour + "-" + minute);*/
        //enviar email
        localStorage.setItem("ususario", nombre.value);
        localStorage.setItem("asesor", nombres[randomAsesor]);
        localStorage.setItem("codigo", codigos[randomAsesor]);                
        //writing data to firebase
        var prospectoRef = firebase.database().ref('prospecto/general').push();
        prospectoRef.set({
            nombre: nombre.value,
            email: email.value,
            celular: celular.value,
            ciudad: ciudad.value,
            pais: pais.value,
            regalo: regalo.value,
            info: info.value,
            codigo: codigo.value,            
            fecha: (year + "/" + (month + 1) + "/" + day),
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            hora: (hour + ":" + minute)
        }).then(function () {
            document.getElementById('registrado').style.display = 'block';
            openInNewTab("registroExitoso.html");
        })
        .catch(function (error) {
            console.log("Set fallido: " + error.message);
        });
    } else {
        console.log("there are no values.");
    }
}
function validateEmail(id) {
    var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!email_regex.test($("#" + id).val())) {      
        return false;
    }
    else {
        return true;
    }
}
function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}