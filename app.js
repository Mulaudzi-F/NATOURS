const express = require('express');

const app = express();

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from from the server side!!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.end('You can post to this Url....');
// });

app.get('/api/v1/tours');

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on ${port}...`);
});
