const fetch = require('node-fetch');
let apiKey = '0e717cd3e131ab52bfe30770428c992e';

var appRouter = function(app) {
    app.get("/", function(req, res) {
        res.send("Hello World");
    });

    let zipcode = 55455;// fixed the zipcode to University of Minnesota Twin Cities

	app.get('/search-location-weather', (req, res) => {
		//build api URL with user zip
		const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
		const apiId = '&appid=0e717cd3e131ab52bfe30770428c992e&units=imperial';

		const userLocation = (url1, url2, zipcode) => {

		   let newUrl = url1 + zipcode + url2;
		   return newUrl;
		};

		const apiUrl = userLocation(baseUrl, apiId, zipcode);


		fetch(apiUrl)
		.then(res => res.json())
		.then(data => {
            //data = {"cool": "JSON"}
            //var obj = JSON.parse(data);
            //var output = obj.weather[0];
            var main = data.main;
            var description = data.weather[2].description
            console.log(main);
			res.send(main);
		})
		.catch(err => {
			res.redirect('/error');
		});

	})

    // forcast 5 day 3 hr
    app.get('/search-location-forecast', (req, res) => {
		//build api URL with user zip
		const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
		const apiId = '&appid=0e717cd3e131ab52bfe30770428c992e&units=imperial';

		const userLocation = (url1, url2, zipcode) => {

		   let newUrl = url1 + zipcode + url2;
		   return newUrl;
		};

		const apiUrl = userLocation(baseUrl, apiId, zipcode);


		fetch(apiUrl)
		.then(res => res.json())
		.then(data => {
            //data = {"cool": "JSON"}
            //var obj = JSON.parse(data);
            //var output = obj.weather[0];
            var main = data.list[0].main;
            var description = data.list[0].weather[0].description;
            // iterate through the list index to ensure that we get each main and decription
            console.log(description);
			res.send(description);
		})
		.catch(err => {
			res.redirect('/error');
		});

	})

}

module.exports = appRouter;
