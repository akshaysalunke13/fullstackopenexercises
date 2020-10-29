const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

const blogs = listHelper.initialBlogs

describe('4.4 total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('list of blogs, with correct number of likes', () => {
        expect(listHelper.totalLikes(blogs)).toBe(36)
    })

    test('blank blog list, expects 0', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })
})

describe('4.5 favourite blog', () => {
    const fav = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }
    test('favourite blog', () => {
        expect(listHelper.favoriteBlog(blogs)).toEqual(fav)
    })

    test('blank blog list', () => {
        expect(listHelper.favoriteBlog([])).toEqual({})
    })
})

describe('4.6 most blogs', () => {
    test('blog list, with correct author name', () => {
        expect(listHelper.mostBlogs(blogs)).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})

describe('4.7 most likes', () => {
    test('blog list, with correct author', () => {
        expect(listHelper.mostLikes(blogs)).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})