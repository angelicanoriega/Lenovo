

const paintData = (parNumberimg,parNumberimgList, parNumberpdf, parNumber, pdfimage, modalImg, modalp,modalpimg, html) => {
    const divColum = document.createElement('div');
    divColum.setAttribute('class', 'col-md-4');
    divColum.setAttribute('value', parNumberpdf);
    const divCard = document.createElement('div');
    divCard.setAttribute('class', 'card  d-flex justify-content-center align-items-center ');
    const img = document.createElement('img');
    img.setAttribute('class', 'card-img-top');
    img.setAttribute('src', parNumberimg);
    img.setAttribute('alt', parNumber);
    const title = document.createElement('h3');
    const a = document.createElement('a');
    a.setAttribute('class', 'btn btn-primary mt-3 mb-3 text-white');
    a.setAttribute('data-toggle', 'modal');
    a.setAttribute('data-target', '.bd-example-modal-lg');
    const h5 = document.createElement('h5');
    a.appendChild(h5);
    title.innerHTML = parNumber;
    h5.innerHTML = 'Ver';
    divColum.appendChild(divCard);
    divCard.appendChild(img);
    divCard.appendChild(title);
    divCard.appendChild(a);

    html.appendChild(divColum);
    a.addEventListener('click', () => {
        modalp.setAttribute('href', parNumberpdf);
        modalImg.setAttribute('src', pdfimage)
        modalpimg.setAttribute('href',parNumberimgList);
    })
}
const paint = (imgModelo, modelo, html, valor) => {
    const divColum = document.createElement('div');
    divColum.setAttribute('class', 'col-md-4');
    const divCard = document.createElement('div');
    divCard.setAttribute('class', 'card  d-flex justify-content-center align-items-center');
    const img = document.createElement('img');
    img.setAttribute('class', 'card-img-top');
    img.setAttribute('src', imgModelo);
    img.setAttribute('alt', modelo);
    const title = document.createElement('h3');
    const a = document.createElement('a');
    a.setAttribute('class', 'btn btn-primary mt-3 mb-3 text-white');
    const h5 = document.createElement('h5');
    a.appendChild(h5);
    title.innerHTML = modelo;
    h5.innerHTML = 'Ver';
    divColum.appendChild(divCard);
    divCard.appendChild(img);
    divCard.appendChild(title);
    divCard.appendChild(a);
    html.appendChild(divColum);

    a.addEventListener('click', () => {
        document.getElementById('first').setAttribute('class', 'hidden');
        document.getElementById('second').setAttribute('class', 'hidden');
        document.getElementById('thrid').removeAttribute('class');
        document.getElementById('tablaPar').innerHTML = '';
        firebase.database().ref(valor).child(title.innerHTML).on("value", snap => {
            const KeyparNumber = Object.keys(snap.val());
            KeyparNumber.forEach(elementparNumber => {

                firebase.database().ref(valor).child(title.innerHTML).child(elementparNumber).on("value", snap => {
                    
                    paintData(snap.val().foto,snap.val().imgs, snap.val().pdf, elementparNumber, snap.val()['img-pdf'], document.getElementById('imagen'), document.getElementById('descarga'), document.getElementById('descargaimg'), document.getElementById('tablaPar'));
                })
            });
        })
    })
}
const btnValues = (valor) => {
    const obj={
        valor:''
    }
        const imgD = 'https://github.com/OshinVillegas/Lenovo/blob/gh-pages/union/fotos%20para%20descarga/notebook/ideapad720s/81BD001KLM/03_IDEAPAD_720S_13INCH_Hero_Shot_Left_Web_browser_Champagne%20Gold.png?raw=true';
        const imgT='https://github.com/OshinVillegas/Lenovo/blob/gh-pages/union/fotos%20para%20descarga/tablets/tap%207%20essential/za300129PE/tablet-lenovo-tab-7-essential-7-ips-touch-1024x768-andr-D_NQ_NP_623582-MPE28183047610_092018-F.jpg?raw=true';
        const imgAio='https://github.com/OshinVillegas/Lenovo/blob/gh-pages/union/fotos%20para%20descarga/aio/ideacentre520/F0D4001DLD/01_AIO_520_Hero_with_KB_and_Mouse_Front_forward_facing.png?raw=true';
    if(valor==='tablets'){
        obj.valor=imgT;
    }
    else if(valor==='aio'){
        obj.valor=imgAio;
    }
    else if(valor==='notebook'){
        obj.valor=imgD;
    }
        const notebook = firebase.database().ref(valor);
    notebook.on("value", snap => {
        const key = Object.keys(snap.val());
        key.forEach(elementKey => {
            paint(obj.valor, elementKey, document.getElementById('tabla'), valor);
        });
    })
}
const btnNotebook = document.getElementById('notebook');
const btnTablets = document.getElementById('tablets');
const btnAio = document.getElementById('aio');
const returnsecond = document.getElementById('returnsecond');
btnNotebook.addEventListener('click', () => {
    document.getElementById('first').setAttribute('class', 'hidden');
    document.getElementById('second').removeAttribute('class');
    document.getElementById('tabla').innerHTML = '';
    btnValues(btnNotebook.id)
});
btnTablets.addEventListener('click', () => {
    document.getElementById('first').setAttribute('class', 'hidden');
    document.getElementById('second').removeAttribute('class');
    document.getElementById('tabla').innerHTML = '';
    btnValues(btnTablets.id)

});
btnAio.addEventListener('click', () => {
    document.getElementById('first').setAttribute('class', 'hidden');
    document.getElementById('second').removeAttribute('class');
    document.getElementById('tabla').innerHTML = '';
    btnValues(btnAio.id)
})
returnsecond.addEventListener('click', () => {
    document.getElementById('first').removeAttribute('class');
    document.getElementById('second').setAttribute('class', 'hidden');
    document.getElementById('thrid').setAttribute('class', 'hidden');
})
const lupIcon=document.getElementById('lup-icon');
const saveSearch=document.getElementById('saveSearch');
const form=document.getElementById('form');

lupIcon.addEventListener('click',()=>{
    lupIcon.setAttribute('class','hidden');
    form.removeAttribute('class');
    form.setAttribute('class','col-md-12');
})
saveSearch.addEventListener('click',()=>{
    lupIcon.removeAttribute('class');
    lupIcon.setAttribute('class','icon  fas fa-search p-3');
    form.setAttribute('class','hidden');

})
