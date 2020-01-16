document.addEventListener('DOMContentLoaded', function() {
  bindBurger();
  bindCarousel();
  bindGallery();
  bindProducts();
  initCalculator()
  initMap();
})

function bindBurger() {
  const burger = document.getElementById('burger');
  const navBar = document.getElementById('navbar');
  burger.addEventListener('click', _e => {
    navBar.classList.toggle('expanded');
  });

  document.addEventListener('click', e => {
    if (e.target.id == 'burger') return;

    navBar.classList.remove('expanded');
  })
}

function bindGallery() {
  this.gallerySection = document.getElementById('gallery');
  this.gallery = document.getElementById('gallery-grid');
  this.totalImages = gallery.dataset.total;
  this.totalPages = this.totalImages / 6;
  this.currentPage = 1;

  this.loadGalleryPage = (pageNum) => {
    this.currentPage = pageNum;
    let from = 6 * (pageNum - 1);
    let to = 6 * pageNum;
    gallery.innerHTML = '';
  
    for(let i = from; i < to; i++) {
      let image = document.createElement('img');
      image.src = `./img/fotos/t/${i}_t.jpg`;
  
      let link = document.createElement('a');
      link.href = `./img/fotos/${i}.jpg`;
      link.target = '_blank';
  
      link.appendChild(image);
      this.gallery.appendChild(link);
    }
  }

  this.prevPage = e => {
    const newPage = this.currentPage - 1;
    if (newPage > 0)
      loadGalleryPage(newPage);
  }

  this.nextPage = e => {
    const newPage = this.currentPage + 1;
    if (newPage <= this.totalPages)
      loadGalleryPage(newPage);
  }

  this.gallerySection.querySelector('.prev').addEventListener('click', prevPage);
  this.gallerySection.querySelector('.next').addEventListener('click', nextPage);

  this.loadGalleryPage(1);

  this.setGalleryMinHeight = _ => {
    this.gallery.style.minHeight = this.gallery.clientHeight + 'px';
  }

  setTimeout(setGalleryMinHeight, 1000);
}




function bindCarousel() {
  this.carousel = document.getElementById('carousel');
  this.images = this.carousel.querySelectorAll('img');
  this.currentImage = 1;

  this.nextImage = _ => {
    let nextImage = this.currentImage + 1;
    if (nextImage >= this.images.length)
      nextImage = 1;
    
    this.changeImage(nextImage);
  }

  this.changeImage = imgNum => {
    this.currentImage = imgNum;
    this.images.forEach(img => {
      img.classList.remove('current');
    })
    this.images[imgNum].classList.add('current');
  }

  this.setInterval(this.nextImage, 8000);
}





function bindProducts() {
  this.products = document.querySelectorAll('#products .product');
  this.currentProduct = false;
  this.currentTimer = false;
  this.currentProductImages = [];
  this.currentImage = 0;

  this.showProduct = id => {
    if (this.currentTimer) {
      clearTimeout(this.currentTimer);
      this.currentTimer = false;
    }

    this.products.forEach( prod => {
      prod.classList.remove('current');
    })

    this.currentProduct = document.getElementById(id)
    this.currentProduct.classList.add('current');

    this.currentImage = 0;
    this.currentProductImages = this.currentProduct.querySelectorAll('.images a');
    this.currentTimer = setInterval( this.nextImage, 3000);
  }

  this.nextImage = _ => {
    let newImage = this.currentImage + 1;
    if (newImage >= this.currentProductImages.length)
      newImage = 0;
    
    this.currentImage = newImage;
    this.currentProductImages.forEach( img => {
      img.classList.remove('current')
    });
    this.currentProductImages[this.currentImage].classList.add('current');
  }

  document.querySelectorAll('#products .nav button').forEach( b => {
    b.addEventListener('click', e => { showProduct(e.target.dataset.product) });
  })

  showProduct(this.products[0].id);
}




function initMap() {
  this.mymap = L.map('map').setView([-34.71714803840951, -58.30205535624998], 14);
  this.startZoom = 9;
  this.markers = [];

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: ['a','b','c']
  }).addTo(this.mymap)

  //tec
  let marker1 = L.marker([-34.71714803840951, -58.30205535624998]).addTo(this.mymap);

  //semat
  let marker2 = L.marker([-34.71520787519164, -58.29338645671385]).addTo(this.mymap);

  this.markers["tec"] = marker1;
  this.markers["sem"] = marker2;

  this.centerMarker = (id) => {
    this.mymap.setView(this.markers[id].getLatLng(), 14);
  }

  this.mymap.flyTo(this.markers["tec"].getLatLng(), 14);

  document.getElementById('contact_semat').addEventListener('click', _ => {
    this.centerMarker("sem")
  });
  document.getElementById('contact_tecmoliq').addEventListener('click', _ => {
    this.centerMarker("tec")
  });
}




function initCalculator() {
  this.values = {
    'a-50' : {
      2: {40: 1.8},
      3: {20: 2.7, 30: 4.4, 40: 5.5},
      4: {20: 3.6, 30: 6.6, 40: 8.6},
      5: {20: 4.7, 30: 8.6, 40: 12.5}},
    'a-90-1' : {
      1: {20: 0.37, 30: 0.69, 40: 1},
      2: {20: 1.3, 30: 2.27, 40: 2.8},
      3: {20: 2.72, 30: 4.54, 40: 6.20},
      4: {20: 4.37, 30: 7.69, 40: 9.75},
      5: {20: 6.10, 30: 11.23, 40: 14.30, 50: 17.75, 60: 20.30}},
    'a-90-2' : {
      4: {20: 14,30: 17, 40: 20.5},
      5: {20: 14,30: 18, 40: 21, 50: 30, 60: 34}}
  };

  this.values = {
    'a-50' : {
      20: {3: 2.7, 4: 3.6, 5: 4.7},
      30: {3: 4.4, 4: 6.6, 5: 8.6},
      40: {2: 1.8, 3: 5.5, 4: 8.6, 5: 12.5}},
    'a-90-1' : {
      20: {1: 0.37, 2: 1.3, 3: 2.72, 4: 4.37, 5: 6.10},
      30: {1: 0.69, 2: 2.27, 3: 4.54, 4: 7.69, 5: 11.23},
      40: {1: 1, 2: 2.8, 3: 6.20, 4: 9.75, 5: 14.30},
      50: {5: 17.75},
      60: {5: 20.30}},
    'a-90-2' : {
      20: {4: 14, 5: 14},
      30: { 4: 17, 5: 18},
      40: { 4: 20.5, 5: 21},
      50: {5: 30},
      60: {5: 34}}
  };

  this.currentData = values['a-90-1'];
  this.presureValues = [];
  this.currentPresure = 40;
  this.holeValues = [];
  this.currentHole = 4;
  this.width_i = false;
  this.speed_i = false;
  this.surface_i = false;
  this.caudal_i = false;
  this.enabledAtoms = 4;
  this.presure = document.getElementById('presure');
  this.wrapper = document.getElementById('calculator');

  this.setPresureData = (_e) => {
    // ajusto presión a valores posibles según atomizador
    let presure = 
    this.currentPresure = parseInt(this.presure.value);

    this.currentData = this.values[this.type.value];
    this.presureValues = _.keys(this.currentData);
    let minPre = _.min(this.presureValues);
    let maxPre = _.max(this.presureValues);

    if (this.currentPpresure < minPre) this.currentPresure = minPre;
    if (this.currentPresure > maxPre) this.currentPresure = maxPre;

    this.presure.value = this.currentPresure;
    this.presure.min = minPre;
    this.presure.max = maxPre;

    this.holeValues = _.keys(this.currentData[this.currentPresure]);
  }

  this.calcSurface = _e => {
    // calculo superficie según velocidad y ancho
    let multi = document.getElementById('checkVelocidad').checked ? 373 : 600;
    //console.log(multi);
    let width = parseInt(this.width_i.value);
    //console.log(width);
    let speed = parseInt(this.speed_i.value);
    //console.log(speed);
    this.surface_i.value = (width * speed / multi).toFixed(2);
    //console.log(this.surface_i.value);
  }

  this.calcHoles = _e => {
    // valor esperado
    expected = parseFloat(this.surface_i.value) * parseFloat(caudal_i.value);
    //console.log(expected);

    // calculo para cada tamaño de orificio
    calcs = []
    _.each(this.presureValues, (pre) => {
      _.each(_.keys(this.currentData[pre]), (hole) => {
        hole = parseInt(hole);
        calc = this.enabledAtoms * 2 * this.currentData[pre][hole];
        calcs.push([calc, [hole, pre]]);
      })
    });
    //console.log(calcs);

    let minPair = false;
    // busco par [orificio,presión] mínimo para cubrir valor esperado
    _.each(calcs, (pair) => {
      if (pair[0] > expected) {
        if (!minPair) minPair = pair;
        if (pair[0] < minPair[0]) minPair = pair;
      }
    });

    // seteo orificio mínimo o muestro error
    if (minPair) {
      //console.log(minPair[0]+" "+minPair[1][0]+" "+minPair[1][1]);
      document.querySelectorAll('.hole').forEach( el => {
        el.value = minPair[1][0];
      })
      document.querySelectorAll('.hole.disabled').forEach( el => {
        el.value = '';
      });
      this.currentPresure = minPair[1][1];
      this.presure.value = this.currentPresure;
      this.wrapper.classList.remove('with_error');
    } else {
      this.wrapper.classList.add('with_error');
    }
  }

  this.checkAtom = (e) => {
    check = e.target;
    atom = check.parentElement.querySelector('.hole');
    if (check.checked) {
      atom.disabled = true;
      atom.classList.add('disabled');
    } else {
      atom.disabled = false;
      atom.classList.remove('disabled');
    }
    this.enabledAtoms = document.querySelectorAll('.hole:not(.disabled)').length;
    this.calcHoles();
  }

  this.width_i = document.getElementById('width');
  this.speed_i = document.getElementById('speed');
  this.surface_i = document.getElementById('surface');
  this.caudal_i = document.getElementById('caudal');
  this.type = document.getElementById('atom_type');
  this.type.addEventListener('change', this.setPresureData);
  this.type.addEventListener('input', this.setPresureData);
  document.querySelectorAll('#width, #speed').forEach( el => {
    el.addEventListener('change', this.calcSurface);
    el.addEventListener('input', this.calcSurface);
  });
  document.querySelectorAll('#presure, #caudal').forEach( el => {
    el.addEventListener('change', this.calcHoles);
    el.addEventListener('input', this.calcHoles);
  });
  document.querySelectorAll('.disable_atom').forEach( el => {
    el.addEventListener('change', this.checkAtom);
  });

  this.setPresureData();
  this.calcSurface();
  this.calcHoles();
}
