let newsList = []
let numNewsStories = 20;
let topics = "general";
let keyword = "";

const loadNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?category=${topics}&pagesize=${numNewsStories}${keyword}&apiKey=3e55faed737443bf89827a73de9aa361`
    let data = await fetch(url)
    let result = await data.json()
    newsList = result.articles
    showSourceList()
    render(newsList)
}

const render = (list) => {
    console.log("You call render and you have list", list)
    let newsHtml = list.map(item => `
    <div id="newsArea">
        <div id="news">
            <div id="contentsArea">
                <div id="title">${item.title}</div>
                <div id="source">${item.source.name}</div>
                <div id="publishedAt">${moment(item.publishedAt).fromNow()}</div>
                <div id="description">${item.description}</div>
                <div><button class="btn btn-secondary"><a href=${item.url} target="_blank">Read More</a></button></div>
            </div>
            <div id="imgArea">
                <img src="${item.urlToImage}" width=400px>
            </div>
        </div>
    </div>`).join('')
    document.getElementById("newsArea").innerHTML = newsHtml
}

document.getElementById("newsNum").innerHTML = `${numNewsStories}`

const showMore = () => {
    numNewsStories += 20;
    loadNews()
    document.getElementById("newsNum").innerHTML = `${numNewsStories}`
}

const busCag = () => {
    topics = "business";
    loadNews()
}

const entCag = () => {
    topics = "entertainment";
    loadNews()
}

const genCag = () => {
    topics = "general";
    loadNews()
}

const hthCag = () => {
    topics = "health";
    loadNews()
}

const sciCag = () => {
    topics = "science";
    loadNews()
}

const spoCag = () => {
    topics = "sports";
    loadNews()
}

const techCag = () => {
    topics = "technology";
    loadNews()
}

loadNews()

const searchByKeyword = () => {
    keyword = "&q="+document.getElementById("keywordArea").value
    loadNews()
    document.getElementById("keywordArea").value = ''
}

const showSourceList = () => {
    let sourceNames = newsList.map(item => item.source.name)
    let sourceObject = {}
    for (let i = 0; i < sourceNames.length; i++) {
        let sourceName = sourceNames[i]
        if (sourceObject[sourceName] == null) {
            sourceObject[sourceName] = 1
        } else {
            sourceObject[sourceName]++;
        }
    }
    let sourceList = Object.keys(sourceObject)
    console.log("sss", sourceList)
    let html = sourceList.map(item => `<div><input type="checkbox" value="${item}" onchange="searchBySource(event)"> ${item} (${sourceObject[item]})</div>`).join('')
    document.getElementById("sourceArea").innerHTML=html
}

let searchBySource = (event) => {
    if(event.target.checked == true){
        source = event.target.value
        let filteredList = newsList.filter(item => item.source.name === source)
        render(filteredList)
    } else {
        render(newsList)
    }
}