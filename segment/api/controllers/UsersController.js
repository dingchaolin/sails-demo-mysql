/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//导入dcl_user
//User＝require('../models/Dcl_user');

function formatDate(date) {
  return date.toLocaleDateString()+' '+date.toLocaleTimeString();
}
module.exports = {



  /**
   * `UsersController.reg()`
   */
  reg: function (req, res) {
    console.log("注册！");
    //res.send(req.body);//
    //###################################增加
    //只选择需要的字段插入到库中

    var user = req.allParams();
    user.createtime = formatDate( new Date() );
    Dcl_user.create(user).exec(function (err,created){

      if( err ){
        var errStr = err.message;
        if( errStr.indexOf('emailunip') > -1 ){
          res.send('<script>alert("email重复");history.back();</script>');
        }else if( errStr.indexOf('nichengunip') > -1 ){
          res.send('<script>alert("nicheng重复");history.back();</script>');
        }
        return res.send('<script>alert("未知错误");history.back();</script>');;
      }
      console.log(err);
      console.log(created);     //返回的是创建的对象
      //res.send( {"msg":'注册成功！'} );
      res.redirect('307','/user/login');
    })

    //####################################修改
    //修改
    /*
    var user = req.allParams();
    user.createtime = formatDate( new Date() );
    //修改uid为3的那条记录
    Dcl_user.update({uid:3},user).exec(function (err,created){
      console.log(err);
      console.log(created);     //返回的是创建的对象
    });*/
    //Unknown column 'dcl_user.id' in 'where clause'
    // 执行2条sql查询 update select select的时候没有id 就会报错
    //解决该问题有有2个方案
    //1 不理会该错误
    //2 直接使用sql
    /*
     Dcl_user.query('update dcl_user set email=?,pwd=?,nicheng=? where uid =?',['gg','gg','gg',3],function(err,results){

      console.log('错误:'+err);
      console.log(results);
    })*/
    //###########################################删除
    //删除
    //由于ORM要求主键名必须用id 如果主键名不是id的话 下面这条语句肯定不会执行成功
    //Dcl_user.destroy({uid:4});
    //删除只能使用sql
    /*Dcl_user.query(' delete from dcl_user where uid =?',[3],function(err,results){

      console.log('错误:'+err);
      console.log(results);
    });
    */
    //###########################################查询
    /*
     Dcl_user.find({uid:2}).exec(function (err,created){
          console.log(err);
          console.log(created);     //返回的是创建的对象
        })
      */
    /*
    return res.json({
      todo: 'reg() is not implemented yet!'
    });
    */
  },


  /**
   * `UsersController.login()`
   */
  login: function (req, res) {
    //res.view();//访问内部login
    //res.view('login');//访问外部login
    //console.log('登陆！');
    /*
    return res.json({
      todo: 'login() is not implemented yet!'
    });
    */
    // find 返回一个［｛｝］， 如果没有返回［］
    //也可以使用query('select * from dcl_user where uid= 3').exec(function(err,result){});
    //多表查询 使用sql更方便
    Dcl_user.find({id:3}).exec( function(err, result ){//返回一个对象
      console.log( result );//未找到 返回undefined
        //res.send(result);
      if( result.length > 0 ){
        //创建session
        console.log( req.session );
        req.session.User = result;//在session中记录用户信息
        res.redirect('/');
      }
      else{
        res.send('<script>alert("email或者密码错误");history.back();</script>');
      }
      /*
       {
       "email": "1124373818@qq.com",
       "pwd": "122",
       "nicheng": null,
       "updtime": null,
       "createtime": "2016-11-13 15:03:25",
       "id": 3//多了一个id字段
       }
      * */
      });


  }
};

