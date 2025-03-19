const typingText = document.querySelector(".typing-text p"),
inputField = document.querySelector(".wrapper .input-field"),
tryAgain = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistake = 0,
isTyping = 0;

function loadparagraph() 
{
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    }) 
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}

function iniTyping() 
{
    let characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];

    if(charIndex < characters.length - 1 && timeLeft >0)
    {
        if(!isTyping)
        {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null)
        {
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect"))
            {
                mistake--;
            }
            characters[charIndex].classList.remove("correct","incorrect");
        }
        else
        {
            if(characters[charIndex].innerHTML === typedChar)
            {
                characters[charIndex].classList.add("correct");
            }
            else
            {
                mistake++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        mistakeTag.innerHTML = mistake;

        let wpm = Math.round(((charIndex - mistake)/5) / (maxTime - timeLeft) * 60 );
        wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;
        
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistake;
    }
    else
    {
        clearInterval(timer);
        inputField,value = "";
    }
}

function initTimer()
{
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistake)/5) / (maxTime - timeLeft) * 60 );
        wpmTag.innerText = wpm;
    }
    else{
        clearInterval(timer);
    }
}

function resetGame(){
    loadparagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistake = isTyping = 0;
    inputField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText =0;
    mistakeTag.innerText=0;
    cpmTag.innerText =0;
}

loadparagraph();
inputField.addEventListener("input", iniTyping);
tryAgain.addEventListener("click", resetGame);