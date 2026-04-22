# ai-chatbot-rasa-react
Fullstack AI chatbot built with Rasa, React, and TailwindCSS for intelligent conversational interactions.
# Fullstack AI Chatbot (Rasa + React + TailwindCSS)

A fullstack AI chatbot with a modern web interface, built using Rasa for natural language processing and React for the frontend.
The project includes authentication, conversational interaction, and a clean user experience.


## Features

* AI-powered chatbot using Rasa
* Real-time conversational interface
* User authentication (login & register)
* Modern UI built with React and TailwindCSS
* Fast development setup with Vite


## Tech Stack

### Frontend

* React
* TailwindCSS
* Vite

### Backend

* Python
* Rasa


## Project Structure


ai-chatbot/
│
├── backend/        # Rasa chatbot (NLP, actions, training data)
├── frontend/       # React web application
├── system/         # Optional scripts (e.g. .bat launcher)
│
├── requirements.txt
└── README.md


## Installation & Setup

### 1. Clone the repository

git clone 
cd ai-chatbot

### 2. Backend (Rasa)

cd backend
pip install -r ../requirements.txt
rasa train

In another terminal:

rasa run actions

### 3. Frontend (React)

cd frontend
npm install
npm run dev

## Usage

1. Start the backend (Rasa server + actions)
2. Run the frontend
3. Open the app in your browser
4. Start chatting with the AI 🤖



## Screenshots

<img width="3003" height="637" alt="se" src="https://github.com/user-attachments/assets/25e5735b-8b5f-4c0b-99cf-99ce9a1e8871" />

<br>

<img width="3693" height="911" alt="sa" src="https://github.com/user-attachments/assets/a38a15a7-37c8-4ecf-815c-fe8d015c14ce" />

<br>

<img width="1279" height="2115" alt="responsive" src="https://github.com/user-attachments/assets/8db42f6c-92dd-4212-b5e9-ba67dfca7493" />

<br>

<img width="667" height="919" alt="Captura" src="https://github.com/user-attachments/assets/9d3c2356-ed3a-4bbf-bb60-d6c40eeac35a" />

<br>

## Notes

* Make sure Python and Node.js are installed
* Do not upload sensitive files like `.env` or `node_modules`
* Models are not included — run `rasa train` to generate them


##  License

This project is open-source and available under the MIT License.


##  Author

Developed by **Edgar Adrian Rodriguez Garcia**
