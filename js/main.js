var text = `/*
你好， 我是Pomelo。
下面我介绍一下我自己，
语言太过无聊，我来
使用代码介绍吧！
开始咯！
*/
*{
    transition: all 1s;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/*额。。。好像字体有点小，背景也太单调了*/
html{
    font-size: 20px;
    background-color: rgb(218, 218, 218);
}

#code{
    border: 1px solid #aaa;
    padding: 16px;
    overflow: hidden;
}

/* 代码不够美腻， 需要高亮 */

.token.selector{
    color: rgb(102, 153, 0);
}

.token.punctuation{
    color: rgb(153, 153, 153);
}

.token.property{
    color: rgb(153, 0, 85);
}
#code{
    height: 100vh;
}
/* oh 非常好，现在我需要一张白纸 */
`

var text1 = `
#code{
    width: 50%;
    position:fixed;
    left: 0;
}
/*请注意右上角*/
#paper{
    position: fixed;
    right: 0;
    width: 100px;
    height: 100px;
    background-color: white;
    border: 1px solid black;
}
/*这是一个方块吗？这么小？！
我们来让它变大！
*/
#paper{
    width: 200px;
    height: 200px;
    width: 700px;
    height: 700px;
    width: 900px;
    height: 900px;
    width: 50%;
    height: 100vh;
}
`
var markDownText = `
- 基本信息
姓名：罗新  性别：男  学历：本科  学校：长江大学  年级：大四
博客地址：https://juejin.im/user/5a4368866fb9a044fb080a28
Github: https://github.com/Pomelo1213

- skill.技能描述
熟悉HTML/CSS，了解HTML5/CSS3,了解经典的网页布局开发；
了解动态REM，能使用其解决移动端屏幕适配问题；
熟悉原生JavaScript，掌握重要概念，例如：原型链、闭包、继承等。有ES6部分特性的使用经历；
了解DOM，jQuery的技术细节；
了解前后端联合开发的技术原理：Ajax、JSON；
使用过CSS预处理器SASS；
了解HTTP基础知识，了解前端性能优化策略，了解前端XSS、CSRF；

- support辅助技术
了解Bash常识、Git、Github;
了解基本的排序算法;
了解内存：深浅拷贝、堆栈的区别;
- 其他
有良好的撰写博客的习惯；
有自己的学习方法，会利用官方文档、MDN、Google、前端博客学习权威前端知识，修改过MDN的一些错误；
喜欢翻译一些英文文章(最近的一篇：[John Resig]How JavaScript Timer Work);

-------------------------------------------------------

Canvas画板【点击预览】
移动端使用画板，在MDN学习Canvas，用JS来控制颜色CSS样式切换。

3D Eyes【点击预览】
熟悉基本DOM操作以及CSS3。通过获取鼠标移动的位置来改变眼睛的转动角度。

Apple Slides（苹果风格的无缝轮播）
面向过程来管理每一张图片的位置状态实现切换。

MyGuid导航页【点击预览】
JS生成键盘，敲击相应的键，打开对应的网址。

------------------------------------------------------
自我描述:

我属于积极向上型，目标明确，在学校除了学习专业知识以外，最大的收获是自我成长。
喜欢分享，乐于倾听，所以会常逛知乎、刷微博、看博客拓展自己的视野，对新事物有较强的适应和接受能力。
热爱篮球运动，所以有良好的团队合作意识。
空闲的时间会去阅读，听歌丰富自己的生活。理想是敲出一个大家都会用的轮子。

`


writeCode("", text,() => {
    createPaper()
    writeCode(text, text1, () => {
        console.log(2)
        writeMarkDown(markDownText, () => {
            markDownToHtml(markDownText, () => {
                console.log(3)
            })
        })
    })
})

function markDownToHtml(markdown, Fn){
    let markdownBody = document.createElement('div')
    let content = document.querySelector('#content')
    markdownBody.id = 'markdownBody'
    markdownBody.className  ='markdown-body page'
    markdownBody.innerHTML = marked(markdown)
    content.replaceWith(markdownBody)
    Fn.call(undefined)
}

function writeMarkDown(markdown, Fn){
    let paper = document.querySelector('#paper')
    let content = document.createElement('div')
    content.id = 'content'
    paper.appendChild(content)
    console.log(marked(markdown))
    let n = 1
    let timer = setInterval(() => {
        paper.scrollTop = 10000
        content.innerHTML = markdown.substring(0, n)
        if(n >= markdown.length){
            window.clearInterval(timer)
            Fn.call(undefined)
        }
        n++
    }, 10)
}

function writeCode(pretext, text, fn){
    let code = document.querySelector("#code")
    let style = document.querySelector('#style')
    let n = 1
    code.innerHTML = pretext || ""
    let timer = setInterval(() => {
        code.scrollTop = 10000
        code.innerHTML = pretext + text.substring(0, n)
        code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css);
        style.innerHTML = pretext + text.substring(0, n)
        if(n >= text.length){
            window.clearInterval(timer)
            fn.call(undefined)
        }
        n++
    }, 10)
}



function createPaper(){
    let paper = document.createElement("pre")
    paper.id = 'paper'
    document.body.appendChild(paper)
}

