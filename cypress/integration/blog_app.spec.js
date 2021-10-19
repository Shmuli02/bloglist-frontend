describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Mallikas',
      username: 'matti',
      password: 'salis'
    }
    cy.request('POST','http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('Notes')
  })
  it('login form is shown', function() {
    cy.contains('login')
  })
  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('matti')
    cy.get('#password').type('salis')
    cy.get('#login-button').click()

    cy.contains('Matti Mallikas logged in')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('matti')
    cy.get('#password').type('aa')
    cy.get('#login-button').click()

    cy.contains('Login')
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({username:'matti', password: 'salis'})
    })
    
    it('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('blog title')
      cy.get('#author').type('Matti')
      cy.get('#url').type('www.helsinki.fi')
      cy.contains('Create').click()

      cy.contains('blog title')
    })
    describe('add a blog exists', function() {
      beforeEach(function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('blog title')
        cy.get('#author').type('Matti')
        cy.get('#url').type('www.helsinki.fi')
        cy.contains('Create').click()
      })
      it('user can like a blog', function() {
        cy.contains('view').click()
        cy.contains('Like').click()
        cy.contains('Likes') //kesken 
      })
    })
    
  })
})