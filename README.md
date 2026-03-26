# 🖥️ Server Power Control API (Discord Bot Companion)

A lightweight Node.js API designed to work alongside a Discord bot to remotely manage the power state of an Ubuntu server.

This service allows your bot (or any authorized client) to:

* Put the server to sleep
* Shut down the server
* Check if a Minecraft server is currently running

---

## 🚀 Features

* 🔐 Password-protected endpoints
* 💤 Remote sleep trigger
* ⛔ Remote shutdown trigger
* 🎮 Minecraft server status detection (`server.jar`)
* ⚡ Simple and minimal Express API

---

## 📦 Requirements

* Node.js (v18+ recommended)
* Ubuntu-based system
* `sudo` privileges configured for:

  * `systemctl suspend`
  * `shutdown -h now`

---

## 🔧 Installation

```bash
git clone <your-repo-url>
cd <your-repo-name>
npm install
```

Install required dependencies:

```bash
npm install express body-parser ps-list
```

---

## ⚙️ Configuration

Open `index.js` and set your API password:

```js
const API_PASSWORD = "your-secure-password";
```

⚠️ **Important:**
Do NOT commit your real password. Use environment variables in production:

```js
const API_PASSWORD = process.env.API_PASSWORD;
```

---

## ▶️ Running the Server

```bash
node index.js
```

Server will start on:

```
http://localhost:3000
```

---

## 🔌 API Endpoints

### 💤 Sleep Server

**POST** `/sleep`

```json
{
  "password": "your-secure-password"
}
```

Triggers:

```
sudo systemctl suspend
```

---

### ⛔ Power Off Server

**POST** `/power-off`

```json
{
  "password": "your-secure-password"
}
```

Triggers:

```
sudo shutdown -h now
```

---

### 🎮 Check Minecraft Server Status

**GET** `/is-minecraft-running`

Response:

```json
{
  "isMinecraftRunning": true
}
```

Checks for a running process containing:

```
server.jar
```

---

## 🤖 Discord Bot Integration

This API is intended to be called from your Discord bot.

Example flow:

1. User runs a command in Discord (`!sleep`, `!shutdown`)
2. Bot sends a POST request to this API
3. Server executes the requested power action

---

## 🔐 Security Notes

* This API is **not safe to expose publicly without protection**
* Recommended:

  * Run behind a reverse proxy (NGINX)
  * Restrict access by IP
  * Use HTTPS
  * Use environment variables for secrets
  * Add rate limiting if exposed

---

## ⚠️ Sudo Permissions (Important)

To allow Node.js to execute power commands without a password, edit sudoers:

```bash
sudo visudo
```

Add:

```
your-username ALL=(ALL) NOPASSWD: /usr/bin/systemctl suspend, /sbin/shutdown
```

⚠️ Be careful — this grants elevated privileges.

---

## 🧠 Notes

* Uses dynamic import for `ps-list` to detect running processes
* Assumes your Minecraft server runs via `server.jar`
* No response is sent for sleep/shutdown endpoints (you may want to improve this)

---

## 🛠️ Future Improvements

* Add proper responses for POST endpoints
* Replace password auth with tokens (JWT)
* Add logging & monitoring
* Add wake-on-LAN support
* Dockerize the service

---

## 📄 License

MIT (or whatever you choose)

---

## 👨‍💻 Author
Me xD
Built as a companion service for a Discord-controlled home server setup.
