/*
 * GET home page.
 */


exports.waiter = function(req, res){
  res.render('waiter', { title: 'Order UP', name: '| Order Up', username:req.session.username });
};