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
    width: 400px;
    height: 400px;
    width: 700px;
    height: 700px;
    width: 900px;
    height: 900px;
    width: 50%;
    height: 100vh;
}
`
var markDownText = `
# hello
我的名字是Pomelo哈哈，这段话要是能看到就很开心啦。
# nihao 
> nihaonihao nihao 
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

