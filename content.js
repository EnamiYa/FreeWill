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
    let children = node.childNodes;
    children.forEach((cnode) => {
        console.log("checking stuff...");
        if ((cnode.className.includes('tiktok-cpwcw7-StyledCommonLink ejg0rhn40')) ){
            console.log(cnode.getAttribute("aria-label"))
            if(cnode.getAttribute("aria-label").includes('#foryoupage')){
                console.log("removed!")
                return true;
            }
        }
    });
    return false;
  };
  
  observer.observe(document.body, { childList: true, subtree: true });
