    var currentColor = "red"; //the current color for drawing
    var currentMouse = false;
    var flood = false; // if == true starts FloodFill function in clickEvent
    var maxRows = 20;
    var maxCols = 30;
    var allcolors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue" // some colors for palette
        ,"BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk"];
        //,"Crimson"
        //,"Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen"
        //,"Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey"
    // ,"DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite"
    // ,"ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew"
    // ,"HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue"
    // ,"LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon"
    // ,"LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen"
    // ,"Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue"
    // ,"MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite"
    // ,"Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed"
    // ,"PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon"
    // ,"SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen"
    // ,"SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
    drawCanvas(20,30, document.getElementById("canvas"));
    drawPalette(allcolors);
    drawCurrentColor();
    setRadioListener();
    setMouseUpDownListener();
    setColorPickerListener();
    setSaveListener();
    setLoadListener();
    setFloodFillListener();

    function getMaxCols() {
        return maxCols;
    }


    function setMaxCols(size) {
        maxCols = size;
    }

    function getMaxRows() {
        return maxRows;
    }


    function setMaxRows(size) {
        maxRows = size;
    }

    function getCurrentColor() {
        return currentColor;
     }


    function setCurrentColor(color) {
        currentColor = color;
    }

    function isCurrentMouse() {
        return currentMouse;
    }

    function setCurrentMouse(set) {
        currentMouse = set;
    }

    function setFlood(set) {
        flood = set;
    }

    function isFlood() {
        return flood;
    }
    //draws a canvas with given size and background color
    function drawCanvas(rows, columns, parent, borderColor)
    {
        if (borderColor == undefined)
            borderColor = "black";
        for (var i = 0; i < rows; i++) {
            var row = document.createElement("DIV");
            for (var j = 0; j < columns; j++){
                row.appendChild(makePoint("white",parent.getAttribute("id")+"_r"+ i +"c" + j, borderColor));
            }
            parent.appendChild(row);
        }
    }

    // Makes a point (node) with given id, color and borderColor
    function makePoint (color, id, borderColor){
        var node = document.createElement("DIV");
        node.setAttribute("id", id);
        changePoint(color, node, borderColor);
        const textnode = document.createTextNode(String.fromCharCode(160) + String.fromCharCode(160)
            + String.fromCharCode(160));
        node.appendChild(textnode);
        return node;
    }

    // changes color and borderColor attributes and adds some listeners for every point
    function changePoint (color, node, borderColor){
        node.setAttribute("class", "whitePixel");
        if (color != "white")
            node.style.background = color;
        if (borderColor != "black")
            node.style.borderColor = borderColor;
        node.addEventListener("click", function(){
            clickEvent(node);
        });
        node.addEventListener("mouseenter", function(){
            if (isCurrentMouse())
                clickEvent(node);
        });
        return node;
    }

    //draws current color point
    function drawCurrentColor(){
        drawCanvas(1,1, document.getElementById("currentColor"));
        changePoint (currentColor, document.getElementById("currentColor_r0c0"), "black");
        document.getElementById("currentColor_r0c0").textContent = String.fromCharCode(160) + String.fromCharCode(160)
            + String.fromCharCode(160) + String.fromCharCode(160);
    }

    //draws a palette with the given array of colors
    function drawPalette(colors){
        drawCanvas(1,colors.length, document.getElementById("palette"));
        for (var i = 0; i < colors.length; i++){
            changePoint (colors[i], document.getElementById("palette_r0c" + i), "black");
            document.getElementById("palette_r0c" + i).setAttribute("class", "pElement");
            document.getElementById("palette_r0c" + i).textContent = String.fromCharCode(160) + String.fromCharCode(160)
            + String.fromCharCode(160) + String.fromCharCode(160);

        }
    }

    //sets a current color if it called from the palette or changes a color of point in other case
    function clickEvent(node){
        var parent = node.parentNode;
        var grandParent = parent.parentNode;
        if (grandParent.getAttribute("id") == "palette"){
            setCurrentColor(window.getComputedStyle(node).backgroundColor);
            changePoint (getCurrentColor(), document.getElementById("currentColor_r0c0"), "black");
        }
        if (grandParent.getAttribute("id") == "canvas"){
            if (isFlood()){
                floodFill(node, window.getComputedStyle(node).backgroundColor, getCurrentColor());
                setFlood(false);
            }
            else {
                changePoint (getCurrentColor(), node, "black");
            }
        }
    }

// Gets the Radio value with given name
    function getRadioVal(name) {
        var val;
        var radios = document.getElementsByName(name);
        for (var i=0, len=radios.length; i<len; i++) {
            if ( radios[i].checked ) {
                val = radios[i].value;
                break;
            }
        }
        return val;
    }
// Sets the border of children elements with given style
    function setGrid(parentsId, grid) {
        const crows = document.getElementById(parentsId).childElementCount;
        const ccol = document.getElementById(parentsId).firstElementChild.childElementCount;
        for (var i =0; i < crows; i++){
            for(var j = 0; j < ccol; j++){
                var node = document.getElementById(parentsId + "_r"+ i +"c" + j);
                if (grid == "none")
                    node.style.borderColor = window.getComputedStyle(node).backgroundColor;
                else
                    node.style.borderColor = "black";
            }
        }
    }
//Sets the Radio listener
    function setRadioListener(){
        for (var k =0; k < 2; k++){
            document.getElementsByName("grid")[k].addEventListener("click", function(){
                     setGrid("canvas", getRadioVal("grid"));
           });
        }
    }
//Sets mousedown and up events listeners
    function setMouseUpDownListener(){
        document.getElementsByTagName("html")[0].addEventListener("mousedown", function(){
            setCurrentMouse(true);
        });
        document.getElementsByTagName("html")[0].addEventListener("mouseup", function(){
            setCurrentMouse(false);
        });
    }
//Sets Color picker listener and changes color current color window
    function setColorPickerListener() {
        document.getElementById("picker").addEventListener("change", function(){
            setCurrentColor(document.getElementById("picker").value);
            changePoint (currentColor, document.getElementById("currentColor_r0c0"), "black");
        });
    }
 // saves the current pixel art to a local storage after a click on the "save" button
    function setSaveListener() {
        document.getElementById("save").addEventListener("click", function(){
            const crows = document.getElementById("canvas").childElementCount;
            const ccol = document.getElementById("canvas").firstElementChild.childElementCount;
            localStorage.setItem("crows", crows);
            localStorage.setItem("ccol", ccol);
            for (var i =0; i < crows; i++){
                for(var j = 0; j < ccol; j++){
                    var node = document.getElementById("canvas" + "_r"+ i +"c" + j);
                    localStorage.setItem("canvas" + "_r"+ i +"c" + j,  JSON.stringify(window.getComputedStyle(node).backgroundColor));
                }
            }
        });
    }
//Deletes a current canvas and loads a saved canvas after a click on the "load" button
    function setLoadListener() {
        document.getElementById("load").addEventListener("click", function(){
            const crows = localStorage.getItem("crows");
            const ccol = localStorage.getItem("ccol");
            const parent = document.getElementById("canvas");
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
                const borderColor = "black";
                for (var i = 0; i < crows; i++) {
                    var row = document.createElement("DIV");
                    for (var j = 0; j < ccol; j++){
                        var name = "canvas"+"_r"+ i +"c" + j;
                        row.appendChild(makePoint( JSON.parse(localStorage.getItem(name)),name, borderColor));
                    }
                    parent.appendChild(row);
                }
        });
    }

//sets the flood listener
    function setFloodFillListener(){
        document.getElementById("flood").addEventListener("click", function(){
            setFlood(true);
        });
    }
//performs the "Flood fill"  Stack-based recursive implementation (four-way) algorithm from there "https://en.wikipedia.org/wiki/Flood_fill"
    function floodFill(node, targetColor, replacementColor){
        if (targetColor == replacementColor){
            return;
        }
        if (window.getComputedStyle(node).backgroundColor != targetColor ){
            return;
        }
        changePoint (replacementColor, node, window.getComputedStyle(node).borderColor);
        var row = node.parentNode;
        var i = 0;
        while( (node = node.previousSibling) != null )
            i++;
        const colindex = i;
        var  rowindex =0;
        for (var j=0; (row = row.previousSibling); j++){
              rowindex = j;}

         if (rowindex < getMaxRows()-1)
             floodFill(document.getElementById("canvas" + "_r"+ (rowindex + 1)+"c" + colindex), targetColor, replacementColor);
         if (rowindex > 0)
             floodFill(document.getElementById("canvas" + "_r"+ (rowindex - 1) +"c" + colindex), targetColor, replacementColor);
         if (colindex < getMaxCols()-1)
             floodFill(document.getElementById("canvas" + "_r"+ rowindex +"c" + (colindex + 1)), targetColor, replacementColor);
        if (colindex > 0)
            floodFill(document.getElementById("canvas" + "_r"+ rowindex +"c" + (colindex - 1)), targetColor, replacementColor);

        return;
    }