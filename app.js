const express = require('express');
const adminContentRouter = require('./routes/adminContent');
const app = express();
app.use(express.json());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/admin/whatnow/contents', adminContentRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});