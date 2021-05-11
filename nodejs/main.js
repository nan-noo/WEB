var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var template = {
    html: function(title, list, body, control){
        return `
            <!doctype html>
            <html>
            <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                ${control}
                ${body}
            </body>
            </html>
        `;
    },
    list: function(files){
        var list = `<ul>`;
        files.forEach(file => {
            list += `<li><a href="/?id=${file}">${file}</a></li>`;
        })
        list += `</ul>`;
        return list;
    } 
};

var app = http.createServer((request,response) => {
    var _url = request.url;
    var queryData = new URL(_url, 'http://localhost:3000').searchParams; // 객체 URLSearchParams {id => HTML}
    var pathname = new URL(_url, 'http://localhost:3000').pathname;
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
                fs.readFile(`data/${id}`, 'utf8', (err, desc) => {
                    //if(err) throw err;
                    var title = id;
                    var list = template.list(files);
                    var body = `
                        <h2>${title}</h2>
                        <p>${desc}</p>
                    `;
                    var control = `
                        <a href="/create">create</a>
                        <a href="/update?id=${title}">update</a>
                        <form action="delete_process" method="POST" onsubmit="">
                            <input type="hidden" name="id" value="${title}">
                            <input type="submit" value="delete">
                        </form>
                    `;
                    var html = template.html(title, list, body, control);
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
            fs.readFile(`data/${id}`, 'utf8', (err, desc) => {
                //if(err) throw err;
                var title = id;
                var list = template.list(files);
                var body = `
                    <form action="/update_process" method="POST">
                        <input type="hidden" name="id" value="${title}">
                        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                        <p>
                            <textarea name="desc" placeholder="description">${desc}</textarea>
                        </p>
                        <p><input type="submit"></p>  
                    </form>
                `;
                var control = `
                    <a href="/create">create</a>
                    <a href="/update?id=${title}">update</a>
                `;
                var html = template.html(title, list, body, control);
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

            fs.unlink(`data/${id}`, (err) => {
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