 // Language switcher functionality
    document.getElementById('languageSelect').addEventListener('change', function() {
      const selectedLanguage = this.value;
      
      // Show/hide appropriate content
      if (selectedLanguage === 'nl') {
        document.getElementById('dutch-content').style.display = 'block';
        document.getElementById('english-content').style.display = 'none';
        document.documentElement.lang = 'nl';
      } else {
        document.getElementById('dutch-content').style.display = 'none';
        document.getElementById('english-content').style.display = 'block';
        document.documentElement.lang = 'en';
      }
      
      // Update page title based on language
      if (selectedLanguage === 'nl') {
        document.title = 'Alain Seys – Systems Engineer';
      } else {
        document.title = 'Alain Seys – Systems Engineer';
      }
    });