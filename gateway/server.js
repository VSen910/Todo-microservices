const dotenv = require('dotenv');

const app = require('./app');

dotenv.config();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Gateway listening on port ${port}`);
});
