const express = require("express");
const app = express();

// Array of objects
const users = [{
    name: "John F Kennedy",
    kidneys: {
        healthy: false,
        donatable: false
    }
}, {
    name: "Shounak d grt",
    kidneys: {
        healthy: true,
        donatable: true
    }
}];

app.use(express.json());

app.get("/", function(req, res) {
    const johnKidneys = users[1].kidneys; // Accessing kidneys of the second user
    const numberofKidenys = Object.keys(johnKidneys).length; // Count the number of keys in the johnKidneys object
    let numberofHealthyKidneys = johnKidneys.healthy ? 1 : 0; // Check if kidneys are healthy
    let numberofUnhealthyKidneys = johnKidneys.healthy ? 0 : 1; // Check if kidneys are unhealthy

    // Update the count of healthy kidneys based on the updated users array
    if (users[0].kidneys.healthy) {
        numberofHealthyKidneys++;
    } else {
        numberofUnhealthyKidneys++;
    }

    res.json({
        johnKidneys,
        numberofKidenys,
        numberofHealthyKidneys,
        numberofUnhealthyKidneys
    });
});

app.post("/", function(req, res){
    const isHealthy = req.body.isHealthy;
    if (!Array.isArray(users[0].kidneys)) {
        users[0].kidneys = []; // Initialize as an array if not already one
    }
    users[0].kidneys.push({
        healthy: isHealthy
    });

    // Update the count of healthy kidneys
    const healthyKidneysCount = users[0].kidneys.filter(kidney => kidney.healthy).length;

    res.json({
        msg: "Done",
        healthyKidneysCount: healthyKidneysCount
    });
});

app.put("/", function(req, res){
    for(let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }

    res.json({
        msg: "All kidneys updated to healthy."
    });
});

// removing all the unhealthy kidneys
app.delete("/", function(req, res){

    const newKidneys =[];
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy:true
                })
        }
    }

    users[0].kidneys=newKidneys;
    res.json({msg:"done no unhealthy kidneys"})
});



const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
