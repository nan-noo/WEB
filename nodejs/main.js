var http = require('http');
var fs = require('fs');

var templateHTML = (title, body, list) =>
    `
        <!doctype html>
        <html>
        <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            ${body}
        </body>
        </html>
    `;

var templateList = (files) => {
    var list = `<ul>`;
    files.forEach(file => {
        list += `<li><a href="/?id=${file}">${file}</a></li>`;
    })
    list += `</ul>`;
    return list;
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
                var list = templateList(files);
                var body = `<h2>${title}</h2><p>${desc}</p>`;
                var template = templateHTML(title, body, list);
                response.writeHead(200); // response success
                response.end(template);
            });
        }
        else{
            fs.readdir('./data', (err, files) => {
                fs.readFile(`data/${id}`, 'utf8', (err, desc) => {
                    //if(err) throw err;
                    var title = id;
                    var list = templateList(files);
                    var body = `<h2>${title}</h2><p>${desc}</p>`;
                    var template = templateHTML(title, body, list);
                    response.writeHead(200); // response success
                    response.end(template);
                });
            });
        }
    }
    else{
        response.writeHead(404); // 404 not found
        response.end('<h1>Not Found</h1>');
    }   
});
app.listen(3000);