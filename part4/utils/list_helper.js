var _ = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogList) => {
    let total = 0
    for (b in blogList) {
        total += blogList[b]['likes']
    }
    return total
}

const favoriteBlog = (blogList) => {
    let favBlog = {}, max = 0
    for (b in blogList) {
        if (blogList[b][`likes`] > max) {
            favBlog = blogList[b]
            max = blogList[b][`likes`]
        }
    }
    return favBlog
}

const mostBlogs = (blogList) => {
    const totalBlogs = _.reduce(blogList, (r, v) => {
        if (r[v.author]) {
            r[v.author] += 1
        } else {
            r[v.author] = 1
        }
        //console.log(r, v, k)
        return r
    }, {})

    const authorName =  Object.keys(totalBlogs).reduce((a, b) => totalBlogs[a] > totalBlogs[b]? a : b )

    return {author:authorName, blogs:totalBlogs[authorName]}
}

const mostLikes = (blogList) => {
    const totalLikes = _.reduce(blogList, (r, v) => {
        if (r[v.author]) {
            r[v.author] += v.likes
        } else {
            r[v.author] = v.likes
        }
        return r
    }, {})

    const authorName =  Object.keys(totalLikes).reduce((a, b) => totalLikes[a] > totalLikes[b]? a : b )

    return {author:authorName, likes:totalLikes[authorName]}
}

const originalBlogList = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, originalBlogList
}