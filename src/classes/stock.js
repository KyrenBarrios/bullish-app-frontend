class Stock {
  constructor(stock) {
      this.id = stock.id
      this.name = stock.name
      this.price = stock.price
      this.category = stock.category
      this.comments = stock.comments
  }

  renderStockComments(){
      return `
          <ul>${this.comments.map(comment => {
              return `
                  
                  <strong><ul> ${comment.commentor} says "${comment.comment}"</ul></strong>    
              `
          }).join('')}</ul>
          `
  }

  renderLi() {
      return `<ul>
                  <li>Price: $${this.price}</li>
                  <li>Category: ${this.category} </li>
                  
              </ul>`
  }

  renderName(){
      return `<h3>${this.name}</h3>`
  }

  renderNewCommentButton(){
      return `
          <button class="new-comment-button" id="new_comment_${this.id}">Add Comment</button>
      `
  }

  static renderNewStockCommentForm(stockId) {
      const formContainer = document.getElementById(`stock-${stockId}`)
      const form = document.createElement("form")
      form.setAttribute('data-stock-id', stockId)

      form.innerHTML = `
          Comment: <input type="text" name="stock-comment-comment" id="stock-comment-comment"/><br>
          Commentor:<input type="text" name="stock-commentor" id="stock-commentor"/><br>            
          <input type="submit" value="Submit Comment"/>
      `

      
      formContainer.appendChild(form)
  }

  renderStock(){
    
      
      return`
          <div class="stock-render" id="stock-${this.id}">
              ${this.renderName()}
              ${this.renderLi()}
              ${this.renderStockComments()}
              ${this.renderNewCommentButton()}
          </div>
      `
  }


}