const mongoose = require('mongoose');
const process = require('process');

/*
if(process.env.NODE_ENV !== 'production')
  connect to docker mongo
  process.env.MONGO_LOCAL
else
  connect to production
  process.env.MONGO_PRODUCTION
*/

let db = process.env.MONGO_PRODUCTION;

if (process.env.NODE_ENV !== 'production') {
  console.log('its development');
  db = process.env.MONGO_LOCAL;
}
console.log('DB>>>>', db);
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(' connected....');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.export = connectDB();
