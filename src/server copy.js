import express from 'express';
const app = express();

//  Parse incoming request
app.use(express.json());

//  Implementing routes for server code for different resource operations; that's how front-end loads data
//  - update DB, etc
//  - Get /articles --> { upvotes: 0, comments: {}}
app.get('/hello', (req, res) => {
    console.log('Get a request on /hello!');
    res.send('Hello, my friend');
})

app.get('/hello/:name', (req, res) => {
    const { name } = req.params;
    res.send(`Hello ${name}!`);
})

//  POST request contains URL, data to write to DB
//  POST { email: 'js@gmail.com', password: 'abc'}
app.post('/hello', (req, res) => {
    const { name } = req.body;
    res.send(`Hello ${name}!`);
})

//  Updating Data
app.put('/')

app.listen(8080, () => console.log('Server is listening on port 8080'));
