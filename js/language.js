// Language switcher functionality
document.getElementById('languageSelect').addEventListener('change', function() {
  const selectedLanguage = this.value;
  
  // Show/hide appropriate content
  if (selectedLanguage === 'nl') {
    document.getElementById('dutch-content').style.display = 'block';
    document.getElementById('english-content').style.display = 'none';
    document.documentElement.lang = 'nl';
    
    // Update download link for Dutch CV
    const downloadBtn = document.querySelector('.floating-download-btn');
    downloadBtn.href = 'cv-nl.pdf';
    downloadBtn.download = 'Alain_Seys_CV_NL.pdf';
  } else {
    document.getElementById('dutch-content').style.display = 'none';
    document.getElementById('english-content').style.display = 'block';
    document.documentElement.lang = 'en';
    
    // Update download link for English CV
    const downloadBtn = document.querySelector('.floating-download-btn');
    downloadBtn.href = 'cv-en.pdf';
    downloadBtn.download = 'Alain_Seys_CV_EN.pdf';
  }
  
  // Update page title based on language
  if (selectedLanguage === 'nl') {
    document.title = 'Alain Seys – Systems Engineer';
  } else {
    document.title = 'Alain Seys – Systems Engineer';
  }
});

// Initialize download link based on default language
document.addEventListener('DOMContentLoaded', function() {
  const defaultLanguage = document.getElementById('languageSelect').value;
  const downloadBtn = document.querySelector('.floating-download-btn');
  
  if (defaultLanguage === 'nl') {
    downloadBtn.href = 'cv-nl.pdf';
    downloadBtn.download = 'Alain_Seys_CV_NL.pdf';
  } else {
    downloadBtn.href = 'cv-en.pdf';
    downloadBtn.download = 'Alain_Seys_CV_EN.pdf';
  }
});
