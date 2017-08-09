const batButtonContainer = document.createElement('div');
batButtonContainer.setAttribute('class', 'item-wrapper');

const batButton = document.createElement('button');
batButton.setAttribute('class', 'item item-button btn btn-warning');
batButton.textContent = '🦇 B.A.T.';

batButtonContainer.appendChild(batButton);
document.querySelector('.diagram-header').appendChild(batButtonContainer);

batButton.addEventListener('click', evt => {
  evt.preventDefault();

  const shareBtn = document.querySelector('[rel="share-button"] button');
  shareBtn.click();

  const optionBtn = document.querySelector('.option');
  optionBtn.click();

  const createLinkBtn = document.querySelector('.PublicLinkView .btn-primary');
  if(createLinkBtn) {
    createLinkBtn.click();
  }

  let pollFct;
  const checkForLink = function() {
    const linkInput = document.querySelector('.PublicLinkView input');
    if(linkInput) {
      window.clearInterval(pollFct);
      console.log('got my shareable link', linkInput.value);
      window.open('https://sebastianstamm.github.io/BAT/index.html#' + linkInput.value.substr(26), '_blank');
    }
  }
  pollFct = window.setInterval(checkForLink, 20);

});
