describe('Blog app', function () {
    beforeEach(function () {
        cy.signup({ username: 'akki', password: 'pass' })
    })

    it('Login form is shown', function () {
        cy.contains('Login')
    })

    describe('Login', function () {
        it('fails with wrong username/password', function () {
            cy.get('#username').type('akki1')
            cy.get('#password').type('pass')
            cy.get('#login-submit').click()

            cy.contains('Wrong username or password')
        })

        it('suceeds with correct credentials', function () {
            cy.get('#username').type('akki')
            cy.get('#password').type('pass')
            cy.get('#login-submit').click()

            cy.contains('login successful')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'akki', password: 'pass' })
        })

        const blog = {
            title: 'Test Blog',
            author: 'akki',
            url: 'test-url'
        }

        it('A blog can be created', function () {
            cy.get('#add-blog').click()
            cy.get('#title').type(blog.title)
            cy.get('#author').type(blog.author)
            cy.get('#url').type(blog.url)
            cy.get('#add-blog-button').click()
            cy.contains(`${blog.title} by ${blog.author}`)
        })

        it('A blog can be liked', function () {
            //create blog
            cy.add_blog(blog)
            //Like blog
            cy.get('#show-info').click()
            cy.get('#like-blog').click()
            cy.contains('1')
        })

        it('A blog can be deleted', function () {
            //create a blog
            cy.add_blog(blog)
            //delete blog
            cy.get('#show-info').click()
            cy.get('#delete-blog').click()
            cy.get('.blog').should('not.exist')
        })

        it.only('Blogs are sorted according to number of likes', function () {
            for (let i = 0; i < 5; i++) {
                cy.add_blog({
                    title: blog.title + ' ' + i,
                    url: blog.url,
                    author: blog.author,
                    likes: i * 2,
                })
            }

            cy.get('.blog').each(blog => {
                console.log('get blogs', blog)
            })
        })
    })
})