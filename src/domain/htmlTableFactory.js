var pages = require('./pages')

function createTable(title, fields, objArray, table, error)
{
    var html = '<html>'
    html += '<head>'
    html += '<title>'+title+'</title>'
    html += `<script>function deleteRow(index){

                var objArray = ${JSON.stringify(objArray)} 
                fetch("http://localhost:3000/${table}/delete", {
                    method: 'POST',
                    body: JSON.stringify(objArray[index]),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    // HTTP 301 response
                    if (response.redirected) {
                        window.location.href = response.url;
                    }
                })

            }</script>`
    html+= '</head>'
    html += '<body>'


    //send an delete request after the form is submitted

    
    //add butons to route to other pages using for each tabelas
    pages.forEach(function(page){
        html += '<a href="/' + page.tabela + '">' + page.titulo + '</a><br>'
    } )

    html += '<h1>'+title+'</h1>'
    if(objArray.length === 0){
        html += '<p>Nenhum registro encontrado</p>'
    }
    else{
        html += '<table border=1>'
        
        html += '<tr>';
        for(var fieldIndex in fields){
            html += '<th>'+fields[fieldIndex]+'</th>'
        }
        html += '</tr>'
    
        for(var i = 0; i < objArray.length; i++){
            html += '<tr>'
            for(var fieldIndex in fields){
                html += '<td>' + objArray[i][fields[fieldIndex]] + '</td>'
            }

            html += '<td>'
            html += `<button onclick="deleteRow(${i})"> DELETE </button>`
            html += '</td>'

            html += '</tr>'
        }
    
        html += '</table>'
    }

    //add new obj form
    html += '<form action="/'+table+'" method="post">'

    html += '<table>'
    html += '<tr>'
    for(var fieldIndex in fields){
        html += `<th><label for="${fields[fieldIndex]}">${fields[fieldIndex]}</label></th>`
    }
    html += '</tr>'
    
    html += '<tr>'
    for(var fieldIndex in fields){
        html += '<td>'
        html += `<input id="${fields[fieldIndex]}" type="text" name="${fields[fieldIndex]}">`
        html += '</td>'
    }

    html += '</tr>'
    html += '</table>'

    html += '<input type="submit" value="Submit">'

    // show error message if exists
    if(error){
        html += `<p>${error}</p>`
    }

    html += '</form>'

    html += '</body></html>'
    return html;
}

module.exports = createTable;