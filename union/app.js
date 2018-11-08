const paintData = (parNumberimg, parNumberpdf, parNumber, pdfimage, modalImg, modalp, html) => {
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
      h5.innerHTML = 'click';
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
                      paintData(snap.val().foto, snap.val().pdf, elementparNumber, snap.val()['img-pdf'], document.getElementById('imagen'), document.getElementById('descarga'), document.getElementById('tablaPar'));
                  })
              });
          })
      })
  }
  const btnValues = (valor) => {
      const notebook = firebase.database().ref(valor);
      const img = 'https://raw.githubusercontent.com/OshinVillegas/Lenovo/gh-pages/mi%20data/notebook/ideapad520/81BF004WLM/02_Ideapad_520_15inch_Hero_Front_facing_right_Multi-tasking_Bronzere.jpg';
      notebook.on("value", snap => {
          const key = Object.keys(snap.val());
          key.forEach(elementKey => {
              paint(img, elementKey, document.getElementById('tabla'), valor);
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