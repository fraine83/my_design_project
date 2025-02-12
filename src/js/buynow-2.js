(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-buynow-2-open]'),
    closeModalBtn: document.querySelector('[data-buynow-2-close]'),
    modal: document.querySelector('[data-buynow]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('hidden');
  }
})();
