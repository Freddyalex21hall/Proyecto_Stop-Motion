window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelector('.izquierda').style.transform = 'translateX(-100%)';
      document.querySelector('.derecha').style.transform = 'translateX(100%)';
    }, 1000);
  });
  