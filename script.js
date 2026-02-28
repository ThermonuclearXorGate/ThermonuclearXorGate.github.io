(function () {
  var VUES = ['identite', 'personnalite', 'objectifs', 'resultat'];
  var donneesIdentite = {};
  var donneesPersonnalite = {};
  var donneesObjectifs = {};
  var vueCourante = 'identite';

  var elements = {
    vues: {
      identite: document.getElementById('vue-identite'),
      personnalite: document.getElementById('vue-personnalite'),
      objectifs: document.getElementById('vue-objectifs'),
      resultat: document.getElementById('vue-resultat')
    },
    btnRetour: document.getElementById('btn-retour'),
    pastilles: document.getElementById('pastilles-etape'),
    etapeNum: document.getElementById('etape-num'),
    labelCopier: document.getElementById('label-copier'),
    labelCopierFeedback: document.getElementById('label-copier-feedback'),
    btnExport: document.getElementById('btn-export')
  };

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

  function formatMultiligne(str) {
    if (!str) return '';
    var lines = str.split('\n');
    return lines.map(function (line, i) {
      if (i === 0) return line;
      if (i === lines.length - 1) {
        return '╚═════════╡  ' + line;
      }
      return '╠═════════╡  ' + line;
    }).join('\n');
  }

  function construireTexteResultat() {
    var p = donneesIdentite;
    var r = donneesPersonnalite;
    var o = donneesObjectifs;
    return '╒═══════════╡** IDENTITÉ **╞═══════════╾┈\n' +
      ' ⦗ Prénom ⦘               ' + formatMultiligne(p.prenom || '') + '\n' +
      ' ⦗ Age ⦘                      ' + formatMultiligne(p.age || '') + '\n' +
      ' ⦗ Sexe/Pronom ⦘   ' + formatMultiligne(p.sexePronom || '') + '\n' +
      ' ⦗ Activité ⦘               ' + formatMultiligne(p.activite || '') + '\n' +
      ' ⦗ Études ⦘                  ' + formatMultiligne(p.etudes || '') + '\n' +
      ' ⦗ Origines ⦘               ' + formatMultiligne(p.origines || '') + '\n' +
      '╘═══════════════════════════════╾┈\n\n' +
      '╒═════════╡** PERSONNALITÉ **╞═════════╾┈\n' +
      ' ⦗ Qualités ⦘    ' + formatMultiligne(r.qualites || '') + '\n' +
      ' ⦗ Défauts ⦘      ' + formatMultiligne(r.defauts || '') + '\n' +
      ' ⦗ Passions ⦘   ' + formatMultiligne(r.passions || '') + '\n' +
      '╘═══════════════════════════════╾┈\n\n' +
      '╒═══════════╡** OBJECTIFS **╞═══════════╾┈\n' +
      ' ⦗ Sur un mois ⦘   ' + formatMultiligne(o.objectifMois || '') + '\n' +
      ' ⦗ Sur un an  ⦘          ' + formatMultiligne(o.objectifAn || '') + '\n' +
      ' ⦗ Dans la vie ⦘         ' + formatMultiligne(o.objectifVie || '') + '\n' +
      ' ⦗ Autres ⦘             ' + formatMultiligne(o.objectifAutres || '') + ' \n' +
      '╘════════════════════════════════╾┈\n\n' +
      '-# Site pour faire la présentation: https://thermonuclearxorgate.github.io/';
  }

  function restaurerFormulaireIdentite() {
    document.getElementById('prenom').value = donneesIdentite.prenom || '';
    document.getElementById('age').value = donneesIdentite.age || '';
    document.getElementById('sexe-pronom').value = donneesIdentite.sexePronom || '';
    document.getElementById('activite').value = donneesIdentite.activite || '';
    document.getElementById('etudes').value = donneesIdentite.etudes || '';
    document.getElementById('origines').value = donneesIdentite.origines || '';
  }

  function mettreAJourPastilles(etape) {
    if (!elements.pastilles || !elements.etapeNum) return;
    if (etape === 0) {
      elements.pastilles.classList.add('cachee');
      elements.pastilles.setAttribute('aria-hidden', 'true');
      return;
    }
    elements.pastilles.classList.remove('cachee');
    elements.pastilles.setAttribute('aria-hidden', 'false');
    elements.etapeNum.textContent = String(etape);
    elements.pastilles.querySelectorAll('.pastille').forEach(function (pastille, i) {
      if (i + 1 === etape) {
        pastille.classList.add('pastille-active');
      } else {
        pastille.classList.remove('pastille-active');
      }
    });
  }

  function setVue(nom) {
    vueCourante = nom;
    VUES.forEach(function (id) {
      var el = elements.vues[id];
      if (el) {
        if (id === nom) {
          el.classList.remove('vue-cachee');
        } else {
          el.classList.add('vue-cachee');
        }
      }
    });

    if (nom === 'identite') {
      elements.btnRetour.classList.remove('visible');
      restaurerFormulaireIdentite();
      mettreAJourPastilles(1);
    } else if (nom === 'personnalite') {
      elements.btnRetour.classList.add('visible');
      mettreAJourPastilles(2);
    } else if (nom === 'objectifs') {
      elements.btnRetour.classList.add('visible');
      mettreAJourPastilles(3);
    } else if (nom === 'resultat') {
      elements.btnRetour.classList.remove('visible');
      mettreAJourPastilles(0);
      var texte = construireTexteResultat();
      if (elements.labelCopier) elements.labelCopier.textContent = texte;
    }
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.btn-confirmer');
    if (!btn) return;

    var section = btn.closest('.identite, .personnalite, .objectifs');
    if (!section) return;

    if (!validerSection(section)) return;

    if (btn.getAttribute('data-vue') === 'identite') {
      enregistrerIdentite();
      setVue('personnalite');
    } else if (btn.getAttribute('data-vue') === 'personnalite') {
      enregistrerPersonnalite();
      setVue('objectifs');
    } else if (btn.getAttribute('data-vue') === 'objectifs') {
      enregistrerObjectifs();
      setVue('resultat');
    }
  });

  if (elements.labelCopier) {
    elements.labelCopier.addEventListener('click', function () {
      var texte = (elements.labelCopier.textContent || '').trim();
      if (!texte) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texte).then(function () {
          elements.labelCopierFeedback.classList.add('visible');
          setTimeout(function () {
            elements.labelCopierFeedback.classList.remove('visible');
          }, 1500);
        });
      } else {
        var input = document.createElement('input');
        input.value = texte;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        elements.labelCopierFeedback.classList.add('visible');
        setTimeout(function () {
          elements.labelCopierFeedback.classList.remove('visible');
        }, 1500);
      }
    });
  }

  if (elements.btnExport) {
    elements.btnExport.addEventListener('click', function () {
      var texte = (elements.labelCopier && elements.labelCopier.textContent) ? elements.labelCopier.textContent.trim() : construireTexteResultat();
      if (!texte) return;
      var blob = new Blob([texte], { type: 'text/plain;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'presentation-archi-lourd.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  elements.btnRetour.addEventListener('click', function () {
    if (vueCourante === 'objectifs') {
      setVue('personnalite');
    } else {
      setVue('identite');
    }
  });

  mettreAJourPastilles(1);
})();
