const express = require('express');
const controls = require('../controller/control');
const router = express.Router();
router.param('id', controls.checkID);
router
  .route('/')
  .post(
    controls.getTime,
    controls.checkEmail,
    controls.getImage,
    controls.newBlogPost
  )
  .get(controls.getAllBlogPost);

router
  .route('/:id')
  .get(controls.getBlogPost)
  .patch(controls.updateBlogPost)
  .delete(controls.deletePost);

module.exports = router;
