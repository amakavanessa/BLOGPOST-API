const fs = require('fs');
const superagent = require('superagent');

let blogPosts = JSON.parse(
  fs.readFileSync(`${__dirname}/../Data/blogpost.json`, 'utf8')
);
exports.getTime = (req, res, next) => {
  req.body.Date = new Date();
  next();
};

exports.checkEmail = (req, res, next) => {
  const email = req.body.email;
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email) {
    if (!email.match(validRegex)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Enter a valid email',
      });
    }
  } else {
    return res.status(400).json({
      status: 'fail',
      message: 'email is required',
    });
  }
  next();
};
exports.checkID = (req, res, next, val) => {
  console.log(`id is ${val}`);
  if (req.params.id * 1 > blogPosts.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  next();
};
exports.getImage = (req, res, next) => {
  const pic = superagent.get(
    `https://dog.ceo/api/breed/labrador/images/random`
  );
  req.body.image = pic.url;
  next();
};
exports.newBlogPost = (req, res) => {
  const newId = blogPosts[blogPosts.length - 1].id + 1;
  console.log(newId);
  const newPost = {
    id: newId,
    Date: new Date(),
    email: req.body.email,
    Title: req.body.Title,
    image: req.body.image,
    Post: req.body.Post,
  };
  blogPosts.push(newPost);
  fs.writeFile(
    `${__dirname}/../Data/blogpost.json`,
    JSON.stringify(blogPosts),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          blog: newPost,
        },
      });
    }
  );
};
exports.getAllBlogPost = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: blogPosts.length,
    data: {
      blogPosts,
    },
  });
};

exports.getBlogPost = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const blog = blogPosts.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: { blog },
  });
};

exports.updateBlogPost = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.deletePost = (req, res) => {
  const id = req.params.id;

  // const DelPost = blogPosts.find((el) => el.id === id);
  blogPosts = blogPosts.filter((item) => item.id != id);
  fs.writeFile(
    `${__dirname}/../Data/blogpost.json`,
    JSON.stringify(blogPosts),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          blog: { blogPosts },
        },
      });
    }
  );
};
