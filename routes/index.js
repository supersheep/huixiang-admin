
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
    pieces:[{
        id:1,
        content:"asdasd"
    },{
        id:2,
        content:"asdvwrewrq"
    }]
  });
};