exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.process = function(req, res){
  console.log(req);
  res.redirect('/')
};
