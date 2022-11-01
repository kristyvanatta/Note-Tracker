//dependencies
const express = require("express")
// const fs = require("fs");
// const path = require("path");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

//initialize
const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));



app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//listener
app.listen(PORT, () => console.log(`App listening on PORT: http://localhost:${PORT}`));