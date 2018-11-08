function redirect()
    { 
      window.location.href= "indexForm.html";
    }
const splash = () => {
window.setTimeout("redirect()",10000)}
window.onload= splash; 