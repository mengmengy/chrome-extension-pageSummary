//A simple summary of URLs
//When mousing over links on a webpage,
//the user will see summary of the linked page appear in popup content.
//Author: Mengmeng Yang G29987789

var links = document.getElementsByTagName("a");
for(var i = 0; i < links.length; i++){
	links[i].addEventListener('mouseover', mouseover);
	links[i].addEventListener('mouseout', mouseout);
}

//This should be done when mouse is over a link.
//It will popup an html which will display the linked page's title, all h1 headlines, first image and the first paragraph.
//If any of them doesn't exit, then the popup html will not show. 
function mouseover(e){
	var popup = document.createElement("div");
	popup.id = "mmyPopSummary";
	document.body.appendChild(popup);

    //When waiting for the results, this show.
    var waitingWords = document.createElement('h3');
    var node = document.createTextNode("Results are on the way...");
    waitingWords.appendChild(node);
	popup.appendChild(waitingWords);

    //Set the position of the popuped up summary. 
    //We want to get the position of the mouse relative to the brower window, so we set position "fixed".
    var xhr = new XMLHttpRequest();
    xhr.open("GET", e.target.href, true);
    xhr.onreadystatechange = function(){
    	//make sure load is sucessful and not an error.
    	if(xhr.readyState == 4 && xhr.status == 200){
    		popup.removeChild(waitingWords);

    		parser = new DOMParser();
    		var doc = parser.parseFromString(xhr.responseText, "text/html");
    		
            //Find the web page's title.
    		var title = doc.getElementsByTagName("title");
    		if(title.length > 0){
                var titleValue = title[0].childNodes[0].nodeValue;
                if(titleValue != null)
                    var titleTmp = "<h2>" + titleValue + "</h2>";
                else
                    titleTmp = 0;
            }
            else{
                titleTmp = 0;
            }

            //Find all the h1 headlines and list them.
            var h1 = doc.getElementsByTagName("h1");
            if(h1.length > 0){
                var h1Tmp = "";
                for(var i = 0; i < h1.length; i++){
                    var h1Value = h1[i].childNodes[0].nodeValue;
                    if(h1Value != null)
                        h1Tmp +="<li>" + h1Value + "</li>";
                }
                if(h1Tmp != null)      
                    h1Tmp = "<ul>" + h1Tmp + "</ul>";
                else
                    h1Tmp = 0;
            }
            else{
                h1Tmp = 0;
            }

            //Find the first paragraph.
            var p = doc.getElementsByTagName("p");
            if(p.length > 0){
                var pValue = p[0].childNodes[0].nodeValue;
                if(pValue != null)
                    var pTmp = "<p>" + pValue + "</p>";
                else
                    pTmp = 0;
            }
            else{
                pTmp = 0;
            }

            //Find the biggest image.
            var image = doc.getElementsByTagName("img");
            if(image.length > 0){
                var f = 0;
                var temp = 0;
                for(var i = 0; i < image.length; i++){
                    var bigImage = new Image();
                    bigImage.src = image[i].getAttribute("src");

                    var imageWidth = bigImage.width;
                    var imageHeight = bigImage.height;
                    var curArea = imageWidth * imageHeight;
                    
                    if(curArea > temp){
                        biggest = curArea;
                        temp = biggest;
                        f = i;
                    }
                    else{
                        biggest = temp;
                    }
                }

                var imageSrc = image[f].getAttribute("src");
                var imageTmp = "<div id='imgPart'>" + "<img " + "src = '" + imageSrc + "'>" + "</div>";
            }
            else{
                imageTmp = 0;
            }

            //Final output to the popup html. 
            //If nothing found, output "Oops! Difficult to summarize!".
            //Else, output all the things found.
            if(titleTmp == 0 && h1Tmp == 0 && pTmp == 0 && imageTmp == 0){
                document.getElementById("mmyPopSummary").innerHTML = "<h6>" + "Oops!  Difficult to summarize!" + "</h6>";
            }
            else{
                var s = "";
                if(titleTmp != 0){
                    s += titleTmp;
                }
                if(h1Tmp != 0){
                    s += h1Tmp;
                }
                if(pTmp != 0){
                    s += pTmp;
                } 
                if(imageTmp != 0){
                    s += imageTmp;
                }
            document.getElementById("mmyPopSummary").innerHTML = s;
            }

            //Handle the exception when the popup html exceeds the window.
            x = e.clientX;
            y = e.clientY;
            if(x + popup.clientWidth > document.documentElement.clientWidth){
                x = document.documentElement.clientWidth - popup.clientWidth;
             }
            else x = e.clientX;
            if(y + popup.clientHeight > document.documentElement.clientHeight){
                  y = document.documentElement.clientHeight - popup.clientHeight;
            }
            else y = e.clientY;
            popup.style.top = y + "px";
            popup.style.left = x + "px";
            popup.style.position = "fixed";

    	}
    }
    xhr.send();

}

//When mouse move out, the popup html disappear.
function mouseout(e){
		var rmlink = document.getElementById("mmyPopSummary");
		document.body.removeChild(rmlink);
}







