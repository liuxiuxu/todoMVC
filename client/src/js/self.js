import ajax from './utils.js';
// 表示当前状态
let type='all';
const todoapp=document.querySelector('.todoapp');
// 获取数据
getList();
function getList(){
    ajax({
        url:'http://localhost:8080/list',
        success(res){
            // 渲染页面
            bindHtml(res.list);
        }
    })
};
function bindHtml(list){
    // 存储不同状态下的数据
    let todoList=[];
    if(type==='all') todoList=list;
    if(type==='active')todoList=list.filter(item=>item.isFinish==='1');
    if(type==='completed')todoList=list.filter(item=>item.isFinish==='0')
    let activeNum=list.filter(item=>item.isFinish==='0').length;
    let str=`
        <header class="header">
                <h1>todos</h1>
				<input class="new-todo" placeholder="What needs to be done?" autofocus>
			</header>
			<section class="main" style="display:${list.length===0?'none':'block'}">
				<input id="toggle-all" class="toggle-all" type="checkbox" ${activeNum===0?'checked':''}>
                <label for="toggle-all">Mark all as complete</label>
                <ul class="todo-list">
                 `
                    todoList.forEach(ele => {
                        str+=`
                        <li class=" ${ele.isFinish==='1'?'completed':''}">
						<div class="view">
                            <input todoId="${ele.id}" class="toggle" type="checkbox" ${ele.isFinish==='1'?'checked':''}>
                            <label class='item'>${ele.title}</label>
							<button todoId="${ele.id}" class="destroy"></button>
                        </div>
						<input todoId="${ele.id}" class="edit" value="${ele.title}">
					</li>
			
                        `
                    });
                    
					
            str+=`
            </ul>
			</section>
            <footer class="footer" style="display:${list.length===0?'none':'block'}">
				<span class="todo-count"><strong>${activeNum}</strong> item left</span>
				<ul class="filters">
					<li>
						<a name='filter' class="${type==='all'?'selected':''}" href="javascript:;">All</a>
                    </li>
					<li>
						<a name='filter' class="${type==='active'?'selected':''}" href="javascript:;">Active</a>
                    </li>
					<li>
						<a name='filter' class="${type==='completed'?'selected':''}" href="javascript:;">Completed</a>
					</li>
				</ul>
				<button class="clear-completed" style="display:${activeNum===list.length?'none':'block'}">Clear completed</button>
			</footer>
    `
    todoapp.innerHTML=str;
}
// 采用事件委托方式添加数据
todoapp.addEventListener('keydown',e=>{
    e=e||window.event;
    // 处理目标兼容
    const target=e.target||e.srcElement;
    // 处理键盘编码兼容
    const code=e.keyCode||e.which;
    if(target.className==='new-todo'&& code===13){
        let text=target.value.trim();
        if(!text)return;
        ajax({
            url:'http://localhost:8080/add',
            method:"POST",
            data:`title=${text}`,
            success(res){
                getList();
            }
        })
    };
    // 点击的是编辑框
    if(target.className==='edit' && code===13){
        const text=target.value.trim();
        const id=target.getAttribute('todoid')
        if(!text){
            ajax({
                url:'http://localhost:8080/destroy',
                data:`id=${id}`,
                success(res){
                    getList();
                }
            })
        }else{
            ajax({
                url:'http://localhost:8080/update',
                data:`id=${id}&title=${text}`,
                success(res){
                    getList();
                }
            })
        }
    }
})
todoapp.addEventListener('click',e=>{
    e=e||window.event;
    const target=e.target||e.srcElement;
    const code=e.keyCode||e.which;
    e.stopPropagation();
    // 删除按钮
    if(target.className==='destroy'){
        let id=target.getAttribute('todoId');
        ajax({
            url:'http://localhost:8080/destroy',
            data:`id=${id}`,
            success(res){
                getList();
            }
        })
    };
    // 选中还是没选中
    if(target.className==='toggle'){
        let id=target.getAttribute('todoId');
        let state=target.checked?'1':'0';
        ajax({
            url:'http://localhost:8080/toggle',
            data:`id=${id}&state=${state}`,
            success(res){
                getList();
            }
        })
    }
    // 全选
    if(target.className==='toggle-all'){
        let state=target.checked?'1':'0';
        ajax({
            url:'http://localhost:8080/toggleAll',
            data:`state=${state}`,
            success(res){
                getList();
            }
        })
    };
    // 删除全部已完成
    if(target.className==='clear-completed'){
        ajax({
            url:'http://localhost:8080/clearCom',
            success(res){
                console.log(res)
                getList();
            }
        })
    };
    // 显示状态按钮
    if(target.name==='filter'){
        type=target.innerText.toLowerCase();
        console.log(type)
        getList();
    };
    
})
// 双击事件
todoapp.addEventListener('dblclick',e=>{
    e=e||window.event;
    const target=e.target||e.srcElement;
    const code=e.keyCode||e.which;
    if(target.className==='item'){
        let li=target.parentElement.parentElement
        let lis=todoapp.querySelectorAll('li');
        lis.forEach(ele => {
            ele.classList.remove('editing');
        });
        li.classList.add('editing');
    }
});
// 点击其他地方取消编辑
document.addEventListener('click',e=>{
    getList();
})