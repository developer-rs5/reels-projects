// Function to toggle between listening and speaking states
function toggleState() {
    const listeningGif = document.querySelector('.listening');
    const speakingGif = document.querySelector('.speaking');
  
    // Toggle visibility of the GIFs
    if (listeningGif.style.display === 'none') {
      listeningGif.style.display = 'block';
      speakingGif.style.display = 'none';
    } else {
      listeningGif.style.display = 'none';
      speakingGif.style.display = 'block';
    }
  }
  
  // Function to start listening to the user's voice using SpeechRecognition
  function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    // Set up recognition parameters
    recognition.lang = 'en-US';
    recognition.continuous = false; // Stop after recognizing one sentence
    
    // Start listening
    recognition.start();
    
    // When the user starts speaking
    recognition.onstart = () => {
      console.log('Listening...');
      toggleState(); // Show listening GIF
    };
    
    // When the speech is recognized
    recognition.onresult = async (event) => {
      const userInput = event.results[0][0].transcript;
      console.log('User said:', userInput);
      
      // Show the assistant's response
      await processResponse(userInput);
    };
    
    // Handle errors
    recognition.onerror = (event) => {
      console.error('Speech Recognition Error:', event.error);
      toggleState(); // Hide listening GIF
    };
    
    // When the speech recognition ends
    recognition.onend = () => {
      console.log('Recognition ended');
      toggleState(); // Hide listening GIF if recognition ends
    };
  }
  
  // Function to send the recognized message to the Gemini API and get a response
  async function processResponse(userInput) {
    const responseContainer = document.getElementById('assistant-response');
    
    if (!userInput.trim()) return;
  
    // API endpoint and key (replace with your actual API details)
    const apiUrl = 'https://api.gemini.com/your-endpoint'; // Replace with actual Gemini API endpoint
  
    const requestBody = {
      prompt: userInput,
      temperature: 0.7, // Optional: adjust creativity of the response
      max_tokens: 150 // Optional: adjust the length of the response
    };
  
    try {
      // Send request to Gemini API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const assistantResponse = data.choices[0].text.trim();
        responseContainer.innerText = assistantResponse;
        
        // Speak the assistant's response
        speakResponse(assistantResponse);
  
        // Show speaking GIF
        toggleState();
      } else {
        throw new Error('Error from Gemini API');
      }
    } catch (error) {
      console.error('Error:', error);
      responseContainer.innerText = 'Sorry, I couldn\'t process your request.';
      
      // Show speaking GIF
      toggleState();
    }
  }
  
  // Function to make the assistant speak using SpeechSynthesis API
  function speakResponse(response) {
    const speech = new SpeechSynthesisUtterance(response);
    speech.lang = 'en-US'; // Set language for speech
    window.speechSynthesis.speak(speech);
  }
  