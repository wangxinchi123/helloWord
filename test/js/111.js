
window.onload = function(){
	var blockquote = document.getElementsByTagName("blockquote");
	for(var i=0;i<blockquote.length;i++){
		if(!blockquote[i].getAttribute("cite")){
			continue;
		}
		var url = blockquote[i].getAttribute("cite");
		var quoteChlidren = blockquote[i].getElementsByTagName("*");
		if(quoteChlidren.length < 1){
			continue;
		}
		var elem = quoteChlidren[quoteChlidren.length - 1];
		var link = document.createElement("a");
		var link_text = document.createTextNode("source");
		link.appendChild(link_text);
		link.setAttribute("href",url);
		var superscript = document.createElement("sup");
		superscript.appendChild(link);
		elem.appendChild(superscript);
	}
}

