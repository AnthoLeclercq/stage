    document.querySelector('.background-game').addEventListener('click', function(event) {
      var textElement = document.getElementById('toggleText');
      // Vérifie si le clic est à l'intérieur de textElement
      if (textElement.contains(event.target)) {
        return;
      }
      if (textElement.style.display === 'none' || textElement.style.display === '') {
        textElement.style.display = 'block';
      } else {
        textElement.style.display = 'none';
      }
    });

    document.querySelector('#toggleText').addEventListener('click', function(event) {
      event.stopPropagation();
    });