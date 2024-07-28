const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.cont-btn');
const quizSec = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain');
const goHomeBtn = document.querySelector('.goHome');


let timeLeft = 15;
let timer;

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('time').textContent = timeLeft;
        } else {
            clearInterval(timer);
            displayCorrectAnswer();
            nextBtn.classList.add('active'); // Enable the next button when time is up
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
    document.getElementById('time').textContent = timeLeft;
    startTimer();
}

function displayCorrectAnswer() {
    let correctAnswer = questions[qnCount].answer;
    let allOptions = optList.children.length;

    for (let i = 0; i < allOptions; i++) {
        if (optList.children[i].textContent === correctAnswer) {
            optList.children[i].classList.add('incorrect');
        } else {
            optList.children[i].classList.add('disabled');
        }
    }
}


startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSec.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    shuffleQuestions();
    showqns(0);
    qnCounter(1);
    headerScore();
    resetTimer();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    shuffleQuestions();
    qnCount = 0;
    qnNumb = 1;
    userScore = 0;
    showqns(qnCount);
    qnCounter(qnNumb);
    headerScore();
    resetTimer();
}

goHomeBtn.onclick = () => {
    quizSec.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    shuffleQuestions();
    qnCount = 0;
    qnNumb = 1;
    userScore = 0;
    showqns(qnCount);
    qnCounter(qnNumb);
    headerScore();
}

let qnCount = 0;
let qnNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    clearInterval(timer);
    if (qnCount < questions.length - 1) {
        qnCount++;
        showqns(qnCount);

        qnNumb++;
        qnCounter(qnNumb);
        nextBtn.classList.remove('active');
        resetTimer();
    }
    else {
        // console.log('Questions completed');
        showResultBox();
    }
}

const optList = document.querySelector('.opt-list');

function showqns(index) {
    const qnText = document.querySelector('.qn-text');
    qnText.textContent = `${index+1}.${questions[index].question}`;

    let optTag = `<div class="opt"><span>${questions[index].options[0]}</span></div>
    <div class="opt"><span>${questions[index].options[1]}</span></div>
    <div class="opt"><span>${questions[index].options[2]}</span></div>
    <div class="opt"><span>${questions[index].options[3]}</span></div>`;

    optList.innerHTML = optTag;

    const opt = document.querySelectorAll('.opt');
    for (let i = 0; i < opt.length; i++) {
        opt[i].setAttribute('onclick', 'optionSelected(this)');
    }
    // option.forEach(opt => {
    //     opt.addEventListener('click', () => optionSelected(opt));
    // });

}

function optionSelected(answer) {
    let userAns = answer.textContent;
    let correctAnswer = questions[qnCount].answer;
    let allOptions = optList.children.length;
    if(userAns == correctAnswer){
        answer.classList.add('correct');
        userScore+=1;
        headerScore();
    }
    else{
        answer.classList.add('incorrect');

        //if the answer is wrong, show the correct answer
        for(let i=0;i<allOptions;i++){
            if(optList.children[i].textContent==correctAnswer){
                optList.children[i].setAttribute('class','opt correct');
            }
        }
    }
    //disable other options when one option is selected
    for(let i=0;i<allOptions;i++){
        optList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
}

function qnCounter(index) {
    const qnTotal = document.querySelector('.qn-tot');
    qnTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore(){
    const headerScoreText=document.querySelector('.header-score');
    headerScoreText.textContent=`Score: ${userScore} / ${questions.length}`;
}

function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    const scoreText=document.querySelector('.score-text');
    scoreText.textContent=`Your Score ${userScore} out of ${questions.length}`;

    const circleProgress=document.querySelector('.circle-progress');
    const progressValue=document.querySelector('.progress-value');
    let progressStartValue=-1;
    let progressEndValue=(userScore/questions.length)*100;
    let speed=20;

    let progress=setInterval(()=>{
        progressStartValue++;
        progressValue.textContent=`${progressStartValue}%`;
        circleProgress.style.background=`conic-gradient(blue ${progressStartValue*3.6}deg,rgba(255,255,255,0.1) 0deg)`;
        if(progressStartValue==progressEndValue){
            clearInterval(progress);
        }
    },speed);
}

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}