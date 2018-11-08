
const btnNotebook=document.getElementById('notebook');
const btnTablets=document.getElementById('tablets');
const btnAio=document.getElementById('aio');
 
btnNotebook.addEventListener('click',()=>{
    console.log(btnNotebook.id);
});
btnTablets.addEventListener('click',()=>{
    console.log(btnTablets.id);
});
btnAio.addEventListener('click',()=>{
    console.log(btnAio.id);
})