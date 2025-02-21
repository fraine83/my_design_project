// (() => {
//     const refs = {
//       openModalBtn: document.querySelector("[data-modal-open]"),
//       closeModalBtn: document.querySelector("[data-modal-close]"),
//       modal: document.querySelector("[data-modal]"),
//     };
  
//     refs.openModalBtn.addEventListener("click", toggleModal);
//     refs.closeModalBtn.addEventListener("click", toggleModal);
  
//     function toggleModal() {
//       refs.modal.classList.toggle("is-hidden");
      
//     }
//   })();

(() => {
  // Function to handle modal opening
  const openModal = (event) => {
    const trigger = event.currentTarget;
    // Get the dataset key that ends with "-open"
    const targetKey = Object.keys(trigger.dataset).find(key => key.endsWith("Open"));

    if (targetKey) {
      // Convert "loginOpen" → "login", "buynowOpen" → "buynow", etc.
      const modalAttr = targetKey.replace("Open", "");
      const modal = document.querySelector(`[data-${modalAttr}]`);

      if (modal) {
        modal.classList.remove("is-hidden"); // Show the modal
      }
    }
  };

  // Function to handle modal closing
  const closeModal = (event) => {
    const modal = event.currentTarget.closest(".modal, .login, .review, .buynow, .buynow2, .subscribe");
    if (modal) {
      modal.classList.add("is-hidden"); // Hide the modal
    }
  };

  // Function to close modal when clicking outside the modal content
  const closeModalOnOutsideClick = (event) => {
    if (event.target.classList.contains("modal") || event.target.classList.contains("login") || event.target.classList.contains("review") || event.target.classList.contains("buynow") || event.target.classList.contains("buynow2") || event.target.classList.contains("subscribe")) {
      event.target.classList.add("is-hidden");
    }
  };

  // Find all modal trigger buttons and attach event listeners
  const modalTriggers = document.querySelectorAll("[data-login-open], [data-buynow-open], [data-buynow2-open], [data-review-open], [data-subscribe-open]");
  modalTriggers.forEach(trigger => {
    trigger.addEventListener("click", openModal);
  });

  // Find all close buttons inside modals and attach event listeners
  const closeButtons = document.querySelectorAll("[data-login-close], [data-buynow-close], [data-buynow2-close], [data-review-close], [data-subscribe-close]");
  closeButtons.forEach(button => {
    button.addEventListener("click", closeModal);
  });

  // Attach event listener to window for closing modals on outside click
  window.addEventListener("click", closeModalOnOutsideClick);
})();