/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `MainController.index()`
   */
  index: function (req, res) {
    var User = req.session.User;
    console.log( User );//登录完成之后 就不是undefined
    res.view('index',{User:User});//将用户信息渲染到界面中去
  },

  logout:function(req,res){
    //销毁session
    req.session.destroy(function(err){
      res.redirect('/');
    })
  },
  test:function(req,res){
    //销毁session
    res.send('我是测试界面');
  },
};

