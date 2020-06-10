'use strict';

/* ------------------------------- June 8 Lab PLAN

Objects with properties:
- shop name (location)
- min hourly customers
- max hourly customers
- avg cookies per customer

- Use a method of that object to generate a random numer of customers per hour

- Calculate and store simulated amounts of cookies purchased for each hour at each location using avg cookies purchased and random number of customers generated

- store results for each location in separate array, maybe as property of the object representing location

- display values of each array as unordered lists in browser

- calculating the sum of these hourly totals, output should look like list example in lab

*************NEED TO FIGURE OUT HOW TO GET TOTAL ON THERE

- display lists on sales.html

- MAKE SURE EACH LOCATION IS ITS OWN JAVASCRIPT OBJECT

ul
  li- shop location name
  li- min hourly cutomers
  li- max hourly customers
  - avg cookies per customer

*/


// -------------------------------- June 9 lab plan
// pull functions out of objects and make global
// turn object literals into constructor functions


//--------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------- GLOBAL VARS AND FUNCTIONS----
//--------------------------------------------------------------------------------------------------

var totalOpenHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'];

// debugger;
// var hoursTargetToTable = document.getElementById('cookie-table');

// var hoursCreateRowInTable = document.createElement('tr');
// var hoursCreateCellInTable = document.createElement('td');
// var hoursTextToTable = document.createTextNode('6am');

// hoursCreateCellInTable.appendChild(hoursTextToTable);
// hoursCreateRowInTable.appendChild(hoursCreateCellInTable);
// hoursTargetToTable.appendChild(hoursCreateRowInTable);


//--------------------------------------- Function randomizer

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function mathRandomizer(min, max) {
  // min = Math.ceil(min);
  // max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//--------------------------------------- Function to randomize customers per hour

function calculateRandomNumCustomers(){
  // debugger;
  // console.log('minNumCustomer', minNumCustomer);
  // console.log(this);
  var numCustomers = mathRandomizer(this.minNumCustomer, this.maxNumCustomer);
  // console.log('Hourly customers random: '. numCustomers);
  return numCustomers;
}

//--------------------------------------- Function to calculate hourly cookie sales

function calculateHourlyCookieSales(){
  // debugger;
  for (var i = 0; i < totalOpenHours.length; i++){
    var totalHourlySales = Math.round(this.calculateRandomNumCustomers() * this.avgNumCookies);
    this.dailyStoreSales.push(totalHourlySales);
  }
}

//--------------------------------------- Function to find the sum of an array

//https://codeburst.io/javascript-arrays-finding-the-minimum-maximum-sum-average-values-f02f1b0ce332
// also with lots of help from classmate Chandler Puckett
// debugger;
function arrSum(arr){
  return arr.reduce(function(a,b){
    return a + b;
  }, 0);
}

//---------------------------------------- Function to render hourly totals to page

function renderHourTotalsToPage(){
  var parentLocationHourlySales = document.getElementById(this.unorderedListId);
  for (var i = 0; i < totalOpenHours.length; i++ ){
    var newLocations = document.createElement('li');
    newLocations.textContent = totalOpenHours[i] + ': ' + this.dailyStoreSales[i] + ' cookies';
    parentLocationHourlySales.appendChild(newLocations);
  }
}

//---------------------------------------- Function to find the sum of location's hourly sales and render

function calculateDailyTotalCookieSales(){
  // debugger;
  var cookieTotal = arrSum(this.dailyStoreSales);
  var totalCookieList = document.getElementById(this.unorderedListId);
  var totalCookieItemInList = document.createElement('li');
  totalCookieItemInList.textContent = ('Total: ' + cookieTotal + ' cookies');
  totalCookieList.appendChild(totalCookieItemInList);
}

//---------------------------------------- Function to render name to page

function renderNameToPage(){
  var pName = document.getElementById(this.nameId);
  pName.textContent = this.branchName;
}

//---------------------------------------- Function to render location names to table

// function renderToTable(){
//   var table = document.getElementById('cookie-table'); //telling it to find the table with id cookie-table
//   var tableRow = document.createElement('tr'); //creating a table row element
//   var tableCell = document.createElement('td'); //creating a table cell element

//   tableCell.textContent = this.branchName;
//   tableRow.appendChild(tableCell);
//   table.appendChild(tableRow);

// }

//----------------------------------------- Function to get heading on table

function createTableHeader(){
  var tableHeader = document.getElementById('cookie-table');
  var tableHeaderRow = document.createElement('tr');
  var singleStoreHeading = document.createElement('th');
  singleStoreHeading.textContent = 'Store';
  tableHeaderRow.appendChild(singleStoreHeading);

  for (var i = 0; i < totalOpenHours.length; i++){
    var openHoursHeader = document.createElement('th');
    openHoursHeader.textContent = totalOpenHours[i];
    tableHeaderRow.appendChild(openHoursHeader);
  }

  var dailyLocationTotal = document.createElement('th');
  dailyLocationTotal.textContent = 'Daily Location Total';
  tableHeaderRow.appendChild(dailyLocationTotal);

  tableHeader.appendChild(tableHeaderRow);
}

//------------------------------------------- Function to get store sales into table


function renderStoreInfoToTable(){
  var table = document.getElementById('cookie-table');
  var tableRow = document.createElement('tr');
  var tableCell = document.createElement('th');

  tableCell.textContent = this.branchName;
  tableRow.appendChild(tableCell);

  for (var i = 0; i < this.dailyStoreSales.length; i++){
    tableCell = document.createElement('td');
    tableCell.textContent = this.dailyStoreSales[i];
    tableRow.appendChild(tableCell);
  }
  table.appendChild(tableRow);
}



//------------------------------------------------------------------------------------------
//------------------------------------------------------------------ CONSTRUCTOR FUNCTION---
//------------------------------------------------------------------------------------------

function SalmonCookies(branchName, minNumCustomer, maxNumCustomer, avgNumCookies, unorderedListId, nameId){
  this.branchName = branchName;
  this.minNumCustomer = minNumCustomer;
  this.maxNumCustomer = maxNumCustomer;
  this.avgNumCookies = avgNumCookies;
  this.unorderedListId = unorderedListId;
  this.nameId = nameId;
  // debugger;
  this.dailyStoreSales = [];
}

SalmonCookies.prototype.calculateRandomNumCustomers = calculateRandomNumCustomers;

SalmonCookies.prototype.calculateHourlyCookieSales = calculateHourlyCookieSales;

SalmonCookies.prototype.calculateDailyTotalCookieSales = calculateDailyTotalCookieSales;

SalmonCookies.prototype.renderHourTotalsToPage = renderHourTotalsToPage;

SalmonCookies.prototype.renderNameToPage = renderNameToPage;

// SalmonCookies.prototype.renderToTable = renderToTable;

SalmonCookies.prototype.renderStoreInfoToTable = renderStoreInfoToTable;

//------------------------------------------------------------------------------------------
//----------------------------------------------------- NEW INSTANCES ----------------------
//------------------------------------------------------------------------------------------

createTableHeader();


var seattleStore = new SalmonCookies('Seattle', 23, 65, 6.3, 'seattle-hours', 'seattle');

seattleStore.renderNameToPage();
seattleStore.calculateRandomNumCustomers();
seattleStore.calculateHourlyCookieSales();
seattleStore.renderHourTotalsToPage();
seattleStore.calculateDailyTotalCookieSales();
// seattleStore.renderToTable();
seattleStore.renderStoreInfoToTable();

var tokyoStore = new SalmonCookies('Tokyo', 3, 24, 1.2, 'tokyo-hours', 'tokyo');

tokyoStore.renderNameToPage();
tokyoStore.calculateRandomNumCustomers();
tokyoStore.calculateHourlyCookieSales();
tokyoStore.renderHourTotalsToPage();
tokyoStore.calculateDailyTotalCookieSales();
// tokyoStore.renderToTable();
tokyoStore.renderStoreInfoToTable();

var dubaiStore = new SalmonCookies('Dubai', 11, 28, 3.7, 'dubai-hours', 'dubai');

dubaiStore.renderNameToPage();
dubaiStore.calculateRandomNumCustomers();
dubaiStore.calculateHourlyCookieSales();
dubaiStore.renderHourTotalsToPage();
dubaiStore.calculateDailyTotalCookieSales();
// dubaiStore.renderToTable();
dubaiStore.renderStoreInfoToTable();

var parisStore = new SalmonCookies('Paris', 20, 38, 2.3, 'paris-hours', 'paris');

parisStore.renderNameToPage();
parisStore.calculateRandomNumCustomers();
parisStore.calculateHourlyCookieSales();
parisStore.renderHourTotalsToPage();
parisStore.calculateDailyTotalCookieSales();
// parisStore.renderToTable();
parisStore.renderStoreInfoToTable();

var limaStore = new SalmonCookies('Lima', 2, 16, 4.6, 'lima-hours', 'lima');

limaStore.renderNameToPage();
limaStore.calculateRandomNumCustomers();
limaStore.calculateHourlyCookieSales();
limaStore.renderHourTotalsToPage();
limaStore.calculateDailyTotalCookieSales();
// limaStore.renderToTable();
limaStore.renderStoreInfoToTable();


//-------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------OBJECT LITERALS-------------
//-------------------------------------------------------------------------------------------------

// var seattleCookies = {
//   branchName : 'Seattle',
//   minNumCustomers : 23,
//   maxNumCustomers : 65,
//   avgNumCookies : 6.3,
//   dailyStoreSales : [] ,

// renderNameToPage: function(){
//   var pName = document.getElementById('seattle'); //target an element
//   pName.textContent = this.branchName; //this gives the element content
//   // didn't need to create new element because its going into p element that already exists, so dont need to appendChild either
// },

// calculateHourlyCookieSales : function(){
//   for (var i = 0; i < totalOpenHours.length; i++){
//     var randomNumber = getRandomNumCustomers(this.minNumCustomers, this.maxNumCustomers); //creates random number of customers
//     //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
//     var totalHourlySales = Math.round(randomNumber * this.avgNumCookies); //makes sales per hour and rounds number
//     this.dailyStoreSales.push(totalHourlySales); //insert each hour's sales into array
//   }
// },

// calculateDailyTotalCookieSales : function(){
//   var cookieTotal = arrSum(this.dailyStoreSales); //uses global function to tal each hour's sales
//   var totalCookieList = document.getElementById('seattle-hours'); //targets element to put it in
//   var totalCookieItemInList = document.createElement('li'); //creates new element to put it in
//   totalCookieItemInList.textContent = ('Total: ' + cookieTotal + ' cookies'); //creates the content concantenation
//   totalCookieList.appendChild(totalCookieItemInList); //appends the content into the list
// },

//   renderHourTotalsToPage: function(){
//     var parentLocationHourlySales = document.getElementById('seattle-hours'); //targest the place to put these list items
//     for (var i = 0; i < totalOpenHours.length; i++ ){ //for loop to go through each hour of the open time range
//       var newLocations = document.createElement('li'); //creates new li for each result
//       newLocations.textContent = totalOpenHours[i] + ': ' + this.dailyStoreSales[i] + ' cookies'; //creates content for total sales per hour
//       parentLocationHourlySales.appendChild(newLocations); //appends each list item to the place i already told it to target
//     }
//   },

// };

// seattleCookies.calculateHourlyCookieSales();
// seattleCookies.renderNameToPage();
// seattleCookies.renderHourTotalsToPage();
// seattleCookies.calculateDailyTotalCookieSales();






//---------------------------------------------------------------------- TOKYO LOCATION OBJECT

// var tokyoCookies = {
//   name : 'Tokyo',
//   minNumCustomers : 3,
//   maxNumCustomers : 24,
//   avgNumCookies : 1.2,
//   dailyTokyoSales : [],

//   renderTokyoNameToPage : function(){
//     var parentLocationNameTokyo = document.getElementById('tokyo');
//     var newHeadingTokyo = document.createElement('p');
//     newHeadingTokyo.textContent = this.name;
//     parentLocationNameTokyo.appendChild(newHeadingTokyo);
//   },

//   calculateTokyoHourlyCookieSales : function(){

//     for (var i = 0; i < totalOpenHours.length; i++){
//       var randomNumber = getRandomNumCustomers(this.minNumCustomers, this.maxNumCustomers);
//       var totalHourlySalesTokyo = Math.round(randomNumber * this.avgNumCookies);
//       this.dailyTokyoSales.push(totalHourlySalesTokyo);
//     }
//   },

//   calculateDailyTokyoCookieSales : function(){
//     var tokyoCookieTotal = arrSum(this.dailyTokyoSales);
//     var tokyoTotalCookieList = document.getElementById('tokyo-hours');
//     var tokyoTotalCookieItemInList = document.createElement('li');
//     tokyoTotalCookieItemInList.textContent = ('Total: ' + tokyoCookieTotal + ' cookies');
//     tokyoTotalCookieList.appendChild(tokyoTotalCookieItemInList);
//   },

//   renderTokyoHourTotalToPage : function(){
//     var parentTokyoLocationHourlySales = document.getElementById('tokyo-hours');
//     for (var i = 0; i < totalOpenHours.length; i++){
//       var tokyoLocationListItem = document.createElement('li');
//       tokyoLocationListItem.textContent = totalOpenHours[i] + ': ' + this.dailyTokyoSales[i] + ' cookies';
//       parentTokyoLocationHourlySales.appendChild(tokyoLocationListItem);
//     }
//   },


// };

// tokyoCookies.calculateTokyoHourlyCookieSales();
// tokyoCookies.renderTokyoNameToPage();
// tokyoCookies.renderTokyoHourTotalToPage();
// tokyoCookies.calculateDailyTokyoCookieSales();

// //----------------------------------------------------------------------------- DUBAI LOCATION OBJECT

// var dubaiCookies = {
//   name : "Dubai",
//   minNumCustomers: 11,
//   maxNumCustomers: 38,
//   avgNumCookies: 3.7,
//   dailyDubaiSales: [],

//   renderDubaiNameToPage : function(){
//     var parentLocationNameDubai = document.getElementById('dubai');
//     var newParagraphDubai = document.createElement('p');
//     newParagraphDubai.textContent = this.name;
//     parentLocationNameDubai.appendChild(newParagraphDubai);
//   },

//   calculateDubaiHourlyCookieSales : function(){
//     for (var i = 0; i < totalOpenHours.length; i++){
//       var randomNumber = getRandomNumCustomers(this.minNumCustomers, this.maxNumCustomers);
//       var totalHourlySalesDubai = Math.round(randomNumber * this.avgNumCookies);
//       this.dailyDubaiSales.push(totalHourlySalesDubai);
//     }
//   },

//   calculateDailyDubaiCookieSales : function(){
//     var dubaiCookieTotal = arrSum(this.dailyDubaiSales);
//     var dubaiTotalCookieList = document.getElementById('dubai-hours');
//     var dubaiTotalCookieListItem = document.createElement('li');
//     dubaiTotalCookieListItem.textContent = ('Total: ' + dubaiCookieTotal + ' cookies');
//     dubaiTotalCookieList.appendChild(dubaiTotalCookieListItem);
//   },

//   renderDubaiHourTotalsToPage : function(){
//     var parentDubaiLocationHourSales = document.getElementById('dubai-hours');
//     for (var i = 0; i < totalOpenHours.length; i++){
//       var dubaiLocationListItem = document.createElement('li');
//       dubaiLocationListItem.textContent = totalOpenHours[i] + ': ' + this.dailyDubaiSales[i] + ' cookies';
//       parentDubaiLocationHourSales.appendChild(dubaiLocationListItem);
//     };
//   },
// };

// dubaiCookies.renderDubaiNameToPage();
// dubaiCookies.calculateDubaiHourlyCookieSales();
// dubaiCookies.renderDubaiHourTotalsToPage();
// dubaiCookies.calculateDailyDubaiCookieSales();



// //----------------------------------------------------------------------------- PARIS LOCATION OBJECT

// var parisCookies = {
//   name : "Paris",
//   minNumCustomers: 20,
//   maxNumCustomers: 38,
//   avgNumCookies: 2.3,
//   dailyParisSales: [],

//   renderParisNameToPage : function(){
//     var parentLocationNameParis = document.getElementById('paris');
//     var newParagraphParis = document.createElement('p');
//     newParagraphParis.textContent = this.name;
//     parentLocationNameParis.appendChild(newParagraphParis);
//   },

//   calculateParisHourlySales : function(){
//     for (var i = 0; i < totalOpenHours.length; i++){
//       var randomNumber = getRandomNumCustomers(this.minNumCustomers, this.maxNumCustomers);
//       var totalHourlySalesParis = Math.round(randomNumber * this.avgNumCookies);
//       this.dailyParisSales.push(totalHourlySalesParis);
//     }
//   },

//   calculateDailyParisCookieSales : function(){
//     var parisCookieTotal = arrSum(this.dailyParisSales);
//     var parisTotalCookieList = document.getElementById('paris-hours');
//     var parisTotalCookieListItem = document.createElement('li');
//     parisTotalCookieListItem.textContent = ('Total: ' + parisCookieTotal + ' cookies');
//     parisTotalCookieList.appendChild(parisTotalCookieListItem);
//   },

//   renderParisHourTotalsToPage : function(){
//     var parentParisLocationHourSales = document.getElementById('paris-hours');
//     for (var i = 0; i < totalOpenHours.length; i++){
//       var parisLocationListItem = document.createElement('li');
//       parisLocationListItem.textContent = totalOpenHours[i] + ': ' + this.dailyParisSales[i] + ' cookies';
//       parentParisLocationHourSales.appendChild(parisLocationListItem);
//     }
//   },
// }



// parisCookies.renderParisNameToPage();
// parisCookies.calculateParisHourlySales();
// parisCookies.renderParisHourTotalsToPage();
// parisCookies.calculateDailyParisCookieSales();






// //----------------------------------------------------------------------------- LIMA LOCATION OBJECT

// var limaCookies = {
//   name : "Lima",
//   minNumCustomers: 2,
//   maxNumCustomers: 16,
//   avgNumCookies: 4.6,
//   dailyLimaSales: [],

//   renderLimaNameToPage : function(){
//     var parentLocationNameLima = document.getElementById('lima');
//     var newParagraphLima = document.createElement('p');
//     newParagraphLima.textContent = this.name;
//     parentLocationNameLima.appendChild(newParagraphLima);
//   },

//   calculateLimaHourlySales : function(){
//     for (var i = 0; i < totalOpenHours.length; i++){
//       var randomNumber = getRandomNumCustomers(this.minNumCustomers, this.maxNumCustomers);
//       var totalHourlySalesLima = Math.round(randomNumber * this.avgNumCookies);
//       this.dailyLimaSales.push(totalHourlySalesLima);
//     }
//   },

//   calculateDailyLimaCookieSales : function(){
//     var limaCookieTotal = arrSum(this.dailyLimaSales);
//     var limaTotalCookieList = document.getElementById('lima-hours');
//     var limaTotalCookieListItem = document.createElement('li');
//     limaTotalCookieListItem.textContent = ('Total: ' + limaCookieTotal + ' cookies');
//     limaTotalCookieList.appendChild(limaTotalCookieListItem);
//   },

//   renderLimaHourTotalsToPage : function(){
//     var parentLimaLocationHourSales = document.getElementById('lima-hours');
//     for (var i = 0; i < totalOpenHours.length; i++){
//       var limaLocationListItem = document.createElement('li');
//       limaLocationListItem.textContent = totalOpenHours[i] + ': ' + this.dailyLimaSales[i] + ' cookies';
//       parentLimaLocationHourSales.appendChild(limaLocationListItem);
//     }
//   },
// }



// limaCookies.renderLimaNameToPage();
// limaCookies.calculateLimaHourlySales();
// limaCookies.renderLimaHourTotalsToPage();
// limaCookies.calculateDailyLimaCookieSales();

