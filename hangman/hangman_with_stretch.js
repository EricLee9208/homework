const main = document.getElementById('start')
const alphaList = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'] 

alphaList.forEach((element, index) => {
    main.innerHTML += `<div class='col-1 alphabet' id='${element}'> ${element} </div>` 
});

const mysteryWordList = ['Alphabet', 'Mystery', 'React', "Rails","Coding"]

let random = Math.floor(Math.random() * mysteryWordList.length)
let answer = mysteryWordList[random].toUpperCase()
const uniqueAnswerCount = new Set(answer).size
// console.log(uniqueAnswerCount);
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
let incorrectAlpha =[]
let allAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("")
// console.log(allAlphabet);

document.addEventListener('keydown', event =>{
    // console.log(event.key.toUpperCase());
    let pressedKey = event.key.toUpperCase()
    if(allAlphabet.includes(pressedKey)){
    alphabet.forEach(element => {
        if(element.getAttribute('id') == pressedKey){
           element.style.backgroundColor = "orange"
           element.style.color = "white"
           element.style.border = "orange"
        } 
    });
        if(answer.includes(pressedKey)){
            for (let index = 0; index < answer.length; index++) {
                if(answer[index]==pressedKey){
                    let answerDiv = document.getElementById(`answer${index}`)
                    answerDiv.innerText = pressedKey
                        if(!correctAlpha.includes(pressedKey)){
                            correctAlpha.push(pressedKey)
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
                    //     console.log(correctAlpha);
                    // console.log(answerCount);     
                }
               }               
            }
        } 
        else{
            let img = document.querySelector('img')
            
            
            
                if(!incorrectAlpha.includes(pressedKey)){
                    incorrectAlpha.push(pressedKey)
                    img.setAttribute('src',`./images/gallows${count}.jpg`)
                    count++
                    // console.log(count);
                    // console.log(incorrectAlpha);
                    if(count == 7){
                        
                        failSound.play()
                        setTimeout(
                            () => {
                                alert("Better luck next time...")
                                location.reload()
                            },
                            100
                          ); 
                    }
                 }
            }
        }
    
    })

