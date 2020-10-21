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

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}