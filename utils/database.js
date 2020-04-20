const mongoose = require('mongoose');

// Connect to DB
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.MONGO_URI, dbOptions, (err) => {
  if (!err) {
    console.log('MongoDB connection succeeded');
  } else {
    console.log(`Error connecting to MongoDB: ${JSON.stringify(err)}`);
  }
});
