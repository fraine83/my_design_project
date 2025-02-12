(() => {
  const refs = {
    openSellerBtn: document.querySelector('[data-sellers-open]'),
    closeSellerBtn: document.querySelector('[data-sellers-close]'),
    sellers: document.querySelector('[data-sellers]'),
  };

  refs.openSellerBtn.addEventListener('click', toggleModal);
  refs.closeSellerBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.sellers.classList.toggle('is-hidden');
  }
})();
