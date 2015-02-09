// require http server
var http = require('http');
// require mysql
var mysql = require('mysql');
// require fs
var fs = require('fs');
var parentPage = require(__dirname+'/page.js');
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

    this.setTemplateDir = function(tplDir)
    {
        this.tplDir = tplDir;
        return this;
    }

    this.setRequest = function(defaultPg)
    {
        var self = this;
        // if default page is not set
        // set it to index
        defaultPg = defaultPg || 'index';

        // create server usinng http module
        http.createServer(function (req, res)
        {
            self.req = req; self.res = res;
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
            
            self.fs = fs;
            var page = require(fileUrl);
            // render page
            page.render.call(parentPage.call(self));

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


