document.getElementById('weather').addEventListener('submit', function(event) {
  event.preventDefault();

  const weather = document.getElementById('weather');
  const loadingScreen = document.getElementById('loading-screen');
  const webPrompt = document.getElementById('web-prompt');

 
  weather.style.display = 'none';

  loadingScreen.style.display = 'block';

  setTimeout(function() {
    
    loadingScreen.style.display = 'none';
   
    webPrompt.style.display = 'block';
  }, 5000); 
});
