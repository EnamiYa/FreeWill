var countBox = 2;
var boxName = 0;

function addInput()
{
    var boxLabel = "<label>Company " + countBox + "</label>";
    var element = document.getElementById('my-content');
    var html = '<div class="row">'+boxLabel+': <input type="text" id="'+boxName+'" value="'+boxName+'" " /></div>';
    appendHtml(element, html);
    countBox += 1;
    boxName += 1;
}

function appendHtml(el, str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    while (div.children.length > 0) {
        el.appendChild(div.children[0]);
    }
}