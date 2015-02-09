module.exports = function()
{
    this.vars = {};
    this.assign = function(key, val) {

        this.vars[key] = val;
        return this;
    };

    this.display = function(path)
    {
        var self = this;
        self.fs.readFile(self.tplDir+path, 'utf8', function(err, data) {
            var ejs = require('ejs');
            var tpl = ejs.render(data, self.vars);

            self.res.writeHead(200, {'Content-Type': 'text/html'});
            self.res.write(tpl);
            self.res.end();

        });

    };

    return this;
}
