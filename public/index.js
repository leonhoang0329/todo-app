// This is a fallback JavaScript file for the HTML page
// Helps ensure the application loads even when React fails to initialize

document.addEventListener('DOMContentLoaded', function() {
  const rootElement = document.getElementById('root');
  
  // If the React app hasn't loaded after 3 seconds, show a fallback message
  setTimeout(function() {
    if (!rootElement.hasChildNodes()) {
      rootElement.innerHTML = `
        <div style="text-align: center; padding: 2rem; font-family: system-ui, sans-serif;">
          <h2 style="color: #4285f4;">Todo App</h2>
          <p>If you're seeing this message, there might be an issue loading the application.</p>
          <p>Please ensure JavaScript is enabled and try refreshing the page.</p>
        </div>
      `;
    }
  }, 3000);
});