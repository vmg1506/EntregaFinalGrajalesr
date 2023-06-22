let arr = [];
let id = 0;
let array_valores = [];
let suma_valores = 0;
let reduce = 0;

document.querySelector("input[type=submit]").addEventListener("click",function(e){
    
    e.preventDefault();
    //SE CAPTURAN LOS NODOS PRINCIPALES
    let nombre=document.querySelector("input[name=nombre]");
    //SE OBTIENEN VALORES DEL SELECT
    let lista = document.getElementById("opciones");
    let indiceSeleccionado = lista.selectedIndex;
    let opcionSeleccionada = lista.options[indiceSeleccionado];
    let textoSeleccionado = opcionSeleccionada.text;
    let valorSeleccionado = opcionSeleccionada.value;
    console.log(textoSeleccionado);
    
    let venta = document.querySelector("input[name=sale]");
    let meta = document.querySelector("input[name=meta]");
    console.log(parseInt(venta.value));
    let bono = calcular_bono(venta.value);

    // SE INICIALIZA LA VARIABLE BANDERA ID PARA QUE CADA ASESOR TENGA UN IDENTIFICADOR UNICO
    id = id + 1;
    
    console.log(bono);
    

    let comision = {valor1:venta.value * 0.05, valor2:venta.value * 0.02};
    
    arr.push(parseInt(venta.value));
    reduce = array_valores.push({identificador: id, valor:parseInt(venta.value)});
    reduce = array_valores.reduce((a, b) => a + b.valor, 0);
    
    console.log(reduce);

    console.log(array_valores);
    let total = 0;
    for(let i of arr){
      total+=i;
    }
    console.log(arr);
    console.log(total);
    document.getElementById("totalizado").innerHTML = reduce;
    let metaInt = parseInt(meta.value);
    let prueba = calculo_meta(metaInt, reduce);
    console.log(prueba);

    
    // Muestra error si los valores de nombre y venta estan vacios
    if (!nombre.value) {
        nombre.classList.add("error");
        return;
    }
    nombre.classList.remove("error");

    if(isNaN(parseInt(venta.value)) || parseInt(venta.value)<=0){
        venta.classList.add("error");
        return;
    }
    venta.classList.remove("erorr");
    
    agregarFila(id, nombre.value, opcionSeleccionada.value, venta.value, comision.valor1, comision.valor2, bono);
    agregarInput(id, nombre.value, opcionSeleccionada.value, venta.value, comision.valor1, comision.valor2, bono);
    
 
    
    venta.value = "";
    textoSeleccionado.value="";
    nombre.value="";
    nombre.focus();
 
});
 

function agregarFila(id, nombre, opcion, venta, valor1, valor2, bono) {
    
    const tr=document.createElement("tr");

    let tdId = document.createElement("td");
    let txt = document.createTextNode(id);
    tdId.appendChild(txt);
    tdId.className = "id";


    const tdNombre=document.createElement("td");
    txt=document.createTextNode(nombre);
    tdNombre.appendChild(txt);
    tdNombre.className="nombre";
 
    const tdOpcion=document.createElement("td");
    txt=document.createTextNode(opcion);
    tdOpcion.appendChild(txt);
    tdOpcion.className="left";

    let tdventa = document.createElement("td");
    txt = document.createTextNode(venta);
    tdventa.appendChild(txt);
    tdventa.className = "rigth";

    let tdcomsion = document.createElement("td");
    txt = document.createTextNode(valor1);
    tdcomsion.appendChild(txt);
    tdcomsion.className = "commision"

    let tdpropina = document.createElement("td");
    txt = document.createTextNode(valor2);
    tdpropina.appendChild(txt);
    tdpropina.className = "propina"

    let tdBono = document.createElement("td");
    txt = document.createTextNode(bono);
    tdBono.appendChild(txt);
    tdBono.className = "bono"

    let tdRemove=document.createElement("td");
    let buttonRemove=document.createElement("img");
    buttonRemove.src="../img/garbage.png";
    buttonRemove.onclick=eliminarFila;
    tdRemove.className = "borrar"
    tdRemove.appendChild(buttonRemove);
    
 
    
    tr.appendChild(tdId);
    tr.appendChild(tdNombre);
    tr.appendChild(tdOpcion);
    tr.appendChild(tdventa);
    tr.appendChild(tdcomsion);
    tr.appendChild(tdpropina);
    tr.appendChild(tdBono);
    tr.appendChild(tdRemove);
    
 
    const tbody=document.getElementById("listado").querySelector("tbody").appendChild(tr);
 
   
    document.getElementById("listado").classList.remove("hide");
}

  function calculo_meta(meta, total){
        if(total > meta){
          let texto = document.getElementById("goal");
          document.getElementById("goal").innerHTML = "Se cumple la meta con una diferencia de: ";
          let valor = document.getElementById("valor");
          document.getElementById("valor").innerHTML = total - meta;
          
        }else if(total < meta) {

          let texto = document.getElementById("goal");
          document.getElementById("goal").innerHTML = "No se cumple la meta con una diferencia de: ";
          document.getElementById("valor").innerHTML = meta - total;
          
        }
  }

  function calcular_bono(venta){
    if(venta < 15000){
      let bono = 0;
      return vale
     } else if (venta >= 15000 && venta <= 25000){
      let vale = 500
      return vale
    }else if(venta > 25000 && venta <= 35000){
      let vale = 750  
      return vale
    } else if(venta >35000){
      let vale = 1000
      return vale
    }
  }
 
  function eliminarFila(e) {
    let tr=this.closest("tr");
    let id = tr.querySelector(".id").innerText;
    let nombre=tr.querySelector(".nombre").innerText;
    let opcion = tr.querySelector(".left").innerText;
    let venta =tr.querySelector(".rigth").innerText;
    let valor1 = tr.querySelector(".commision").innerText;
    let valor2 = tr.querySelector(".propina").innerText;
    let bono = tr.querySelector(".bono").innerText;
    let vlr_total = document.querySelector("#totalizado").textContent;


    vlr_total = parseInt(vlr_total);
    let valor_a_borrar = parseInt(venta);
    let valor_id = parseInt(id);
    array_valores = array_valores.filter((item) => item.identificador !== valor_id);
    let valor_nuevo = array_valores.reduce((acumulador, actual) => acumulador + actual.valor, 0);
    document.querySelector("#totalizado").innerHTML = valor_nuevo;
    console.log(vlr_total);
    
    arr = arr.filter(i => i !== valor_a_borrar);
    console.log(array_valores);
    console.log(valor_nuevo);
    tr.remove();
    
    
    
 
    
    if (document.getElementById("listado").querySelector("tbody").querySelectorAll("tr").length==0) {
        document.getElementById("listado").classList.add("hide");
    }
}


 
/**
 * @param string nombre
 * @param string edad
 */
function agregarInput(nombre, edad) {
    const input=document.createElement("input");
    input.type="hidden";
    input.name="nombres[]";
    input.value=nombre+"-"+edad;
 
    document.querySelector("form").appendChild(input);
}

function eliminarInput(nombre, opcion){
  let input = document.querySelector("input[type=hidden][value="+nombre+"-"+opcion+"]");
  input.remove();
}



