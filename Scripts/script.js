let inputs = document.querySelectorAll(".char");
let rows = document.querySelectorAll(".row");

let mensaje = document.getElementById("mensaje");

let respuestas = document.querySelectorAll(".answer");

const replay = document.getElementById("replay");

const word_again = document.getElementById("word-again");

const cerrar = document.getElementById("close");

replay.addEventListener("click", () => {
    window.location.reload();
})

word_again.addEventListener("click",() => {
    mensaje.classList.add("active");
    word_again.classList.remove("active");
})
cerrar.addEventListener("click",() => {
    word_again.classList.add("active");
    mensaje.classList.remove("active");
})


let intento = [];

let readTextFile = (file)=>
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                palabras = allText.split(RegExp('\r|\n'));
                arr = palabras.filter(Boolean);
                

            }
        }
    }
    rawFile.send(null);
    return arr
}


const p = readTextFile('./Scripts/palabras.txt');
palabras = p;
let palabra_adivinar = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
let palabra_letras = palabra_adivinar.split('');

respuestas.forEach((c,i) =>{
    c.value = palabra_letras[i];
})


function countLetters(word, letra) {
    let counter = {};
  
    for (let i = 0; i < word.length; i++) {
      let letter = word[i];
  
      if (!counter[letter]) {
        counter[letter] = 1;
      }
      else {
        counter[letter]++;
      }
    }

  
    return counter;
  }

  



inputs.forEach((e) => {
    e.addEventListener('keydown', (key) =>{

        if(key.key == "Backspace"){
   
            if(e.nextElementSibling){
                e.previousElementSibling.focus();
            }

            if(!e.value){
                e.previousElementSibling.focus();
                e.previousElementSibling.value='';
            }
        }
    })
    e.addEventListener("input", () =>{
        e.value=e.value.toUpperCase();
        (e.nextElementSibling && !e.nextElementSibling.value && e.value) && e.nextElementSibling.focus();
    })

});


rows.forEach((e) => {
    e.addEventListener('keyup',(key)=>{
        if(key.key=="Enter"){
            let guess = '';
            intento = [];
            e.childNodes.forEach((c) =>{
                intento.push(c.value);
                guess = intento.join('');
                
            })

            if(guess.length==5){

                e.childNodes.forEach((c) => {
                    c.disabled = true;
                    
                })

                
                e.classList.add('past');
                
                e.nextElementSibling.childNodes.forEach((c) =>{
                    c.disabled=false;
                    if(e.nextElementSibling.classList == "row"){
                    e.nextElementSibling.firstElementChild.focus();
                    }else{
                        if(guess != palabra_adivinar){
                        // Perdio
                        mensaje.classList.add("active");
                        word_again.classList.remove("active");
                        }
                    }
                    if(checkRight(palabra_letras,e)){
                        if(e.nextElementSibling){
                        e.nextElementSibling.childNodes.forEach((c) =>{
                            c.disabled=true;
                            
                        })}
                    }
                })
            }else{
                e.classList.add('error');
                setTimeout(()=>{
                    e.classList.remove('error');
                },200)
            }
        }
    })
})

function checkRight(original,usuario){

    let guess = '';
    intento = [];
    usuario.childNodes.forEach((c) =>{
        intento.push(c.value);
        guess = intento.join('');
        intento = guess.split('');   
    })


 let p = countLetters(original.join(''));

 for (let i = 0; i < original.length; i++) {
    if(intento[i] == original[i]){
        p[intento[i]]--;
        
    
            usuario.children[i].classList.add('right');
            usuario.children[i].classList.add('guess');

       
    }
    
}

for (let i = 0; i < original.length; i++) {
    if(p[intento[i]]>0){
        for (let j = 0; j < original.length; j++) {
            
            if(intento[i] == original[j]){
                if(usuario.children[i].classList.contains("right")){
                    p[intento[i]]++;
                }else{

                    p[intento[i]]--;
                }
            

                usuario.children[i].classList.add('not')
                usuario.children[i].classList.add('guess');
           

            
            break
        }
    
        
    }
    }
    
 }

 if(guess == palabra_adivinar){
    return true
 }



}
