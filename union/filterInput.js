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
    console.log(pdfimage);

    a.addEventListener('click', () => {
        console.log(parNumberpdf);
        modalp.setAttribute('href', parNumberpdf);
        modalImg.setAttribute('src', pdfimage)
    })
}
firebase.database().ref().on("value", snap => {
    let firstKey = Object.keys(snap.val());
    firstKey.forEach(elementfirstKey => {
        firebase.database().ref(elementfirstKey).on("value", snap => {
            let secondKey = Object.keys(snap.val())
            secondKey.forEach(elementSecondKey => {
                firebase.database().ref(elementfirstKey).child(elementSecondKey).on("value", snap => {
                    // console.log(snap.val());
                    let search = Object.keys(snap.val());
                    search.forEach(e => {
                        if (e === 'F0CM0007LD') {
                            firebase.database().ref(elementfirstKey).child(elementSecondKey).child(e).on("value", snap => {
                                painSearch(snap.val().foto, snap.val().pdf, e, snap.val()['img-pdf'], document.getElementById('imagen'), document.getElementById('descarga'), document.getElementById('tablaPar'));
                            })
                        }
                    })
                })
            });
        })
    });
})