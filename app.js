'use strict';

// FORM STUFF
//1. you need a target
// 2. you need to add an event listener to that target
// - 2a. listener need a type of event to listen to
// - 2b. need a function that the listener can call whenever the event happens

var newStoreForm = document.getElementById('newStoreForm');

newStoreForm.addEventListener('submit', function(storeEvent){
  storeEvent.preventDefault();

  var theEvent = storeEvent;
  var theForm = theEvent.target;
  // console.log('target of theForm is: ', theForm);

  var inputOfCityLocation = theForm.location;
  var userTypedLocation = inputOfCityLocation.value;
  // console.log('city location: ', userTypedLocation);
  //SICK it works!

  var inputOfMinCustomers = storeEvent.target.minCust.value;
  // console.log(inputOfMinCustomers);
  var inputOfMaxCustomers = storeEvent.target.maxCust.value;
  var inputOfAvgCookies = storeEvent.target.avgCookies.value;

  console.log(userTypedLocation, inputOfMinCustomers, inputOfMaxCustomers, inputOfAvgCookies);

});


//--------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------- GLOBAL VARS AND FUNCTIONS----
//--------------------------------------------------------------------------------------------------

var totalOpenHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];


//--------------------------------------- Function randomizer

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function mathRandomizer(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//--------------------------------------- Function to randomize customers, calc hourly cookie sales

function calculateHourlyCookieSales(){
  for (var i = 0; i < totalOpenHours.length; i++){
    var ranNumCustomers = mathRandomizer(this.minNumCustomer, this.maxNumCustomer);
    var ranNumHourlyCookieSales = Math.round(ranNumCustomers * this.avgNumCookies);
    this.dailyStoreSales.push(ranNumHourlyCookieSales);
  }
}

//--------------------------------------- Function to find the sum of an array

//https://codeburst.io/javascript-arrays-finding-the-minimum-maximum-sum-average-values-f02f1b0ce332
// also with lots of help from classmate Chandler Puckett

function arrSum(arr){
  return arr.reduce(function(a,b){
    return a + b;
  }, 0);
}

//---------------------------------------- Function to calculate hour totals from all locations

function calculateHourlyTotalsAcrossLocations(){
  for (var i = 0; i < totalOpenHours.length; i++){
    var hourlyTotalsAllLocations = (seattleStore.dailyStoreSales[i] + tokyoStore.dailyStoreSales[i] + dubaiStore.dailyStoreSales[i] + parisStore.dailyStoreSales[i] + limaStore.dailyStoreSales[i]);

    hourlyTotalsAllLocationstoColumns.push(hourlyTotalsAllLocations);

  }
}

var hourlyTotalsAllLocationstoColumns = [];


//---------------------------------------- Function to find the sum of location's hourly sales and render

function calculateDailyTotalCookieSales(){
  var cookieTotal = arrSum(this.dailyStoreSales);
  this.dailyStoreSalesTotal.push(cookieTotal);
}


//-----------------------------------------------------------------------------------------------
//----------------------------------------------------------- TABLE STUFF -----------------------
//-----------------------------------------------------------------------------------------------

//----------------------------------------- Function to get heading on table

function createTableHeader(){
  var tableHeader = document.getElementById('cookie-table');
  var tableHeaderRow = document.createElement('tr');
  var singleBlankCell = document.createElement('th');
  singleBlankCell.textContent = '';
  tableHeaderRow.appendChild(singleBlankCell);

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

//----------------------------------------- Function to render store sales and location totals to table


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

  var storeLocationTotal = document.createElement('td');
  storeLocationTotal.textContent = this.dailyStoreSalesTotal[0];
  tableRow.appendChild(storeLocationTotal);
}

//--------------------------------- Function to render table footer which is total hourly sales across locations

function renderTableFooter(){
  var tableFooterTarget = document.getElementById('cookie-table');
  var tableFooter = document.createElement('tfoot');
  var tableFooterRow = document.createElement('tr');
  var tableFooterCell = document.createElement('td');

  tableFooterCell.textContent = 'Total Sales by the Hour: ';


  tableFooter.appendChild(tableFooterRow);
  tableFooterRow.appendChild(tableFooterCell);

  var locationTotalTotals = 0;

  for (var i = 0; i < totalOpenHours.length; i++){
    var hourlyTotalsCellsInFooter = document.createElement('td');
    hourlyTotalsCellsInFooter.textContent = hourlyTotalsAllLocationstoColumns[i];

    locationTotalTotals += hourlyTotalsAllLocationstoColumns[i];
    tableFooterRow.appendChild(hourlyTotalsCellsInFooter);
  }

  var cellForTotalTotals = document.createElement('td');
  cellForTotalTotals.textContent = locationTotalTotals;
  tableFooterRow.appendChild(cellForTotalTotals);
  tableFooterTarget.appendChild(tableFooter);
}



//------------------------------------------------------------------------------------------
//------------------------------------------------------------------ CONSTRUCTOR FUNCTION---
//------------------------------------------------------------------------------------------

function SalmonCookies(branchName, minNumCustomer, maxNumCustomer, avgNumCookies){
  this.branchName = branchName;
  this.minNumCustomer = minNumCustomer;
  this.maxNumCustomer = maxNumCustomer;
  this.avgNumCookies = avgNumCookies;
  this.dailyStoreSales = [];
  this.dailyStoreSalesTotal = [] ;
  // allBranches.push(this); CAN USE USE THIS TO MAKE ALL BRANCHES ARRAY DYNAMIC, NEED var allBranch = [] at top?as global variable???
}

SalmonCookies.prototype.calculateHourlyCookieSales = calculateHourlyCookieSales;

SalmonCookies.prototype.calculateHourlyTotalsAcrossLocations = calculateHourlyTotalsAcrossLocations;

SalmonCookies.prototype.calculateDailyTotalCookieSales = calculateDailyTotalCookieSales;

SalmonCookies.prototype.renderStoreInfoToTable = renderStoreInfoToTable;

SalmonCookies.prototype.renderTableFooter = renderTableFooter;


//------------------------------------------------------------------------------------------
//----------------------------------------------------- NEW INSTANCES ----------------------
//------------------------------------------------------------------------------------------

createTableHeader();

//TO DO- CAN MAKE THESE BELOW DYNAMIC USING ALL BRANCH VARIABLE AND FOR LOOP
// allBranches[k].renderStoreInfoToTable();    for var k = 0; k < allBranches.length; k++


var seattleStore = new SalmonCookies('Seattle', 23, 65, 6.3);

seattleStore.calculateHourlyCookieSales();
seattleStore.calculateDailyTotalCookieSales();
seattleStore.renderStoreInfoToTable();



var tokyoStore = new SalmonCookies('Tokyo', 3, 24, 1.2);

tokyoStore.calculateHourlyCookieSales();
tokyoStore.calculateDailyTotalCookieSales();
tokyoStore.renderStoreInfoToTable();



var dubaiStore = new SalmonCookies('Dubai', 11, 28, 3.7);

dubaiStore.calculateHourlyCookieSales();
dubaiStore.calculateDailyTotalCookieSales();
dubaiStore.renderStoreInfoToTable();


var parisStore = new SalmonCookies('Paris', 20, 38, 2.3);

parisStore.calculateHourlyCookieSales();
parisStore.calculateDailyTotalCookieSales();
parisStore.renderStoreInfoToTable();


var limaStore = new SalmonCookies('Lima', 2, 16, 4.6);

limaStore.calculateHourlyCookieSales();
limaStore.calculateDailyTotalCookieSales();
limaStore.renderStoreInfoToTable();

calculateHourlyTotalsAcrossLocations();

renderTableFooter();
