
//varibel 
let data = []
//get Element
let p_cared = document.getElementById("p_cared")
let search = document.querySelector("#search") 
let cared = document.querySelectorAll(".cared")


// get data and use data
async function get_abi(){
    // get data
    let dataa = await fetch("https://restcountries.com/v3.1/all");
    data_non  = await dataa.json();

    // undifined data
    for(let k=1;k<data_non.length;k++){
        if(data_non[k]['population']==undefined){
            data_non[k]['population']=0
        }
        if(data_non[k]['capital']== undefined){
            data_non[k]['capital']= " "
        }
        if( data_non[k].altSpellings[0] == undefined){
            console.log("worek :" + k)
            data_non[k]['altSpellings'][0] = " "
        }
        if(data_non[k]['altSpellings'][1] == undefined){
            data_non[k]['altSpellings'][1] = " "
            
        } 
        if(data_non[k]['altSpellings'][2] == undefined){
            data_non[k]['altSpellings'][2] = " "
        }
    }

    // ranking by population by creaet naw array data
        //get rankink
    for(let i=0;i<data_non.length;i++){
        let j =0
        for(let k=0;k<data_non.length;k++){
        if(data_non[i]['population'] >= data_non[k]["population"]){
        j+=1
        data_non[i]["ranking"]=j
        }
    }
    }
        //creaet array data
        let m=250
    for(let i=0;i<data_non.length;i++){
        for(let k=0;k<data_non.length;k++){
        if(data_non[k]["ranking"]==m-i){
        data.push(data_non[k])
        }
        }
    }
    // GIVE ID FOR CANTRAY 
    for(let i=0;i<data.length;i++){
        data[i]["id"] = i
    }

   // console.log(data)


    //show data
    for(let i=0;i<data.length;i++){
        creaet(data,i)
    }
    
    // show data by region 
    document.querySelector("#list").addEventListener("change",()=>{
        let mame =document.querySelector("#list ").value
        document.querySelector(".ALL").innerHTML="ALL"
        p_cared.innerHTML=""
        for(let i=0;i<data.length;i++){
            if(data[i]['region'] == mame ||  mame == "ALL" ){
                    creaet(data,i)
            }
        }
            // show all data by click
            all() 
            //show all data by search
            f_search(search.value.toLowerCase()) 
    })

    // show all data by click
    all() 
}
get_abi()

function creaet(data,i){
    if(data[i]['altSpellings'][1] !== " "){
         choese(i ,data,1)
    } else if(data[i]['altSpellings'][2] !== " "){
         choese(i ,data,2)
    }else{
     choese(i ,data,0)
    }

}
function choese(i ,data,ch){
    let a = document.createElement("div") 
    a.className ='col-xs-12 col-sm-6 col-md-4 col-lg-3 vertical-center horizontally-center k '
    a.innerHTML=`<div class="cared w-xs-10" id="${data[i]['id']}" ">
    <div class="w-xs-12"><img src="${data[i]['flags']['png']}" alt=""></div>
    <div class="w-xs-12">
    <h3> - ${data[i]['altSpellings'][ch]} </h3>
    <p>Populattion :<span class="Populattion bold">${data[i]['population']}</span></p>
    <p>Ragiion :<span class="Ragiion bold">${data[i]['region']}</span></p>
    <p>Capital :<span class="Capital bold">${data[i]['capital']}</span></p>
    </div></div>`
    p_cared.appendChild(a)
    cared = document.querySelectorAll(".k")
    //console.log(cared)
}

// mode light and 
let mode = "light"
document.querySelector(".mode").addEventListener("click",function(){

    if( mode == "light"){
        
        document.querySelector(".big_c").style="background-color: hsl(209, 23%, 22%);color:hsl(0, 0%, 100%);"
        document.querySelector("header .container").style.backgroundColor="hsl(207, 26%, 17%)"
        document.querySelector("header .container").style.color="hsl(0, 0%, 100%)"
        //list stayl
        document.querySelectorAll("#list option").forEach(function(ele,index){
            ele.style.color="hsl(0, 0%, 100%)"
            ele.style.backgroundColor="hsl(200, 15%, 8%)"
        })
        mode ="dark"
        
    }else if(mode =="dark"){
        
        document.querySelector(".big_c").style="background-color: hsl(0, 0%, 98%),color:hsl(200, 15%, 8%);"
        document.querySelector("header .container").style.backgroundColor="hsl(0, 0%, 98%)"
        document.querySelector("header .container").style.color="hsl(200, 15%, 8%)"
        // list stayl
        document.querySelectorAll("#list option").forEach(function(ele,index){
            ele.style.color="hsl(200, 15%, 8%)"
            ele.style.backgroundColor="hsl(0, 0%, 100%)"
        })
        mode ="light"

    }
}) 

// search 
search.addEventListener("keyup",(ele)=>{
    //console.log(search)
    elee = ele.target.value.toLowerCase();
    f_search(elee)
})
function f_search (elee){
    //ele = search
let mame =document.querySelector("#list ").value
p_cared.innerHTML=""
//console.log(search)
let d = elee//.target.value.toLowerCase();
for(let i=0;i<data.length;i++){
    if(data[i]['region'] == mame ||  mame == "ALL"){
        if(data[i]['altSpellings'][1].toLowerCase().includes(d) || data[i]['altSpellings'][2].toLowerCase().includes(d)){
            creaet(data,i)
        }else if(data[i]['altSpellings'][0].toLowerCase().includes(d) || data[i]['capital'].includes(d)){
            creaet(data,i)
        } 
    }
    }
        // show all data by click
        all() 
    }    
    
    
// all info about cantry
function all (){
    cared = document.querySelectorAll(".cared")

    cared.forEach((ele,index)=>{
        
        ele.addEventListener("click",function(){
        let s = ele.id
        //console.log(data[s]['languages'].length)
            document.querySelector(".tools").style.display="none"
            document.querySelector(".p_cared").style.display="none"
            document.querySelector(".all_info").style.display="block"
            
            document.querySelector(".from_js").innerHTML="";
            
            let a = document.createElement("div")
            
            a.innerHTML = `<div class="col-xs-10 puch-xs-1 puch-sm-0 col-sm-6 center--xs vertical-center img-p"><img class="w-xs-10 img " src="${data[s]['flags']['png']}" alt=""></div>
        <div class="col-xs-10 col-sm-6 detailes_info" >
            <h3>${data[s]['altSpellings'][1]}</h3>
            <div class="col-xs-10 col-sm-6">
                <P>Nativ Name :<span class="bold">${data[s]['altSpellings'][1]}</span></P>
                <P>Populiation : <span class="bold">${data[s]['population']}</span></P>
                <P>Region : <span class="bold">${data[s]['region']}</span></P>
                <P>Sup Region : <span class="bold"></span></P>
                <P>Capital : <span class="bold"></span></P>
            </div>
            <div class="col-xs-10 col-sm-6">
                <P>Top Level Domain: <span class="bold"></span></P>
                <P>Curencies: <span class="bold"></span></P>
                <P>languages: <span class="bold"></span></P>
                
            </div>
            <div class="col-xs-10">
                <p>Border Coutries </p>
            </div>
            </div>`
            
            document.querySelector(".from_js").appendChild(a)
    })
    })
    
    let back = document.querySelector("button")
    back.addEventListener("click",()=>{
        document.querySelector(".tools").style.display="block"
        document.querySelector(".p_cared").style.display="flex"
        document.querySelector(".p_cared").style.display="flex"
        document.querySelector(".all_info").style.display="none"
    })
}
