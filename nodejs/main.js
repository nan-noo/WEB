var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var template = require('./lib/template.js');
console.log('hello no daemon');

var app = http.createServer((request,response) => {
    var url = request.url;
    var base = request.headers.host; // localhost:3000
    var queryData = new URL(url, 'http://' + base).searchParams; // 객체 URLSearchParams {id => HTML}
    var pathname = new URL(url, 'http://' + base).pathname;
    var id = queryData.get('id');
    
    if(pathname === '/'){
        if(id === null){ //home
            fs.readdir('./data', (err, files) => {
                var title = 'Welcome';
                var desc = 'Hello, Node.js';
                var list = template.list(files);
                var body = `
                    <h2>${title}</h2>
                    <p>${desc}</p>
                `;
                var control = `
                    <a href="/create">create</a>
                `;
                var html = template.html(title, list, body, control);
                response.writeHead(200); // response success
                response.end(html);
            });
        }
        else{
            fs.readdir('./data', (err, files) => {
                var filteredId = path.parse(id).base;
                fs.readFile(`./data/${filteredId}`, 'utf8', (err, desc) => {
                    //if(err) throw err;
                    var title = filteredId;
                    var sanitizedTitle = sanitizeHtml(title);
                    var sanitizedDesc = sanitizeHtml(desc);
                    var list = template.list(files);
                    var body = `
                        <h2>${sanitizedTitle}</h2>
                        <p>${sanitizedDesc}</p>
                    `;
                    var control = `
                        <a href="/create">create</a>
                        <a href="/update?id=${sanitizedTitle}">update</a>
                        <form action="delete_process" method="POST" onsubmit="confirm('Really?')">
                            <input type="hidden" name="id" value="${sanitizedTitle}">
                            <input type="submit" value="delete">
                        </form>
                    `;
                    var html = template.html(sanitizedTitle, list, body, control);
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    }
    else if(pathname === '/create'){
        fs.readdir('./data', (err, files) => {
            var title = 'Web - Create';
            var list = template.list(files);
            var body = `
                <form action="/create_process" method="POST">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p>
                        <textarea name="desc" placeholder="description"></textarea>
                    </p>
                    <p><input type="submit"></p>  
                </form>
            `;
            var control = ``;
            var html = template.html(title, list, body, control);
            response.writeHead(200);
            response.end(html);
        });
    }
    else if(pathname === '/create_process'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var desc = post.desc;

            fs.writeFile(`data/${title}`, desc, 'utf8', (err) => {
                response.writeHead(302, {Location: `/?id=${title}`}); //redirect
                response.end();
            })
        });
    }
    else if(pathname === '/update'){
        fs.readdir('./data', (err, files) => {
            var filteredId = path.parse(id).base;

            fs.readFile(`data/${filteredId}`, 'utf8', (err, desc) => {
                //if(err) throw err;
                var title = filteredId;
                var sanitizedTitle = sanitizeHtml(title);
                var sanitizedDesc = sanitizeHtml(desc);
                var list = template.list(files);
                var body = `
                    <form action="/update_process" method="POST">
                        <input type="hidden" name="id" value="${sanitizedTitle}">
                        <p><input type="text" name="title" placeholder="title" value="${sanitizedTitle}"></p>
                        <p>
                            <textarea name="desc" placeholder="description">${sanitizedDesc}</textarea>
                        </p>
                        <p><input type="submit"></p>  
                    </form>
                `;
                var control = `
                    <a href="/create">create</a>
                    <a href="/update?id=${sanitizedTitle}">update</a>
                `;
                var html = template.html(sanitizedTitle, list, body, control);
                response.writeHead(200);
                response.end(html);
            });
        });
    }
    else if(pathname === '/update_process'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var desc = post.desc;
        
            fs.rename(`data/${id}`, `data/${title}`, (err) => {
                fs.writeFile(`data/${title}`, desc, 'utf8', (err) => {
                    response.writeHead(302, {Location: `/?id=${title}`}); //redirect
                    response.end();
                });
            });
            
        });
    }
    else if(pathname === '/delete_process'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var filteredId = path.parse(id).base;

            fs.unlink(`data/${filteredId}`, (err) => {
                response.writeHead(302, {Location: `/`}); //redirect
                response.end();
            });
            
        });
    }
    else{ // 404 not found
        response.writeHead(404); 
        response.end(`Not Found!!`);
    }   
});
app.listen(3000);