const painSearch = (parNumberimg, parNumberpdf, parNumber, pdfimage, modalImg, modalp, html) => {
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
  h5.innerHTML = 'click';
  divColum.appendChild(divCard);
  divCard.appendChild(img);
  divCard.appendChild(title);
  divCard.appendChild(a);
  html.appendChild(divColum);

  a.addEventListener('click', () => {
    modalp.setAttribute('href', parNumberpdf);
    modalImg.setAttribute('src', pdfimage)
  })
}
const userSearch = document.getElementById('equipment-search');
const btnUserSearch = document.getElementById('btn-search');
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
                  console.log(arraySearchelement);
                  document.getElementById('tablaPar')='';

                  paintData(snap.val().foto, snap.val().pdf, arraySearchelement, snap.val()['img-pdf'], document.getElementById('imagen'), document.getElementById('descarga'), document.getElementById('tablaPar'));
                })
              }
            });
          })
        });
      })
    });
  })
}
btnUserSearch.addEventListener('click', () => {
  search(userSearch.value)
})