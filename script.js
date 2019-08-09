'use strict'
let money = prompt("Ваш бюджет на месяц?");
let time = prompt("Введите дату в формате YYYY-MM-DD");

let appData = {
    moneyObject: money,
    timeObject: time,
    expenses: {}
};

let question = prompt("Введите обязательную статью расходов в єтом месяце?");
let ansew1 = prompt("Во сколько обойдется?");

let question2 = prompt("Введите обязательную статью расходов в єтом месяце?");
let ansew2 = prompt("Во сколько обойдется?");

appData.expenses[question] = Number(ansew1);
appData.expenses[question2] = Number(ansew2);

let optionalExpenses = {

};

let income = [];

let b = (Number(ansew1) + Number(ansew2)); // 3050

let b2 = b + Number(appData.moneyObject); //1000305

let budget = b2 / 30;

alert(budget)

