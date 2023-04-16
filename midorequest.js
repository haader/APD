console.log("****responHeader****");
console.log(JSON.stringify(this.Manager.response.responseHeader.params))
console.log("********************");
console.log("****Self****");
console.log(JSON.stringify(self.Manager.response.responseHeader.params))
console.log("********************");
//&json.wrf=jQuery351021467401652290485_1681249256838&_=1681249256920'
let miurl='q=*%3A*&rows=6&sort=finoferta%20desc&json.nl=map&fq=descdistrito%3A%22almirante%20brown%22&fq=estado%3Apublicada&wt=json';

function ques(miurl){

console.log(this.Manager.response.response);

                var manager = new AjaxSolr.Manager();

            console.log("URL:"+Manager.solrUrl)
            //https://servicios3.abc.gob.ar/valoracion.docente/api/apd.oferta.encabezado/
            manager.solrUrl = Manager.solrUrl;
            manager.executeRequest('/select', miurl, (data)=>{
                
                data==undefined?console.log("DATA VACIA"):console.log("-asignamos el valor a response");this.Manager.response.response=data;
                console.log("***imprimimos this respose")
                console.log(this.Manager.response.response)
                console.log("*************************")

                //realizamos la consulta
                var widget = new AjaxSolr.ResultWidget();
                widget.afterRequest(this);
                
                

            },null,null);

}
ques(miurl);

//realizamos la consulta
var widget = new AjaxSolr.ResultWidget();
widget.afterRequest();


// gif cargando
const img = document.createElement('img');

img.src = 'img/ajax-loader.gif';
document.getElementById("docs").innerHTML = '';
document.getElementById("docs").appendChild(img);