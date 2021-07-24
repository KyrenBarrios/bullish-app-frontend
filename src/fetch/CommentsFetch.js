class CommentsFetch {
  constructor() {
      this.baseUrl = 'http://localhost:3000/api/comments'
  }

  getComments() {
      return fetch(this.baseUrl).then(res => res.json())
  }

  createComment(comment) {
  
      return fetch(this.baseUrl, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
          },
          body: JSON.stringify({ comment })
      })
      .then(res => res.json())
      
  }
}