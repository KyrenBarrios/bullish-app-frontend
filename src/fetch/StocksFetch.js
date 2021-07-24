class StocksFetch {
  constructor() {
      this.baseUrl = 'http://localhost:3000/api/stocks'
  }

 getStocks() {
       return fetch(this.baseUrl).then(res => res.json())
  }

  createStock(stock) {
  
      //fetch returns a promise
      return fetch(this.baseUrl, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
          },
          body: JSON.stringify({ stock })
      })
      //.then is called when the promise resolves 
      //the response from the database is passed as an arguement 
      .then(res => res.json())
    
  }


   
}
