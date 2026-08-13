// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-localstorage-commands'

Cypress.Commands.add('signup', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
        name: 'Akshay Salunke',
        username,
        password
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3000/api/login',
        { username, password })
        .then(response => {
            cy.clearLocalStorage()
            cy.setLocalStorage('blogAppUser', JSON.stringify(response.body))
            cy.saveLocalStorage()
            cy.visit('http://localhost:3000')
        })
})

Cypress.Commands.add('add_blog', ({ title, author, url, likes }) => {
    const blog = { title, author, url, likes }
    cy.restoreLocalStorage()
    let token
    cy.getLocalStorage('blogAppUser').then(r => {
        token = JSON.parse(r).token
    }).then(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/blogs',
            auth: {
                bearer: token
            },
            body: blog
        }).then(() => {
            cy.visit('http://localhost:3000')
        })
    })
})