const main = document.getElementById('start')
const alphaList = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'] 

alphaList.forEach((element, index) => {
    main.innerHTML += `<div class='col-1 alphabet' id='${element}'> ${element} </div>` 
});

const mysteryWordList = ['Alphabet', 'Mystery', 'React', "Rails"]

let random = Math.floor(Math.random() * mysteryWordList.length)
let answer = mysteryWordList[random].toUpperCase()
const uniqueAnswerCount = new Set(answer).size
console.log(uniqueAnswerCount);
console.log(answer);


const answerPlace = document.getElementById('answer')

for (let index = 0; index < answer.length; index++) {
    answerPlace.innerHTML += `<div class="answerUnder col-1" id="answer${index}"></div>  `
    
}


const alphabet = document.querySelectorAll('.alphabet')
const victorySound = new Audio("sounds/tada.wav")
const failSound = new Audio("sounds/fail-trombone-01.wav")
let count = 1;
let answerCount = 0;
let correctAlpha = []

alphabet.forEach(element => {
    element.addEventListener('click', event =>{
        element.style.backgroundColor = "orange"
        if(answer.includes(element.getAttribute('id'))){
            for (let index = 0; index < answer.length; index++) {
                if(answer[index]==element.getAttribute('id')){
                    let answerDiv = document.getElementById(`answer${index}`)
                    answerDiv.innerText = `${element.getAttribute('id')}`
                        if(!correctAlpha.includes(element.getAttribute('id'))){
                            correctAlpha.push(element.getAttribute('id'))
                            answerCount++
                            if(answerCount == uniqueAnswerCount){
                                victorySound.play()
                                setTimeout(
                                        () => {
                                        alert("Congrats, you won!")
                                        location.reload()
                                    },
                                    11
                                );
                        } 
                        console.log(correctAlpha);
                    console.log(answerCount);
                       
                }
             
          

               }
                
            }
        } 
        else{
            let img = document.querySelector('img')
            img.setAttribute('src',`./gallows${count}.jpg`)
            
            if(count == 6){
                failSound.play()
                setTimeout(
                    () => {
                        alert("Better luck next time...")
                        location.reload()
                    },
                    50
                  );

               
               
                
               
            }
            else{
               count++
                
            }
        }
        
    }, {once : true})
   
});

