var countBox = 2;
var boxName = 0;

const submitButton = document.getElementById('submitButton');
let inputField = document.getElementById('Filters');

submitButton.addEventListener('click', function() {
    // Get the value of the input field
    const inputValue = inputField.value;
    inputField.value = "";
  
    // Save the input value in Chrome local storage
    function getKeywords(callback) {
        chrome.storage.local.get({key: []}, function(result) {
            var keywords = result.key || [];
            callback(keywords);
        });
    }
    getKeywords(function(keywords) {
    if(inputValue === "reset"){
        keywords = [];
    }else{
        keywords.push(inputValue);
    }
    chrome.storage.local.set({ key : keywords });
    });
  });
/*
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
*/

