const http=require('http');
const url=require('url');
const {listHander,addHander,destroyHander,toggleHander,toggleAll,clearCom,updateHander}=require('./controller/rout');
const server=http.createServer((req,res)=>{
    const urlInfo=url.parse(req.url,true);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Credential','true');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
    if(urlInfo.pathname==='/list') return listHander(req,res);
    if(urlInfo.pathname==='/add') return addHander(req,res);
    if(urlInfo.pathname==='/destroy') return destroyHander(req,res);
    if(urlInfo.pathname==='/toggle') return toggleHander(req,res);
    if(urlInfo.pathname==='/toggleAll') return toggleAll(req,res);
    if(urlInfo.pathname==='/clearCom') return clearCom(req,res);
    if(urlInfo.pathname==='/update') return updateHander(req,res);
});
server.listen('8080',()=>{
    console.log("监听成功");
})