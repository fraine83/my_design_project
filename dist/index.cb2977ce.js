(()=>{let e=e=>{let t=Object.keys(e.currentTarget.dataset).find(e=>e.endsWith("Open"));if(t){let e=t.replace("Open",""),s=document.querySelector(`[data-${e}]`);s&&(document.querySelectorAll(".modal, .signup, .login").forEach(e=>e.classList.add("is-hidden")),s.classList.remove("is-hidden"))}},t=e=>{let t=e.currentTarget.closest(".modal, .login, .review, .buynow, .buynow2, .subscribe, .signup");t&&t.classList.add("is-hidden")};document.querySelectorAll("[data-login-open], [data-buynow-open], [data-buynow2-open], [data-review-open], [data-signup-open]").forEach(t=>{t.addEventListener("click",e)}),document.querySelectorAll("[data-login-close], [data-buynow-close], [data-buynow2-close], [data-review-close], [data-subscribe-close], [data-signup-close]").forEach(e=>{e.addEventListener("click",t)}),window.addEventListener("click",e=>{(e.target.classList.contains("modal")||e.target.classList.contains("login")||e.target.classList.contains("review")||e.target.classList.contains("buynow")||e.target.classList.contains("buynow2")||e.target.classList.contains("subscribe")||e.target.classList.contains("signup"))&&e.target.classList.add("is-hidden")})})();
//# sourceMappingURL=index.cb2977ce.js.map
