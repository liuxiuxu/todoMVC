const {db}=require('../db/db');
const url=require('url');
module.exports.listHander=function(req,res){
     db.query('SELECT * FROM `todomvc`',(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        const info={
            'message':'查询成功',
            code:1,
            list:data
        }
        res.end(JSON.stringify(info));
    })
};
module.exports.addHander=function(req,res){
    let str='?';
    req.on('data',chunk=>{
        str+=chunk;
    });
    req.on('end',()=>{
        const {title}=url.parse(str,true).query;
        const sql=`INSERT INTO \`todomvc\` VALUES(null,'${title}','0','0')`;
        db.query(sql,(err,data)=>{
            if(err){
                console.log(err);
                return;
            }
            const Info={
                message:'插入成功',
                code:1
            }
            res.end(JSON.stringify(Info));
        })
    })
};
module.exports.destroyHander=function(req,res){
    const {id}=url.parse(req.url,true).query;
    let sql=`DELETE FROM \`todomvc\` WHERE \`id\`='${id}'`;
    db.query(sql,(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        let info={
            message:'删除成功',
            code:1
        };
        res.end(JSON.stringify(info));
    })
};
module.exports.toggleHander=function(req,res){
    const {id,state}=url.parse(req.url,true).query;
    let sql=`UPDATE \`todomvc\` SET \`isFinish\`='${state}' WHERE \`id\`='${id}'`;
    db.query(sql,(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        let info={
            message:'更新成功',
            code:1
        };
        res.end(JSON.stringify(info));
    })
};
module.exports.toggleAll=function(req,res){
    const {state}=url.parse(req.url,true).query;
    let sql=`UPDATE \`todomvc\` SET \`isFinish\`='${state}'`;
    db.query(sql,(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        let info={
            message:'更新成功',
            code:1
        };
        res.end(JSON.stringify(info));
    })
};
module.exports.clearCom=function(req,res){
    let sql=`DELETE FROM \`todomvc\` WHERE \`isFinish\`='1'`;
    db.query(sql,(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        let info={
            message:'删除成功',
            code:1
        };
        res.end(JSON.stringify(info));
    })
};
module.exports.updateHander=function(req,res){
    const {id,title}=url.parse(req.url,true).query
    let sql=`UPDATE \`todomvc\` SET \`title\`='${title}' WHERE \`id\`='${id}'`;
    db.query(sql,(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        let info={
            message:'更新成功',
            code:1
        };
        res.end(JSON.stringify(info));
    })
};