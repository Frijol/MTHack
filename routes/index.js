exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.process = function(req, res){
  var myText = req.body.inputText;
  console.log(myText);
  res.redirect('/');
};
