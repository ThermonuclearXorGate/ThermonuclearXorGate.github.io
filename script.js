(function () {
  var donneesIdentite = {};
  var donneesPersonnalite = {};
  var donneesObjectifs = {};
  var vueIdentite = document.getElementById('vue-identite');
  var vuePersonnalite = document.getElementById('vue-personnalite');
  var vueObjectifs = document.getElementById('vue-objectifs');
  var vueResultat = document.getElementById('vue-resultat');
  var btnRetour = document.getElementById('btn-retour');
  var labelCopier = document.getElementById('label-copier');
  var labelCopierFeedback = document.getElementById('label-copier-feedback');

  function enleverErreurs(section) {
    if (!section) return;
    section.querySelectorAll('.msg-erreur').forEach(function (el) {
      el.remove();
    });
    var btn = section.querySelector('.btn-confirmer');
    if (btn) btn.classList.remove('btn-confirmer--erreur');
  }

  function afficherErreur(champ) {
    var msg = document.createElement('div');
    msg.className = 'msg-erreur';
    msg.innerHTML = '<span class="msg-erreur-icone">!</span><span class="msg-erreur-texte">Veuillez mettre quelque chose dans ce champ.</span>';
    champ.appendChild(msg);
  }

  function validerSection(section) {
    var champs = section.querySelectorAll('.champ');
    var btn = section.querySelector('.btn-confirmer');
    enleverErreurs(section);

    var hasError = false;
    champs.forEach(function (champ) {
      var input = champ.querySelector('input, textarea');
      if (!input) return;
      var value = (input.value || '').trim();
      if (value === '') {
        hasError = true;
        afficherErreur(champ);
      }
    });

    if (hasError && btn) {
      btn.classList.add('btn-confirmer--erreur');
      setTimeout(function () {
        btn.classList.remove('btn-confirmer--erreur');
      }, 2500);
    }
    return !hasError;
  }

  function enregistrerIdentite() {
    donneesIdentite = {
      prenom: (document.getElementById('prenom').value || '').trim(),
      age: (document.getElementById('age').value || '').trim(),
      sexePronom: (document.getElementById('sexe-pronom').value || '').trim(),
      activite: (document.getElementById('activite').value || '').trim(),
      etudes: (document.getElementById('etudes').value || '').trim(),
      origines: (document.getElementById('origines').value || '').trim()
    };
  }

  function enregistrerPersonnalite() {
    donneesPersonnalite = {
      qualites: (document.getElementById('qualites').value || '').trim(),
      defauts: (document.getElementById('defauts').value || '').trim(),
      passions: (document.getElementById('passions').value || '').trim()
    };
  }

  function enregistrerObjectifs() {
    donneesObjectifs = {
      objectifMois: (document.getElementById('objectif-mois').value || '').trim(),
      objectifAn: (document.getElementById('objectif-an').value || '').trim(),
      objectifVie: (document.getElementById('objectif-vie').value || '').trim(),
      objectifAutres: (document.getElementById('objectif-autres').value || '').trim()
    };
  }

  function construireTexteResultat() {
    var p = donneesIdentite;
    var r = donneesPersonnalite;
    var o = donneesObjectifs;
    return '╒═══════════╡** IDENTITÉ **╞═══════════╾┈\n' +
      ' ⦗ Prénom ⦘               ' + (p.prenom || '') + '\n' +
      ' ⦗ Age ⦘                      ' + (p.age || '') + '\n' +
      ' ⦗ Sexe/Pronom ⦘   ' + (p.sexePronom || '') + '\n' +
      ' ⦗ Activité ⦘               ' + (p.activite || '') + '\n' +
      ' ⦗ Études ⦘                  ' + (p.etudes || '') + '\n' +
      ' ⦗ Origines ⦘               ' + (p.origines || '') + '\n' +
      '╘═══════════════════════════════╾┈\n\n' +
      '╒═════════╡** PERSONNALITÉ **╞═════════╾┈\n' +
      ' ⦗ Qualités ⦘    ' + (r.qualites || '') + '\n' +
      ' ⦗ Défauts ⦘      ' + (r.defauts || '') + '\n' +
      ' ⦗ Passions ⦘   ' + (r.passions || '') + '\n' +
      '╘═══════════════════════════════╾┈\n\n' +
      '╒═══════════╡** OBJECTIFS **╞═══════════╾┈\n' +
      ' ⦗ Sur un mois ⦘   ' + (o.objectifMois || '') + '\n' +
      ' ⦗ Sur un an  ⦘          ' + (o.objectifAn || '') + '\n' +
      ' ⦗ Dans la vie ⦘         ' + (o.objectifVie || '') + '\n' +
      ' ⦗ Autres ⦘             ' + (o.objectifAutres || '') + ' \n' +
      '╘════════════════════════════════╾┈\n\n' +
      '-# Site pour faire la présentation: XXX';
  }

  function afficherPersonnalite() {
    vueIdentite.classList.add('vue-cachee');
    vueObjectifs.classList.add('vue-cachee');
    vueResultat.classList.add('vue-cachee');
    vuePersonnalite.classList.remove('vue-cachee');
    btnRetour.classList.add('visible');
  }

  function afficherObjectifs() {
    vueIdentite.classList.add('vue-cachee');
    vuePersonnalite.classList.add('vue-cachee');
    vueResultat.classList.add('vue-cachee');
    vueObjectifs.classList.remove('vue-cachee');
    btnRetour.classList.add('visible');
  }

  function afficherIdentite() {
    vuePersonnalite.classList.add('vue-cachee');
    vueObjectifs.classList.add('vue-cachee');
    vueResultat.classList.add('vue-cachee');
    vueIdentite.classList.remove('vue-cachee');
    btnRetour.classList.remove('visible');
    document.getElementById('prenom').value = donneesIdentite.prenom || '';
    document.getElementById('age').value = donneesIdentite.age || '';
    document.getElementById('sexe-pronom').value = donneesIdentite.sexePronom || '';
    document.getElementById('activite').value = donneesIdentite.activite || '';
    document.getElementById('etudes').value = donneesIdentite.etudes || '';
    document.getElementById('origines').value = donneesIdentite.origines || '';
  }

  function afficherResultat() {
    var texte = construireTexteResultat();
    if (labelCopier) labelCopier.textContent = texte;
    vueIdentite.classList.add('vue-cachee');
    vuePersonnalite.classList.add('vue-cachee');
    vueObjectifs.classList.add('vue-cachee');
    vueResultat.classList.remove('vue-cachee');
    btnRetour.classList.remove('visible');
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.btn-confirmer');
    if (!btn) return;

    var section = btn.closest('.identite, .personnalite, .objectifs');
    if (!section) return;

    if (!validerSection(section)) return;

    if (btn.getAttribute('data-vue') === 'identite') {
      enregistrerIdentite();
      afficherPersonnalite();
    }
    else if (btn.getAttribute('data-vue') === 'personnalite') {
      enregistrerPersonnalite();
      afficherObjectifs();
    }
    else if (btn.getAttribute('data-vue') === 'objectifs') {
      enregistrerObjectifs();
      afficherResultat();
    }
  });

  if (labelCopier) {
    labelCopier.addEventListener('click', function () {
      var texte = (labelCopier.textContent || '').trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texte).then(function () {
          labelCopierFeedback.classList.add('visible');
          setTimeout(function () {
            labelCopierFeedback.classList.remove('visible');
          }, 1500);
        });
      } else {
        var input = document.createElement('input');
        input.value = texte;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        labelCopierFeedback.classList.add('visible');
        setTimeout(function () {
          labelCopierFeedback.classList.remove('visible');
        }, 1500);
      }
    });
  }

  btnRetour.addEventListener('click', function () {
    if (!vueObjectifs.classList.contains('vue-cachee')) {
      afficherPersonnalite();
    } else {
      afficherIdentite();
    }
  });
})();
