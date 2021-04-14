import express from 'express';

//  fake memory DB to test Express Route; 
//  once working, will switch to MongoDB
const articlesInfo = [{
    name: 'learn-react',
    upvotes: 0,
    comments: [],
}, {
    name: 'learn-node',
    upvotes: 0,
    comments: [],
}, {
    name: 'my-thoughts-on-resumes',
    upvotes: 0,
    comments: [],
}];
const app = express();

//  Parse incoming JSON request string and adding to request body
//  otherwise, request body will be undefine
app.use(express.json());

//  Loading info about an article
//  GET /articles/:name  --> { upvotes: 1, comments: {...} }
app.get('/articles/:name', (req, res) => {
    const { name } = req.params;
    const articleInfo = articlesInfo.find(article => article.name === name);

    if (!articleInfo) return res.status(404).json({ message: "No article found" });
    res.status(200).json(articleInfo);
})

//  Adding upvotes to an article
//  PUT /articles/:name/upvotes -->  { upvotes: 1, comments: {...} } 
app.put('/articles/:name/upvotes', (req, res) => {
    const { name } = req.params;
    const articleInfo = articlesInfo.find(article => article.name === name);

    if (!articleInfo) return res.status(404).json({ message: "No article found" });
    articleInfo.upvotes += 1;

    res.status(200).json(articleInfo);
})
//  Adding comments to an article
//  POST /articles/:name/comments { author: 'Shaun', text: 'Great!' } -->
//  { upvotes: 1, comments: [{ author: ...}] }  
app.post('/articles/:name/comments', (req, res) => {
    const { name } = req.params;
    const { author, text } = req.body;

    const articleInfo = articlesInfo.find(article => article.name === name);

    if (!articleInfo) return res.status(404).json({ message: "No article found" });
    articleInfo.comments.push({ author, text });
    
    res.status(200).json(articleInfo);
})


app.listen(8080, () => console.log('Server is listening on port 8080'));
