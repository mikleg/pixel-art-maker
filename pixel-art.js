    var currentColor = "red"; //the current color for drawing
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


    function getCurrentColor() {
        return currentColor;
     }

    function setCurrentColor(color) {
        currentColor = color;
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
            changePoint (getCurrentColor(), node, "black");
        }

    }


// changes color and borderColor attributes
    function changePoint (color, node, borderColor){
        node.setAttribute("class", "whitePixel");
        if (color != "white")
            node.style.background = color;
        if (borderColor != "black")
            node.style.borderColor = borderColor;
        node.addEventListener("click", function(){
            clickEvent(node);
        });
        return node;
    }

// Makes a point (node) with given id, color and borderColor
    function makePoint (color, id, borderColor){
        var node = document.createElement("DIV");
        node.setAttribute("id", id);
        changePoint(color, node, borderColor);
        const textnode = document.createTextNode(String.fromCharCode(160));
        node.appendChild(textnode);
        return node;
    }

