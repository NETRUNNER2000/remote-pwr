const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const app = express();
const port = 3000;

// Password for protecting the endpoint
const API_PASSWORD = "your-secure-password";
console.log("Changes are working");
// Function to put the PC to sleep
function putUbuntuToSleep() {
  // Command to put the system to sleep
  const sleepCommand = "sudo systemctl suspend";

  exec(sleepCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error putting the system to sleep: ${stderr}`);
      return;
    }
    console.log("The system is going to sleep...");
  });
}

function shutdownUbuntu(){
    const shutdownCommand = "sudo shutdown -h now";

      exec(shutdownCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error shutting down server: ${stderr}`);
          return;
        }
        console.log("The server is shutting down...");
      });
}


// Helper function to check if Minecraft server (server.jar) is running
async function isMinecraftRunning() {
  try {
    // Dynamically import the ps-list library
    const psList = (await import('ps-list')).default;
    
    // Get the list of running processes
    const processes = await psList();
    
    // Check if any process contains 'server.jar' in its name or command line
    return processes.some(process => process.cmd && process.cmd.includes('server.jar'));
  } catch (error) {
    console.error('Error loading ps-list:', error);
    return false;
  }
}

// Trigger

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to make the computer sleep
app.post("/sleep", (req, res) => {
  const { password } = req.body;

  // Check if the password is correct
  if (password !== API_PASSWORD) {
    return res.status(403).json({ message: "Unauthorized: Incorrect password" });
  }
  putUbuntuToSleep();
});


// Define an API endpoint
app.get('/is-minecraft-running', async (req, res) => {
  try {
    const minecraftRunning = await isMinecraftRunning();
    res.json({ isMinecraftRunning: minecraftRunning });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to check Minecraft process' });
  }
});

app.use(bodyParser.json());
app.post('/power-off', (req, res) => {
console.log('Endpoint got hit');
    const { password } = req.body;

      // Check if the password is correct
      if (password !== API_PASSWORD) {
        return res.status(403).json({ message: "Unauthorized: Incorrect password" });
      }
  
    shutdownUbuntu();
});

// Start the server
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
