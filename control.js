// require http server
var http = require('http');
// require mysql
var mysql = require('mysql');
// require fs
var fs = require('fs');
// require config file
var config = require(__dirname+'/config.js');

module.exports = function(){
    this.setPort = function(port)
    {
        // set port to use
        this.port = port;
        return this;
    };

    this.setPageDir = function(dir) 
    {
        // set page directory
        this.pgDir = dir;
        return this;
    };

    this.setRequest = function(defaultPg)
    {
        var self = this;
        // if default page is not set
        // set it to index
        defaultPg = defaultPg || 'index';

        // create server usinng http module
        http.createServer(function (req, res)
        {
            // explode url by slash(/)
            var splits = req.url.split('/').reverse();

            var fileUrl = self.pgDir+req.url+'.js';
            // find the exact file to load base on the requst url
            while(!fs.existsSync(fileUrl) && splits.length > 1) 
            {
                fileUrl = fileUrl.replace('/'+splits[0], '');
                splits.splice(0, 1);
            }
        
            // set page to default
            if(splits.length < 2)
            {
                fileUrl = self.pgDir+'/'+defaultPg+'.js';
            }
        
            var page = require(fileUrl);
            page.render.call(self);
        
            self.db.query('select * from movie order by movie_id desc limit 1', function(err, rows) 
            {
                res.writeHead(200, {'Content-Type': 'text/html'});
                for(var i = 0; i < rows.length;i++)
                {
                    res.write('<h1>'+rows[i].movie_title+'</h1>');
                    res.write('<img src="'+rows[i].movie_cover+'" />');
                }
                res.end();
            });

        }).listen(this.port, 'localhost');

    };

    this.setDb = function()
    {
        // create a mysql connection
        // using the config file
        var conn = mysql.createConnection(
        {
            'host' : config.db.host,
           'user' : config.db.user,
            'password' : config.db.pass
        });

        conn.connect()
        conn.query('use '+config.db.dbname);
    
        // store it to global variable so we can use this later
        this.db = conn;

        return this;
    };

    return this;
}


