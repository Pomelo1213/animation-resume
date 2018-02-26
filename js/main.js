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
/* oh 非常好，现在我需要一张白纸 */
`

var text1 = `
#code{
    width: 50%;
    height: 100vh;
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

writeCode("", text,() => {
    createPaper()
    writeCode(text, text1, () => {
        console.log(2)
    })
})

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
    }, 45)
}



function createPaper(){
    var paper = document.createElement("pre")
    paper.id = 'paper'
    document.body.appendChild(paper)
}

