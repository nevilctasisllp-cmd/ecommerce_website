const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

listener = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${listener.address().port}`);
});
