class Stocks {
    

  constructor() {
      this.stocks = []
      this.stockFetch = new StocksFetch()
      this.commentFetch = new CommentsFetch()
      this.initBindingsAndEventListeners()
      this.fetchAndLoadStocks()
  }

  

  initBindingsAndEventListeners() {
      this.stocksContainer = document.getElementById('stocks-container')
      this.newStockName = document.getElementById('new-stock-name')
      this.newStockPrice = document.getElementById('new-stock-price')
      this.newStockCategory = document.getElementById('new-stock-category')
      this.stockForm = document.getElementById('new-stock-form')
      this.stockForm.addEventListener('submit', this.createStock.bind(this))
      this.stocksContainer.addEventListener('click', this.handleNewCommentClick)
      this.stocksContainer.addEventListener('submit', this.handleFormOnSubmit.bind(this))
      
      
      
      
  }
  //Stock form submit event handler
  createStock(e) {
    e.preventDefault()

    const stock = {
        name: this.newStockName.value,
        price: this.newStockPrice.value,
        category: this.newStockCategory.value
    }


   this.stockFetch.createStock(stock)
        .then(stock => {
        const object = new Stock(stock)
        this.stocks.push(object)
        this.render()
        })
        .catch(err => console.log(err))
    
        this.newStockName.value = ""
        this.newStockPrice.value = ""
        this.newStockCategory.value = ""
}





  //////////////////////////////////////////
  
  //Click event for from handler
  handleNewCommentClick(e) {

    if (e.target.className === 'new-comment-button'){
        const str = e.target.id
        const stockId = str.split('_')[2];
        Stock.renderNewStockCommentForm(stockId);
    }

    
}


//Comment Form submit event handler
  handleFormOnSubmit(e){
      e.preventDefault()
      const comment = {
          comment: event.target.querySelector('#stock-comment-comment').value,
          commentor: event.target.querySelector('#stock-commentor').value,
          stock_id: event.target.getAttribute('data-stock-id')
      }

      this.commentFetch.createComment(comment)
          .then(comment => {

              const stock = this.stocks.find(stock => stock.id === comment.stock.id)
              stock.comments.push(comment)
     
          
          this.render()
          })
          .catch(err => console.log(err))
  }
  ///////////////////////////////////////////

  //Rendering Stocks/Comments
  render() {        
    this.stocksContainer.innerHTML = this.stocks.map(stock => stock.renderStock()).join('')
}

  fetchAndLoadStocks() {
      this.stockFetch
          .getStocks()
          .then(stocks => {
              stocks.forEach(stock => this.stocks.push(new Stock(stock)))
              
      })
      .then(() => {
          this.render()
          
      }) 
  }

  

  
}