//error page
exports.get404 = (req, res, next) => {
  res.status(404).json({ error: 'Page Not Found' });
};
// this is the best thig xDDD