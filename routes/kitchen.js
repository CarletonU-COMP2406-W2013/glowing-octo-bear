
/*
 * GET Kitchen page.
 */

exports.kitchen = function(req, res){
  res.render('kitchen', { title: 'Kitchen' });
};