const express = require("express");
const fs = require("fs");

const app = express();

app.get("/files/:fileName", function(req, res) {
    const name = req.params.fileName;
    console.log(name);
    fs.readFile(name, "utf-8", function(err, data) {
        if (err) {
            // Handle error
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        res.json({ data });
    });
});

app.listen(3005, () => {
    console.log("Server is running on port 3005");
});
