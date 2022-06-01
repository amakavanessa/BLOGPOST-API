// const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const blogRoutes = require('./routes/blogRoutes');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/blogPost', blogRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
