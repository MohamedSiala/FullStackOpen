const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  return blogs.reduce((sum, item) => sum + item.likes, 0);
};

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  return blogs
    .map((blog) => {
      const returnedBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
      return returnedBlog;
    })
    .reduce((prev, current) => {
      return prev && prev.likes > current.likes ? prev : current;
    }, null);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const blogsPerAuthor = _.mapValues(
    _.groupBy(blogs, "author"),
    (blogs) => blogs.length
  );
  const MaxBlogsAuthor = _.maxBy(
    _.keys(blogsPerAuthor),
    (author) => blogsPerAuthor[author]
  );
  return {
    author: MaxBlogsAuthor,
    blogs: blogsPerAuthor[MaxBlogsAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  const blogsPerAuthor = _.groupBy(blogs, "author");
  const likesPerAuthor = _.mapValues(blogsPerAuthor, (blogs) =>
    _.sumBy(blogs, "likes")
  );
  const MaxLikesAuthor = _.maxBy(
    _.keys(likesPerAuthor),
    (author) => likesPerAuthor[author]
  );

  return {
    author: MaxLikesAuthor,
    likes: likesPerAuthor[MaxLikesAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
