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

//-------------------------------------------------------------------- GLOBAL VAR AND FUNCTION
var totalOpenHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'];


function getRandomNumCustomers(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
  //The maximum is inclusive and the minimum is inclusive 
}

//--------------------------------------------------------------------- SEATTLE LOCATION OBJECT
var seattleCookies = {
  name : 'Seattle',
  renderToPage: function(){
    var parentUnorderedList = document.getElementById('seattle-ul'); //this is target
    var newlistItem = document.createElement('li'); //this creates new element
    newlistItem.textContent = this.name; //this gives new element content
    parentUnorderedList.appendChild(newlistItem);
  },
  minNumCustomers : 23,
  maxNumCustomers : 65,
  avgNumCookies : 6.3,
  dailySeattleSales : [] ,
  calculateAllCookieSales : function(){

    for (var i = 0; i < totalOpenHours.length; i++){
      //below Im creating a random number of customers by using the global function that randomizes INCLUSIVE of min and max number of customers
      var randomNumber = getRandomNumCustomers(this.minNumCustomers, this.maxNumCustomers);
      //below is generating sales per hour using the random number of customers and avg num cookies per sale
      var totalHourlySales = Math.round(randomNumber * this.avgNumCookies);
      // below inserts each hours sales into an array
      this.dailySeattleSales.push(totalHourlySales);
    }
  },



};

seattleCookies.calculateAllCookieSales();
seattleCookies.renderToPage();






