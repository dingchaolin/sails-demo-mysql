var mongodb = require('mongodb');
var server = new mongodb.Server('localhost',27017,{auto_reconnect:true});
//创建一个链接
var db = new mongodb.Db('segment',server, {safe:true});
//{safe:true} 表示启动安全模式，在执行更新操作之后，驱动都会发动getLastError命令来保证更新成功 false不发送

//打开db
db.open( function( err, db ){
  if( err ){
    console.log('connnection error!');
  }else{
    //第一种链接方法
    /*
    db.collection('user',{safe:true}, function(err, collection){
      if( err ){
        console.log( err );
      }else{
        //################################################
        //查询数据
        //collection.find().toArray(function( err, docs){//无条件查询 多条
        //collection.find({uid:1,uname:'aa'}).toArray(function( err, docs){//单条 有条件查询

        //collection.find({uid:1,uname:'aa'}).toArray(function( err, docs){//
          //console.log( 'find' );
          //console.log( docs );
          //db.close();//关闭链接
        //})

        //collection.findOne(function( err, docs){//单条查询, 无条件查询

        //collection.findOne({uname:'aa'},function( err, docs){//单条查询, 有条件查询
        //  console.log( 'find' );
        //  console.log( docs );
        //  db.close();//关闭链接
       // })
        //#################################################
      }
    })*/

    //第二种链接方式 创建一个特定集合 有就直接链接 没有就创建

    db.createCollection('user', {safe:true}, function( err, collection){
      if( err ){
        console.log( err );
      }else{
        //#######################################################
        //新增数据
        /*
        var row = {_id:4,uname:'ee',pwd:'ff',nicheng:'66'};
        collection.insert( row, {safe:true}, function( err, result){
          if( err ){
            console.log( err ) ;
          }else{
            console.log( result );
            db.close();//关闭链接
          }
        })*/
        //########################################################
        //#######################################################
        //更新数据
        //collection.update({_id:3},{$set:{uname:'张三丰'}},function( err, docs){//单条查询, 有条件查询 不支持多条更新
        //collection.update({uname:'张三丰'},{$set:{uname:'张四丰'}},{multi:true},function( err, docs){//支持多条更新
          //console.log( 'find' );
          //console.log( docs );
          //db.close();//关闭链接
        //});
        //######################################################
        //删除数据
        //#####################################################
        //collection.remove({uname:'aa'},{safe:true},function( err, docs){//单条删除
        collection.remove({uname:'张四丰'},{multi:true},function( err, docs){//多条记录删除
          console.log( 'find' );
          console.log( docs );
          db.close();//关闭链接
        });
        //#####################################################
      }

    });


  }
})

