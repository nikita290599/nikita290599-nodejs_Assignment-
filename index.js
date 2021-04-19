var http = require('http');
var url = require('url');
var fs = require('fs');
var vegetable = require('./vegetable.json');

http.createServer(function(req,res){
    // gets  url and related info
    const path = req.url;
    //parse the url and convert its params into an object
    const queryParams = url.parse(path,true).query;

    // function to calculate age
    function calculate_age(dob) { 
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms); 
      
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
    // Routing
    // Node.js Assignment Problem 1
    // If age needs to calculated than the path 'age' 
    // with params name , day, month , year can be used
    
    if(path.includes('age')){
        const name=queryParams.name;
        const date= queryParams.date;
        const month = queryParams.month;
        const year = queryParams.year;

        const age= calculate_age(new Date(year, month, date));
        res.setHeader('Content-Type', 'text/html');
        res.write(`<h3>Hello ${name}</h3>`);
        res.write(`<h3>Your age is ${age}</h3>`);
        res.end();
    }





    // Node.js Assignment Problem 2
    else if(path.includes('vegetables')){
        res.setHeader('Content-Type','application/json');
        res.write(JSON.stringify(vegetable));
        res.end();
        
    }



    // Node.js Assignment Problem 3
    // Query params types possible:-
    // object: circle, sphere
    // metric: 1. area(For circle)
    //         2. volume or surfaceArea(For Sphere)
    // radius: Integer value

    else if(path.includes('metrics')){
        const object= queryParams.object;
        const metric = queryParams.metric;
        const radius = queryParams.radius;
        res.setHeader('Content-Type', 'text/html');
        //functions to calculate area , surface area , and volume
        function area(radius){
            return(Math.PI*radius*radius);

        }
        function surfaceArea(radius){
            return(4*Math.PI*radius*radius);
        }
        function volume(radius){
            return((4*Math.PI*radius*radius*radius)/3);
        }
        if(object ==='circle'){
            res.write(`<h3>Area of Circle is ${area(radius)}</h3>`);
            res.end()
        }
        if(object ==='sphere'){
            if(metric==='surfaceArea'){
                res.write(`<h3>Surface Area of Sphere is ${surfaceArea(radius)}</h3>`);
                res.end()
            }
            else{
                res.write(`<h3>Volume of Sphere is ${volume(radius)}</h3>`);
                res.end()

            }
        }


    }
    else{
        res.write("Specify proper routes");
        res.end();
    }

    

}).listen(8080);