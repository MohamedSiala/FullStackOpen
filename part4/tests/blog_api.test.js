const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const { log } = require("node:console");

beforeEach(async () => {
  await Blog.deleteMany({});

  await Blog.insertMany(helper.initialBlogs);
});

test("GET request returns the right amount of blogs", async () => {
  const result = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  assert.strictEqual(result.body.length, helper.initialBlogs.length);
});

test("Identifier is name id and not _id", async () => {
  const result = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  assert(Object.keys(result.body[0]).includes("id"));
  assert(!Object.keys(result.body[0]).includes("_id"));
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://test.url.html",
    likes: 4,
  };

  const returnedBlog = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await helper.blogsInDb();

  const blogToVerify = blogs.find((blog) => blog.id === returnedBlog.body.id);

  assert.strictEqual(blogs.length, helper.initialBlogs.length + 1);
  assert.strictEqual(blogToVerify.title, newBlog.title);
  assert.strictEqual(blogToVerify.author, newBlog.author);
  assert.strictEqual(blogToVerify.url, newBlog.url);
  assert.strictEqual(blogToVerify.likes, newBlog.likes);
});

test("If the likes property is missing, it is defaulted to 0", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://test.url.html",
  };

  const returnedBlog = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await helper.blogsInDb();

  const blogToVerify = blogs.find((blog) => blog.id === returnedBlog.body.id);

  assert.strictEqual(blogs.length, helper.initialBlogs.length + 1);
  assert.strictEqual(blogToVerify.likes, 0);
});

describe("If the title or url property is missing, the backend responds with 400 bad request", () => {
  test("title is missing", async () => {
    const newBlog = {
      author: "Test Author",
      url: "http://test.url.html",
      likes: 4,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogs = await helper.blogsInDb();

    assert.strictEqual(blogs.length, helper.initialBlogs.length);
  });
  test("url is missing", async () => {
    const newBlog = {
      title: "Test Title",
      author: "Test Author",
      likes: 4,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogs = await helper.blogsInDb();

    assert.strictEqual(blogs.length, helper.initialBlogs.length);
  });
});

describe("deleting blogs", () => {
  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    assert(!blogsAtEnd.includes(blogToDelete.content));

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
  });

  test("deleting a blog with a non existing id throws an error", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const response = await api.delete("/api/blogs/nonexistingID").expect(400);
    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
    assert.deepStrictEqual(response.body, { error: "malformatted id" });
  });
});

describe("Updating a blog", () => {
  test("a blog can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
    const returnedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);
    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
    assert.deepStrictEqual(returnedBlog.body, updatedBlog);
  });
  test("updating a blog with a non existing id throws an error", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const updatedBlog = { likes: 20 };
    const returnedBlog = await api
      .put(`/api/blogs/nonexistingID`)
      .send(updatedBlog)
      .expect(400);
    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
    assert.deepStrictEqual(returnedBlog.body, { error: "malformatted id" });
  });
});
after(async () => {
  await mongoose.connection.close();
});
