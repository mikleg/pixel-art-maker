
printCanvas();
//function printCanvas(height, width, symbol) {
function printCanvas() {


    /*
        for (var j = 0; j < height; j++) {
            var rez = '';
            for (var i = 0; i < (height - (1+j)); i++)
                rez = rez + String.fromCharCode(160);
            for (i = 0; i < j+2 ; i++)
                rez = rez + symbol;
            var node = document.createElement("P");
            var textnode = document.createTextNode(rez);
            node.appendChild(textnode);
            document.getElementById("pyramid").appendChild(node);

        }
    */
    var node = document.createElement("DIV");
    var att = document.createAttribute("background-color");
    att.value = "red";
    node.setAttributeNode(att);
    att = document.createAttribute("border");
    att.value = "5px solid green";
    node.setAttributeNode(att);
    var textnode = document.createTextNode("     ");
    node.appendChild(textnode);
    document.getElementById("canvas").appendChild(node);




}