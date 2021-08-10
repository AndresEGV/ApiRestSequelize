const express = require("express");
app = express();
const db = require("./models/");
db.sequelize.sync();
const cors = require("cors");
var corsOptions = {
    origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(express.json());

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido." });
});
require("./routes/tutorial.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor up en puerto ${PORT}.`);
});