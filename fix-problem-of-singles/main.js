const speak = document.getElementById('speak');
const voice = document.getElementById('voice');
const button = document.getElementById('button');
const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDrMuxxnZ3l_AlGOZI3uI1IITG0sHxT4ck';
var gptmsg = null;

window.onload = async () => {
  speakInBrowser('hello baby, Tum yaha, chalo baat karta haa!');
  const hasMicPerms = await checkMicPerms();
  
  if (!hasMicPerms) {
    button.innerText = 'Microphone Permission Needed';
    button.addEventListener('click', async () => {
      
      const granted = await requestMicPerms();
      if (granted) {
        button.innerText = 'Click and speek';
      } else {
        button.innerText = 'Access Denied';
      }
    });
  } else {
    button.innerText = 'Click and Speek';
  }
};

document.getElementById('button').addEventListener('click', async () => {
  

  
  await checkMicPerms();

  

  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = 'en-IN'; 
      recognition.interimResults = false; 
      recognition.maxAlternatives = 1; 

      recognition.start(); 
      console.log('Listening...');
      speak.style.display = 'block'
      button.style.display = 'none'
      // Handle recognition result
      recognition.onresult = async (event) => {
          const spokenValue = event.results[0][0].transcript; // Get spoken words
          console.log('you:', spokenValue);

          const message = spokenValue;

          
          await gemini(message);
      };
      
      // Handle recognition errors
      recognition.onerror = (event) => {
          console.error('Error occurred in recognition:', event.error);
          
      };
  } else {
      console.warn('Speech Recognition API not supported in this browser.');
  }
});

// Function to check microphone permissions
async function checkMicPerms() {
  const micperms = await navigator.permissions.query({ name: 'microphone' });

  try {
    if (micperms.state === 'granted') {
      console.log('Microphone access is granted.');
      return true;
    } else if (micperms.state === 'denied') {
      console.log('Microphone access is denied.');
      speakInBrowser('baby, Tumne mic reject kiya ')
      return false;
    } else if (micperms.state === 'prompt') {
      console.log('Microphone access requires user permission.');
      speakInBrowser('baby, Mujhe mic de do please! ')
      return false;
    }
  } catch (e) {
    console.log(`Error: ${e}`);
    return false;
  }
}


async function requestMicPerms() {
  try {
    const permissionStatus = await navigator.permissions.request({ name: 'microphone' });
    if (permissionStatus.state === 'granted') {
      console.log('Microphone permission granted.');
      return true;
    } else {
      console.log('Microphone permission denied.');
      return false;
    }
  } catch (e) {
    console.error('Error requesting microphone permission:', e);
    return false;
  }
}


function speakInBrowser(text) {
 
  if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text); 
      utterance.lang = 'en-IN'; 
      utterance.rate = 1; 
      utterance.pitch = 1; 

      utterance.onend = () => {
         button.style.display = 'block'
         voice.style.display = 'none'
      }
      
      
      
      window.speechSynthesis.speak(utterance);

      console.log('Speaking:', text);
      
  } else {
      console.error('Speech synthesis is not supported in this browser.');
  }
}


async function gemini(message) {
  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              contents: [
                  {
                      role: 'user',
                      parts: [{ text: `system: tum ek girl friend assistent and user aapka boy friend ha or aap bahut toxic and rude ho also use words like babu and babu and more user: ${message}` }]
                  }
              ]
          })
      });

      const data = await response.json();
      const apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Sorry, I could not fetch a response.';
      console.log('Gemini response:', apiResponse);
      speakInBrowser(apiResponse);    
      gptmsg = 'yes';  
      speak.style.display = 'none'
      voice.style.display = 'block'
  } catch (error) {
      console.error('Error fetching Gemini API response:', error.message);
  }
}
