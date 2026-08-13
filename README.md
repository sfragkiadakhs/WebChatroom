# WebChatroom

A real-time web chatroom application built with Node.js, Socket.IO, and WebRTC for video calling.

## Features

- Real-time messaging
- Video calling functionality
- Secure HTTPS connection
- Simple and responsive UI

## Prerequisites

- Node.js (v14 or higher)
- SSL certificates (key.pem and cert.pem)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sfragkiadakhs/WebChatroom.git
   cd WebChatroom
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Generate or place SSL certificates in the root directory:
   - `key.pem` - Private key
   - `cert.pem` - Certificate

   To generate a self-signed pair for local development:
   ```bash
   openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=localhost"
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `https://localhost:1200`

## Configuration

You can set the following environment variables:

- `PORT` - Server port (default: 1200)
- `OPENSHIFT_NODEJS_IP` - Server IP address (default: `0.0.0.0`)

## Technologies Used

- Node.js
- Socket.IO
- WebRTC
- jQuery

## License

MIT