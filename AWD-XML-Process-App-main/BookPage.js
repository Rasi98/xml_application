function AddBook() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/books/add", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        book:{
            author:document.getElementById("author").value,
            title:document.getElementById("name").value,
            genre:document.getElementById("genre").value,
            price:document.getElementById("price").value,
            description:document.getElementById("description").value
        }
    }));
    document.getElementById("author").value=""
    document.getElementById("name").value=""
    document.getElementById("genre").value=""
    document.getElementById("price").value=""
    document.getElementById("description").value=""
    setTimeout(loadDoc,1000);
}

function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            myFunction(this);
        }
    };
    xhttp.open("GET", "book.xml", true);
    xhttp.send();
}
function myFunction(xml) {
    let i;
    const xmlDoc = xml.responseXML;
    let table = "<tr><th>Name</th><th>Author</th><th>Genre</th><th>Price</th><th>Description</th></tr>";
    const x = xmlDoc.getElementsByTagName("book");
    for (i = 0; i <x.length; i++) {
        table += "<tr><td>" +
            x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("author")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("genre")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
            "</td></tr>";
    }
    document.getElementById("demo").innerHTML = table;
}