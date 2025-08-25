/*Credits to MelkorNemesis for making the regular expression checker on lines 104-111
Link to his blog article: https://melkornemesis.medium.com/prevent-unwanted-characters-in-input-f2967132decb */


//Port number input field to JS using ID values. 
let borschCounterInput= document.getElementById("borschCounter");
let varenykyCounterInput = document.getElementById("varenykyCounter");
let saloCounterInput= document.getElementById("saloCounter");
let pampushkyCounterInput = document.getElementById("pampushkyCounter");
let roshenCounterInput = document.getElementById("roshenCounter");
let zhivchikCounterInput = document.getElementById("zhivchikCounter");
let flintCounterInput = document.getElementById("flintCounter");
let crazyBeeCounterInput = document.getElementById("crazyBeeCounter");
//Port total field using same method as above
let subTotalText = document.getElementById("subTotal");
let taxText = document.getElementById("taxCost");
let totalCostText = document.getElementById("totalCost");
let borschCostTotal = document.getElementById("borschTotal");
let varenykyCostTotal = document.getElementById("varenykyTotal");
let saloCostTotal = document.getElementById("saloTotal");
let pampushkyCostTotal = document.getElementById("pampushkyTotal");
let roshenCostTotal = document.getElementById("roshenTotal");
let zhivchikCostTotal = document.getElementById("zhivchikTotal");
let flintCostTotal = document.getElementById("flintTotal");
let crazyBeeCostTotal = document.getElementById("crazyBeeTotal");
//Get regex for not allowing people to use "e",".","+", and "-"
let regex = /[e.+-]/gi;



//Arrays for more efficient calculations
const menuItems = [
    {
        name:"borsch",
        "counter-input":borschCounterInput,
        "total":borschCostTotal,
        "price":4.99
    },
    {
        name:"varenyky",
        "counter-input":varenykyCounterInput,
        "total":varenykyCostTotal,
        "price":6.99
    },
    {
        name:"salo",
        "counter-input":saloCounterInput,
        "total":saloCostTotal,
        "price":2.99
    },
    {
        name:"pampushky",
        "counter-input":pampushkyCounterInput,
        "total":pampushkyCostTotal,
        "price":7.99
    },
]
const importItems = [
    {
        name:"roshen",
        "counter-input":roshenCounterInput,
        "total": roshenCostTotal,
        "price":1.50
    },
    {
        name:"zhivchik",
        "counter-input":zhivchikCounterInput,
        "total": zhivchikCostTotal,
        "price": 3.99
    },
    {
        name:"flint",
        "counter-input":flintCounterInput,
        "total": flintCostTotal,
        "price": 1.99
    },
    {
        name:"crazyBee",
        "counter-input":crazyBeeCounterInput,
        "total": crazyBeeCostTotal,
        "price": 0.99
    },
]


//Call totalCost to start a reaction for total item cost, subtotal, and tax, alongside checking each press for the forbidden symbols.
borschCounterInput.addEventListener("keyup",totalCostCalculate);
borschCounterInput.addEventListener("keypress",regularExpressionChecker);
varenykyCounterInput.addEventListener("keyup",totalCostCalculate);
varenykyCounterInput.addEventListener("keypress",regularExpressionChecker);
saloCounterInput.addEventListener("keyup",totalCostCalculate);
saloCounterInput.addEventListener("keypress",regularExpressionChecker);
pampushkyCounterInput.addEventListener("keyup",totalCostCalculate);
pampushkyCounterInput.addEventListener("keypress",regularExpressionChecker);
roshenCounterInput.addEventListener("keyup",totalCostCalculate);
roshenCounterInput.addEventListener("keypress",regularExpressionChecker);
zhivchikCounterInput.addEventListener("keyup",totalCostCalculate);
zhivchikCounterInput.addEventListener("keypress",regularExpressionChecker);
flintCounterInput.addEventListener("keyup",totalCostCalculate);
flintCounterInput.addEventListener("keypress",regularExpressionChecker);
crazyBeeCounterInput.addEventListener("keyup",totalCostCalculate);
crazyBeeCounterInput.addEventListener("keypress",regularExpressionChecker);

//Function to prevent "+","-",".", and "e" from being pressed
function regularExpressionChecker(e){
    regex.lastIndex=0;
    if(regex.test(e.key)){
        alert(`Invalid keypress detected: '${e.key}'.`)
        e.preventDefault();
    }
}

//Functions for calculating total item cost

function calculateMenuCost(menu){
    const menuCost = menuItems[menu]["counter-input"].value*menuItems[menu]["price"];
    menuItems[menu]["total"].innerText = menuCost.toFixed(2);
    return menuCost;
}

function calculateImportCost(menu){
    if (importItems[menu]["counter-input"].value>5){
        alert("You cannot order more than 5 units per item.");
        importItems[menu]["counter-input"].value=5;
    }
    const importCost = importItems[menu]["counter-input"].value*importItems[menu]["price"];
    importItems[menu]["total"].innerText = importCost.toFixed(2);
    return importCost;
}
//Calculate subtotal, sales tax, and total cost.

function subTotalCalculate(){
    let subTotal = 0;
    //Iterate through menu items to calculate subtotal
    for (menu = 0;menu<menuItems.length;menu++){
        subTotal+=calculateMenuCost(menu);
    }
    //Iterate through import items to calculate subtotal
    for (impor = 0;impor<importItems.length;impor++){
        subTotal+=calculateImportCost(impor);
    }
    subTotalText.innerText=subTotal.toFixed(2);
    return subTotal;
}

function taxCalculate(){
    const taxRate = 0.05
    const taxCost = subTotalCalculate()*taxRate;
    taxText.innerText=taxCost.toFixed(2);
    return taxCost;
}

function totalCostCalculate(){
    const totalCost = taxCalculate()+subTotalCalculate();
    totalCostText.innerText=totalCost.toFixed(2);
    return totalCost;
}


document.querySelector('button[type="submit"]').addEventListener('click', function(e) {
    //Prevent user from submitting if they don't order anything.
    if (totalCostCalculate() === 0) {
        alert("To prevent flooding the server with empty requests, all orders must include at least one item.");
        e.preventDefault();
    } 
    //Otherwise, give confirmation if the user ordered something.
    else if (confirm("Press OK to submit your order or press Cancel to continue with this page.")) {
    
    } 
    //If they cancel, they go back to their current session.
    else{
        e.preventDefault();
    }
});