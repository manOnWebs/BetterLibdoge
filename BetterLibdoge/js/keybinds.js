// Initialize a counter for unique notification IDs (optional)
var notificationCounter = 0;

// Updated showNotification function with stacking
var showNotification = function(message) {
  // Check if the notification container exists; if not, create it
  var container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.right = '10px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px'; // Space between notifications
    container.style.zIndex = '1000000'; // Ensure it's on top
    document.body.appendChild(container);
  }

  // Optionally, assign a unique ID to each notification
  notificationCounter++;
  var notificationId = 'notification-' + notificationCounter;

  // Create the notification element
  var notification = document.createElement('div');
  notification.id = notificationId; // Assign unique ID
  notification.innerText = message;
  notification.style.backgroundColor = 'rgba(0,0,0,0.7)';
  notification.style.color = '#fff';
  notification.style.padding = '10px 20px';
  notification.style.borderRadius = '5px';
  notification.style.opacity = '1'; // Start fully opaque
  notification.style.transition = 'opacity 0.5s ease'; // Smooth fade-out

  // Append the notification to the container
  container.appendChild(notification);

  // Set a timeout to fade out and remove the notification
  setTimeout(function() {
    // Start fading out
    notification.style.opacity = '0';
    // After the transition duration, remove the notification
    setTimeout(function() {
      if (notification.parentElement) {
        container.removeChild(notification);
      }
      // If the container has no more notifications, remove it
      if (container.children.length === 0) {
        document.body.removeChild(container);
      }
    }, 500); // Match the CSS transition duration
  }, 2000); // Display duration
}

// Enhanced keybinds function
var keybinds = function(e) {
  switch(e.key) {
    case '+':
    case '=': // Handle both '+' and '=' for keyboards where '+' requires Shift
      e.preventDefault();
      controller.buyDoge();
      showNotification('Doge Bought!');
      break;
    case '-':
      if (controller.getDoges().length == 0) {
        return;
      }
      e.preventDefault();
      controller.sellDoge();
      showNotification('Doge Sold!');
      break;
    default:
      break;
  }
}

// Use addEventListener with 'keydown' for better compatibility
document.addEventListener('keydown', keybinds);
