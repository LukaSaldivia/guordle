let inputs = document.querySelectorAll(".char");
let rows = document.querySelectorAll(".row");

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
                
                // console.log(arr);
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

    if(letra){
        for (let i = 0; i < letra.length; i++) {
            if(!counter[letra[i]]){
            }else{
                
                counter[letra[i]]--;
            }
            
        }
    }
  
    return counter;
  }

  console.log(countLetters(palabra_adivinar));

console.log(palabra_adivinar);

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
                console.log(guess);
            })

            if(guess.length==5){

                e.childNodes.forEach((c) => {
                    c.disabled = true;
                    
                })
                // checkRight(palabra_letras,e);

                
                e.classList.add('past');
                
                e.nextElementSibling.childNodes.forEach((c) =>{
                    c.disabled=false;
                    if(e.nextElementSibling.firstElementChild){
                    e.nextElementSibling.firstElementChild.focus();
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

    console.log(intento)
 let p = countLetters(original.join(''));

 for (let i = 0; i < original.length; i++) {
    if(intento[i] == original[i]){
        // p[intento[i]]--;
        console.log(p);
        setInterval(()=>{
            usuario.children[i].classList.add('right');
            usuario.children[i].classList.add('guess');

        },i*120)
    }
    
}

for (let i = 0; i < original.length; i++) {
    if(p[intento[i]]>0){
        for (let j = 0; j < original.length; j++) {
            
            if(intento[i] == original[j]){
                // console.log(intento[i]+ ' ' + original[j]);
                p[intento[i]]--;
                setInterval(()=>{

                usuario.children[i].classList.add('not')
                usuario.children[i].classList.add('guess');
            },i*120)

            console.log(p);
            break
        }
    
        
    }
    }
    
 }

 if(guess == palabra_adivinar){
    return true
 }



}
