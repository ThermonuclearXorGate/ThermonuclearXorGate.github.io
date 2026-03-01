(function () {
  var varietes = [
    'Pompes Diamant',
    'Pompes sur une jambe',
    'Pompes Hindoues',
    'Pompes claquées',
    'Pompes classiques'
  ];

  var overrideDate = null;
  var overrideNombre = null;
  var overrideVariete = null;
  var overrideJoursRestants = null;
  var overrideModif = null;

  var computedNombre, computedVariete, computedJoursRestants, computedModif;

  function formatDateForInput(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1);
    var day = String(date.getDate());
    if (m.length === 1) m = '0' + m;
    if (day.length === 1) day = '0' + day;
    return y + '-' + m + '-' + day;
  }

  function calcValeurs(dateOptionnelle) {
    var d = dateOptionnelle ? new Date(dateOptionnelle + 'T12:00:00') : new Date();
    if (isNaN(d.getTime())) d = new Date();
    var seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();

    function seededRandom(s) {
      var x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    }

    var r = seededRandom(seed);
    var nombre = Math.floor(r * (100 - 20 + 1)) + 20;

    var epoch = new Date(2020, 0, 1);
    var diffDays = Math.floor((d - epoch) / (1000 * 60 * 60 * 24));
    var varieteIndex = Math.floor(diffDays / 3) % varietes.length;
    var variete = varietes[varieteIndex];
    var joursRestants = 2 - (diffDays % 3);
    var modificateur = null;

    if (variete === 'Pompes claquées') {
      nombre = Math.round(nombre / 2);
    }

    var rollModif = seededRandom(seed + 999);
    if (rollModif < 0.01) {
      modificateur = 10;
      nombre = nombre * 10;
    } else if (rollModif < 0.06) {
      modificateur = 3;
      nombre = nombre * 3;
    } else if (rollModif < 0.26) {
      modificateur = 2;
      nombre = nombre * 2;
    }

    computedNombre = nombre;
    computedVariete = variete;
    computedJoursRestants = joursRestants;
    computedModif = modificateur;
  }

  function getTexteJours(j) {
    return j === 1 ? '1 jour restant' : j + ' jours restants';
  }

  function afficher() {
    var nombreFinal = overrideNombre !== null ? overrideNombre : computedNombre;
    var variete = overrideVariete !== null ? overrideVariete : computedVariete;
    var joursRestants = overrideJoursRestants !== null ? overrideJoursRestants : computedJoursRestants;
    var modif = overrideModif !== null ? overrideModif : computedModif;

    var nombreAffiche = modif ? Math.floor(nombreFinal / modif) : nombreFinal;

    document.getElementById('pompes-variete').textContent = variete;
    document.getElementById('pompes-jours-restants').textContent = getTexteJours(joursRestants);
    document.getElementById('pompes-nombre').textContent = nombreAffiche + (modif ? '' : ' pompes');

    var elModif = document.getElementById('pompes-modificateur');
    var elModifValeur = document.getElementById('pompes-modificateur-valeur');
    if (modif) {
      elModif.textContent = '× ' + modif;
      elModif.className = 'pompes-modificateur x' + modif;
      elModif.style.display = '';
      elModifValeur.textContent = '= ' + nombreFinal + ' pompes';
      elModifValeur.style.display = '';
    } else {
      elModif.style.display = 'none';
      elModifValeur.style.display = 'none';
    }
  }

  calcValeurs();
  afficher();

  var keysPressed = {};
  document.addEventListener('keydown', function (e) {
    var k = (e.key || '').toLowerCase();
    keysPressed[k] = true;
    if (keysPressed['a'] && keysPressed['d'] && keysPressed['m'] && keysPressed['i'] && keysPressed['n']) {
      document.getElementById('admin-date').value = overrideDate !== null ? overrideDate : formatDateForInput(new Date());
      var modifAff = overrideModif !== null ? overrideModif : computedModif;
      var finalAff = overrideNombre !== null ? overrideNombre : computedNombre;
      document.getElementById('admin-nombre').value = modifAff ? Math.floor(finalAff / modifAff) : finalAff;
      document.getElementById('admin-variete').value = overrideVariete !== null ? overrideVariete : computedVariete;
      document.getElementById('admin-jours').value = String(overrideJoursRestants !== null ? overrideJoursRestants : computedJoursRestants);
      document.getElementById('admin-modif').value = overrideModif !== null ? String(overrideModif) : (computedModif ? String(computedModif) : '');
      document.getElementById('admin-overlay').classList.add('visible');
    }
  });
  document.addEventListener('keyup', function (e) {
    keysPressed[(e.key || '').toLowerCase()] = false;
  });

  document.getElementById('admin-apply').addEventListener('click', function () {
    var dateVal = document.getElementById('admin-date').value.trim();
    overrideDate = dateVal || null;
    calcValeurs(overrideDate || undefined);
    if (overrideDate) {
      document.getElementById('admin-nombre').value = computedModif ? Math.floor(computedNombre / computedModif) : computedNombre;
      document.getElementById('admin-variete').value = computedVariete;
      document.getElementById('admin-jours').value = String(computedJoursRestants);
      document.getElementById('admin-modif').value = computedModif ? String(computedModif) : '';
    }
    var baseInput = parseInt(document.getElementById('admin-nombre').value, 10) || 1;
    overrideModif = document.getElementById('admin-modif').value ? parseInt(document.getElementById('admin-modif').value, 10) : null;
    overrideNombre = overrideModif ? baseInput * overrideModif : baseInput;
    overrideVariete = document.getElementById('admin-variete').value;
    overrideJoursRestants = parseInt(document.getElementById('admin-jours').value, 10);
    afficher();
    document.getElementById('admin-overlay').classList.remove('visible');
  });

  document.getElementById('admin-reset').addEventListener('click', function () {
    overrideDate = null;
    overrideNombre = null;
    overrideVariete = null;
    overrideJoursRestants = null;
    overrideModif = null;
    calcValeurs();
    afficher();
    document.getElementById('admin-overlay').classList.remove('visible');
  });
})();
