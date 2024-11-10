const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connected succesfully');
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Todo service listening on port ${port}`);
});
