/*
* GET Kitchen page
*/
exports.index = function(req, res){
  res.render('index', {title: 'Login', name: '| Login'});
};