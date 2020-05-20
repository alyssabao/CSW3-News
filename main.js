let newsList = []
let numNewsStories = 20;
let topics = "general";

const loadNews = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${topics}&pagesize=${numNewsStories}&apiKey=3e55faed737443bf89827a73de9aa361`
    let data = await fetch(url)
    let result = await data.json()
    newsList = result.articles
    render(newsList)
}

const render = (list) => {
    console.log("You call render and you have list",list)
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
