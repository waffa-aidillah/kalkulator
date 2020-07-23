//create calculator object
const calculator= {
    displayNumber: '0',
    operator: null,
    firtNumber:null,
    waitingForSecondNumber:false
};
//menampilkan angka di display
function updateDisplay(){
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}
//fungsi clear
function clearCalculator(){
    calculator.displayNumber= '0';
    calculator.operator=null;
    calculator.firtNumber=null;
    calculator.waitingForSecondNumber=false;
}
//fungsi positif negatif
function inverseNumber(){
    if(calculator.displayNumber==='0'){
        return; //langsung keluar function
    }
    calculator.displayNumber *= -1;
    
}
//fungsi operasi matematika
function handleOperator(operator){
    if(!calculator.waitingForSecondNumber){
        calculator.operator=operator;
        calculator.waitingForSecondNumber=true;
        calculator.firtNumber = calculator.displayNumber;
    }else{
        window.alert('operator sudah ada');
    }
}
function performCalculation(){
    if(calculator.firtNumber=='0' && calculator.operator==null){
        window.alert('belum ada operator');
        return;
    }
    let result = 0;
    if(calculator.operator==='+'){
        result = (parseInt(calculator.firtNumber) + parseInt(calculator.displayNumber));
    }else{
        result = (parseInt(calculator.firtNumber) - parseInt(calculator.displayNumber));
    }
    const history = {
        firstNumber: calculator.firtNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    };
    putHistory(history);
    calculator.displayNumber =result;
    renderHistory();
}
//fungsi memasukkan digit
function inputDigit(digit){
    if(calculator.waitingForSecondNumber && (calculator.displayNumber===calculator.firtNumber)){
        calculator.displayNumber= digit;
    }
    else{
        if(calculator.displayNumber==='0'){
            calculator.displayNumber=digit;
        }else{
            calculator.displayNumber+=digit;
        }
    }
    console.log(calculator);
}
//mendapatkan button
const buttons = document.querySelectorAll('.button');

for(let button of buttons){
    button.addEventListener('click',function(event){
       
        //mendapatkan objek elemen yang diklik
        const target = event.target; //target disini adalah property dari object

        if(target.classList.contains('clear')){
            clearCalculator();
            updateDisplay();
            return;
        }
        if(target.classList.contains('negative')){
            inverseNumber();
            updateDisplay();
            return;
        }
        if(target.classList.contains('equal')){
            performCalculation();
            updateDisplay();
            return;
        }
        if(target.classList.contains('operator')){
            handleOperator(target.innerText);
            updateDisplay();
            console.log(calculator);
            return;
        }
        inputDigit(target.innerText);
        updateDisplay();
    })
}