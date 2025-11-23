import express from 'express';

const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req,res) => {
    res.send('Name: Jana Cornejo, Section: IT4C, Program: Information Technology');
});

app.get('/hello/:name',(req,res) => {
    const name = req.params.name;
    res.send(`Hello ${name}`);
});

app.get('/foo/', (req, res) => {
    console.log(req.query);
});

app.get('/IT', (req, res) => {
    console.log(req.body);
});