const painSearch = (parNumberimg, parNumberimgList,parNumberpdf, parNumber, pdfimage, modalImg, modalp, html) => {
  const divColum = document.createElement('div');
  divColum.setAttribute('class', 'col-md-6');
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
    modalImg.setAttribute('src', pdfimage);
    modalpimg.setAttribute('href',parNumberimgList);

  })
}
const userSearch = document.getElementById('equipment-search');
const btnUserSearch = document.getElementById('btn-search');
const returnspecifit=document.getElementById('returnspecifit');
const search = (user) => {
  firebase.database().ref().on("value", snap => {
    let firstKey = Object.keys(snap.val());
    firstKey.forEach(elementfirstKey => {
      firebase.database().ref(elementfirstKey).on("value", snap => {
        let secondKey = Object.keys(snap.val())
        secondKey.forEach(elementSecondKey => {
          firebase.database().ref(elementfirstKey).child(elementSecondKey).on("value", snap => {
            let arraySearch = Object.keys(snap.val());
            arraySearch.forEach(arraySearchelement => {
              if (arraySearchelement === user) {
                firebase.database().ref(elementfirstKey).child(elementSecondKey).child(arraySearchelement).on("value", snap => {
                  console.log(snap.val());
                  
                  document.getElementById('tablaPar').innerHTML='';
                  paintData(snap.val().foto,snap.val().imgs, snap.val().pdf, arraySearchelement, snap.val()['img-pdf'], document.getElementById('imagen'), document.getElementById('descarga'), document.getElementById('descargaimg'), document.getElementById('tablaPar'));
            })
              }
              // else{                 
              //   console.log('hola');
                 
              //   firebase.database().ref(elementfirstKey).child(elementSecondKey).child(arraySearchelement).on("value", snap => {
              //     paintData(snap.val().foto,snap.val().imgs, snap.val().pdf, arraySearchelement, snap.val()['img-pdf'], document.getElementById('imagen'), document.getElementById('descarga'), document.getElementById('descargaimg'), document.getElementById('tablaPar'));
              //   })
              // }
            });
          })
        });
      })
    });
  })
}
btnUserSearch.addEventListener('click', () => {
  document.getElementById('first').setAttribute('class', 'hidden');
  document.getElementById('second').setAttribute('class', 'hidden');
  document.getElementById('thrid').removeAttribute('class');
  console.log(userSearch.value);
  
  search(userSearch.value)
})
returnspecifit.addEventListener('click', () => {
  document.getElementById('first').removeAttribute('class');
  document.getElementById('second').setAttribute('class', 'hidden');
  document.getElementById('thrid').setAttribute('class', 'hidden');
})