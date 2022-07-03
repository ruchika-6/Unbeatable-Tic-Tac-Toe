const selectBox = document.querySelector(".select-box"),
xBtn = document.querySelector(".playerX"),
oBtn = document.querySelector(".playerO"),
play = document.querySelector(".play-board"),
boxes = document.querySelectorAll("section span"),
players = document.querySelectorAll(".players"),
playerX = document.querySelector(".Xturn"),
playerO = document.querySelector(".Oturn"),
resultBox = document.querySelector(".result-box"),
text = document.querySelector(".won-text"),
replay = document.querySelector(".btn");

let botSign;
let huSign;

window.onload = ()=> { //Once window is loaded
    for(let i = 0;i<boxes.length;i++)
    {
        boxes[i].setAttribute("onclick","clicked(this)"); //add onclick attribute to all section's span
    }
    xBtn.onclick = ()=>{
        selectBox.classList.add("hide");
        play.classList.add("show");
        // players.setAttribute("class","players active");
        playerX.classList.add("active");
        botSign = 'O';
        huSign = 'X'
    }
    oBtn.onclick = ()=>{
        selectBox.classList.add("hide");
        play.classList.add("show");
        // players.setAttribute("class","players active");
        playerO.classList.add("active");
        botSign = 'X';
        huSign = 'O';
    }
}

let xIcon = "fas fa-times fa-fw fa-3x";
let oIcon = "far fa-circle fa-fw fa-3x";
let flag = 0;
let player="";
//User click function
function clicked(element){
    if(flag ==0)
    {
        if(playerX.classList.contains("active")){
            player = "X";
            element.innerHTML = `<i class="${xIcon}"></i>`;
            playerX.classList.remove("active");
            element.setAttribute("id","X");
            playerO.classList.add("active");
        }
        else
        {
            player = "O";
            element.innerHTML = `<i class="${oIcon}"></i>`;
            playerO.classList.remove("active");
            playerX.classList.add("active");
            element.setAttribute("id","O");
        }
        flag = 1;
        winner(player);
        element.style.pointerEvents = "none"; // Once a box is selected then it can't be selected again
        setTimeout(()=>{
            bot();
        },1500);
    }
}

//Bot click function
function bot(){
    // let array = [];//creating empty array to store unselected box index
    let bestScore = -Infinity;
    let random = 0;
    for (let i = 0; i < boxes.length; i++) {
        if(boxes[i].childElementCount == 0)//if span has no child element
        {
            // array.push(i);
            boxes[i].setAttribute("id",`${botSign}`);
            let score = minimax(false);
            boxes[i].removeAttribute("id");
            if(score>bestScore)
            {
                bestScore = score;
                random = i;
            }
        }
    }
    // random = array[Math.floor(Math.random() * array.length)];
    if(flag == 1)
    {
        if(playerX.classList.contains("active")){
            player = "X";
            boxes[random].innerHTML = `<i class="${xIcon}"></i>`;
            playerX.classList.remove("active");
            playerO.classList.add("active");
            boxes[random].setAttribute("id","X");
        }
        else
        {
            player = "O";
            boxes[random].innerHTML = `<i class="${oIcon}"></i>`;
            playerO.classList.remove("active");
            playerX.classList.add("active");
            boxes[random].setAttribute("id","O");
        }
        winner(player);
        boxes[random].style.pointerEvents = "none";
    }
    flag = 0;
}

function getid(idname){
    return document.querySelector(".box" +idname).id;//returning id name
}

function check(val1,val2,val3,sign)
{
    if(getid(val1)==sign && getid(val2)==sign && getid(val3)==sign)
    {
        return true;
    }
}

function winner(sign){
    if(check(1,2,3,sign) || check(4,5,6,sign) || check(7,8,9,sign) || check(1,4,7,sign) || check(2,5,8,sign) || check(3,6,9,sign) || check(1,5,9,sign) || check(3,5,7,sign))
    {
        flag = 0;
        setTimeout(()=>{
            play.classList.remove("show");
            resultBox.classList.add("show");
        },700);
        text.innerHTML = `Player <strong>${sign}</strong> Won The Game!!`;
    }
    else{
        if(getid(1)!="" && getid(2)!="" && getid(3)!="" && getid(4)!="" && getid(5)!="" && getid(6)!="" && getid(7)!="" && getid(8)!="" && getid(9)!="")
        {
            flag = 0;
            setTimeout(()=>{
                play.classList.remove("show");
                resultBox.classList.add("show");
            },700);
            text.innerHTML = `The Game was Draw`;
        }
    }
}

function checkwinner(){
    let sign = 'O';
    for(let i = 0;i<2;i++)
    {
        if(check(1,2,3,sign) || check(4,5,6,sign) || check(7,8,9,sign) || check(1,4,7,sign) || check(2,5,8,sign) || check(3,6,9,sign) || check(1,5,9,sign) || check(3,5,7,sign))
        {
            if(sign == botSign)
                return 1;
            return -1;
        }
        sign = 'X';
    }
    if(getid(1)!="" && getid(2)!="" && getid(3)!="" && getid(4)!="" && getid(5)!="" && getid(6)!="" && getid(7)!="" && getid(8)!="" && getid(9)!="")
    {
        return 0;
    }
    return null;
}

function minimax(maxi){
    let score = checkwinner();
    if(score!=null)
    {
        return score;
    }
    if(maxi)
    {
        let bestScore = -Infinity;
        for (let i = 0; i < boxes.length; i++) {
            if(getid(i+1) == "")//if span has no child element
            {
                boxes[i].setAttribute("id",`${botSign}`);
                let score = minimax(false);
                boxes[i].removeAttribute("id");
                bestScore = Math.max(bestScore,score);
            }
        }
        return bestScore;
    }
    else{
        let bestScore = Infinity;
        for (let i = 0; i < boxes.length; i++) {
            if(getid(i+1) == "")//if span has no child element
            {
                boxes[i].setAttribute("id",`${huSign}`);
                let score = minimax(true);
                boxes[i].removeAttribute("id");
                bestScore = Math.min(bestScore,score);
            }
        }
        return bestScore;
    }
}

replay.onclick = ()=>{
    window.location.reload();
}