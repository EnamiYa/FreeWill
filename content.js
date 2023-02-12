console.log("hello world")



const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        // Check if the added node is a TikTok video
        if (node.nodeName === 'DIV' && node.className.includes('tiktok-1nncbiz-DivItemContainer etvrc4k0')) {
          // Skip this TikTok if it matches a specific criteria
          

          if (shouldSkip(node)) {
            node.remove();
          }
        }
        
      });
    });
  });
  
  const shouldSkip = (node) => {
    // Add your logic to determine if a TikTok should be skipped her
        console.log("hello?")
        function getKeywords(callback) {
          chrome.storage.local.get({key: []}, function(result) {
              var keywords = result.key || [];
              callback(keywords);
          });
      }

      getKeywords(function(keywords) {
        console.log(keywords);
        // Use the value of keywords here
        let children = node.querySelectorAll('div.etvrc4k1 > div.etvrc4k7 > div.ejg0rhn0 > a.ejg0rhn4');
    children = Array.from(children).filter(node => {
        let ariaLabel = node.getAttribute('aria-label');
        if (!ariaLabel) return false;
        let word = ariaLabel.split(/#(\w+)\s/)[1];
        console.log(ariaLabel);
        console.log(word);
        return keywords.includes(word);
      });
      if(children.length !== 0){
        console.log("removing!...")
      }
      return children.length !== 0;
    });
        
      
    /*
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/filter_content",
        data: JSON.stringify({ "keywords": ["word1", "word2"], "input_texts": ["ifhdwd", "diwdha"] }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log("Data received:", data);
          result = data;
          if(result === false){
            console.log("removing!")
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error:", textStatus, errorThrown);
          }

      });
      */
      
    
    
  };
  
  observer.observe(document.body, { childList: true, subtree: true });
