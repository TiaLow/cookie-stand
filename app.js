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

//-------------------------------------------------------------------- GLOBAL VARS AND FUNCTIONS
var totalOpenHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'];

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomNumCustomers(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//https://codeburst.io/javascript-arrays-finding-the-minimum-maximum-sum-average-values-f02f1b0ce332
// also with lots of help from classmate Chandler Puckett
function arrSum(arr){
  return arr.reduce(function(a,b){
    return a + b;
  }, 0);
};

//--------------------------------------------------------------------- SEATTLE LOCATION OBJECT

var seattleCookies = {
  name : 'Seattle',
  minNumCustomers : 23,
  maxNumCustomers : 65,
  avgNumCookies : 6.3,
  dailySeattleSales : [] ,

  renderNameToPage: function(){
    var parentLocationName = document.getElementById('seattle'); //this is target
    var newHeading = document.createElement('p'); //this creates new element
    newHeading.textContent = this.name; //this gives new element content
    parentLocationName.appendChild(newHeading); //append it to the parent
  },
  
  calculateHourlyCookieSales : function(){

    for (var i = 0; i < totalOpenHours.length; i++){
      //below Im creating a random number of customers by using the global function that randomizes INCLUSIVE of min and max number of customers
      var randomNumber = getRandomNumCustomers(this.minNumCustomers, this.maxNumCustomers);
      //below is generating sales per hour using the random number of customers and avg num cookies per sale
      var totalHourlySales = Math.round(randomNumber * this.avgNumCookies);
      // below inserts each hours sales into an array
      this.dailySeattleSales.push(totalHourlySales);
    }
  },

  dailyTotalCookieSales : function(){
    var cookieTotal = arrSum(this.dailySeattleSales);
    var totalCookieList = document.getElementById('seattle-hours');
    var totalCookieItemInList = document.createElement('li');
    totalCookieItemInList.textContent = ('Total: ' + cookieTotal + ' cookies');
    totalCookieList.appendChild(totalCookieItemInList);
  },

 
  renderHourTotalsToPage: function(){
    var parentLocationHourlySales = document.getElementById('seattle-hours');
    for (var i = 0; i < totalOpenHours.length; i++ ){
      var newLocations = document.createElement('li');
      newLocations.textContent = totalOpenHours[i] + ': ' + this.dailySeattleSales[i] + ' cookies';
      parentLocationHourlySales.appendChild(newLocations);
    }
  },

};

seattleCookies.calculateHourlyCookieSales();
seattleCookies.renderNameToPage();
seattleCookies.renderHourTotalsToPage();
seattleCookies.dailyTotalCookieSales();

//---------------------------------------------------------------------- TOKYO LOCATION OBJECT

var tokyoCookies = {
  name : 'Tokyo',
  minNumCustomers : 3,
  maxNumCustomers : 24,
  avgNumCookies : 1.2,
  dailyTokyoSales : [],

  renderTokyoNameToPage : function(){
    var parentLocationNameTokyo = document.getElementById('tokyo');
    var newHeadingTokyo = document.createElement('p');
    newHeadingTokyo.textContent = this.name;
    parentLocationNameTokyo.appendChild(newHeadingTokyo);
  },
  
  calculateTokyoHourlyCookieSales : function(){
    
    for (var i = 0; i < totalOpenHours.length; i++){
      var randomNumber = getRandomNumCustomers(this.minNumCustomers, this.maxNumCustomers);
      var totalHourlySalesTokyo = Math.round(randomNumber * this.avgNumCookies);
      this.dailyTokyoSales.push(totalHourlySalesTokyo);
    }
  },

  calculateDailyTokyoCookieSales : function(){
    var tokyoCookieTotal = arrSum(this.dailyTokyoSales);
    var tokyoTotalCookieList = document.getElementById('tokyo-hours');
    var tokyoTotalCookieItemInList = document.createElement('li');
    tokyoTotalCookieItemInList.textContent = ('Total: ' + tokyoCookieTotal + ' cookies');
    tokyoTotalCookieList.appendChild(tokyoTotalCookieItemInList);
  },

  renderTokyoHourTotalToPage : function(){
    var parentTokyoLocationHourlySales = document.getElementById('tokyo-hours');
    for (var i = 0; i < totalOpenHours.length; i++){
      var tokyoLocationListItem = document.createElement('li');
      tokyoLocationListItem.textContent = totalOpenHours[i] + ': ' + this.dailyTokyoSales[i] + ' cookies';
      parentTokyoLocationHourlySales.appendChild(tokyoLocationListItem);
    }
  },


};

tokyoCookies.calculateTokyoHourlyCookieSales();
tokyoCookies.renderTokyoNameToPage();
tokyoCookies.renderTokyoHourTotalToPage();
tokyoCookies.calculateDailyTokyoCookieSales();

//----------------------------------------------------------------------------- DUBAI LOCATION OBJECT

var dubaiCookies = {
  name : "Dubai",
  minNumCustomers: 11,
  maxNumCustomers: 38,
  avgNumCookies: 3.7,
  dailyDubaiSales: [],

  renderDubaiNameToPage : function(){
    var parentLocationNameDubai = document.getElementById('dubai');
    var newParagraphDubai = document.createElement('p');
    newParagraphDubai.textContent = this.name;
    parentLocationNameDubai.appendChild(newParagraphDubai);
  },

  calculateDubaiHourlyCookieSales : function(){
    for (var i = 0; i < totalOpenHours.length; i++){
      var randomNumber = getRandomNumCustomers(this.minNumCustomers, this.maxNumCustomers);
      var totalHourlySalesDubai = Math.round(randomNumber * this.avgNumCookies);
      this.dailyDubaiSales.push(totalHourlySalesDubai);
    }
  },

  calculateDailyDubaiCookieSales : function(){
    var dubaiCookieTotal = arrSum(this.dailyDubaiSales);
    var dubaiTotalCookieList = document.getElementById('dubai-hours');
    var dubaiTotalCookieListItem = document.createElement('li');
    dubaiTotalCookieListItem.textContent = ('Total: ' + dubaiCookieTotal + ' cookies');
    dubaiTotalCookieList.appendChild(dubaiTotalCookieListItem);
  },

  renderDubaiHourTotalsToPage : function(){
    var parentDubaiLocationHourSales = document.getElementById('dubai-hours');
    for (var i = 0; i < totalOpenHours.length; i++){
      var dubaiLocationListItem = document.createElement('li');
      dubaiLocationListItem.textContent = totalOpenHours[i] + ': ' + this.dailyDubaiSales[i] + ' cookies';
      parentDubaiLocationHourSales.appendChild(dubaiLocationListItem);
    };
  },
};

dubaiCookies.renderDubaiNameToPage();
dubaiCookies.calculateDubaiHourlyCookieSales();
dubaiCookies.renderDubaiHourTotalsToPage();
dubaiCookies.calculateDailyDubaiCookieSales();



//----------------------------------------------------------------------------- PARIS LOCATION OBJECT

var parisCookies = {
  name : "Paris",
  minNumCustomers: 20,
  maxNumCustomers: 38,
  avgNumCookies: 2.3,
  dailyParisSales: [],

  renderParisNameToPage : function(){
    var parentLocationNameParis = document.getElementById('paris');
    var newParagraphParis = document.createElement('p');
    newParagraphParis.textContent = this.name;
    parentLocationNameParis.appendChild(newParagraphParis);
  },

  calculateParisHourlySales : function(){
    for (var i = 0; i < totalOpenHours.length; i++){
      var randomNumber = getRandomNumCustomers(this.minNumCustomers, this.maxNumCustomers);
      var totalHourlySalesParis = Math.round(randomNumber * this.avgNumCookies);
      this.dailyParisSales.push(totalHourlySalesParis);
    }
  },

  calculateDailyParisCookieSales : function(){
    var parisCookieTotal = arrSum(this.dailyParisSales);
    var parisTotalCookieList = document.getElementById('paris-hours');
    var parisTotalCookieListItem = document.createElement('li');
    parisTotalCookieListItem.textContent = ('Total: ' + parisCookieTotal + ' cookies');
    parisTotalCookieList.appendChild(parisTotalCookieListItem);
  },

  renderParisHourTotalsToPage : function(){
    var parentParisLocationHourSales = document.getElementById('paris-hours');
    for (var i = 0; i < totalOpenHours.length; i++){
      var parisLocationListItem = document.createElement('li');
      parisLocationListItem.textContent = totalOpenHours[i] + ': ' + this.dailyParisSales[i] + ' cookies';
      parentParisLocationHourSales.appendChild(parisLocationListItem);
    }
  },
}



parisCookies.renderParisNameToPage();
parisCookies.calculateParisHourlySales();
parisCookies.renderParisHourTotalsToPage();
parisCookies.calculateDailyParisCookieSales();






//----------------------------------------------------------------------------- LIMA LOCATION OBJECT

var limaCookies = {
  name : "Lima",
  minNumCustomers: 2,
  maxNumCustomers: 16,
  avgNumCookies: 4.6,
  dailyLimaSales: [],

  renderLimaNameToPage : function(){
    var parentLocationNameLima = document.getElementById('lima');
    var newParagraphLima = document.createElement('p');
    newParagraphLima.textContent = this.name;
    parentLocationNameLima.appendChild(newParagraphLima);
  },

  calculateLimaHourlySales : function(){
    for (var i = 0; i < totalOpenHours.length; i++){
      var randomNumber = getRandomNumCustomers(this.minNumCustomers, this.maxNumCustomers);
      var totalHourlySalesLima = Math.round(randomNumber * this.avgNumCookies);
      this.dailyLimaSales.push(totalHourlySalesLima);
    }
  },

  calculateDailyLimaCookieSales : function(){
    var limaCookieTotal = arrSum(this.dailyLimaSales);
    var limaTotalCookieList = document.getElementById('lima-hours');
    var limaTotalCookieListItem = document.createElement('li');
    limaTotalCookieListItem.textContent = ('Total: ' + limaCookieTotal + ' cookies');
    limaTotalCookieList.appendChild(limaTotalCookieListItem);
  },

  renderLimaHourTotalsToPage : function(){
    var parentLimaLocationHourSales = document.getElementById('lima-hours');
    for (var i = 0; i < totalOpenHours.length; i++){
      var limaLocationListItem = document.createElement('li');
      limaLocationListItem.textContent = totalOpenHours[i] + ': ' + this.dailyLimaSales[i] + ' cookies';
      parentLimaLocationHourSales.appendChild(limaLocationListItem);
    }
  },
}



limaCookies.renderLimaNameToPage();
limaCookies.calculateLimaHourlySales();
limaCookies.renderLimaHourTotalsToPage();
limaCookies.calculateDailyLimaCookieSales();

