var c = require(__dirname+'/control.js');
c().setPort(8888)
.setPageDir(__dirname+'/page')
.setTemplateDir(__dirname+'/tpl')
.setDb()
.setRequest();

console.log('Server running at http://127.0.0.1:8888');

