# Cloud Notes API

A cloud-native Notes application built using **microservices architecture**, deployed on **Google Cloud Platform**, and powered by **Firestore** for persistence. The system separates authentication and note management into independent services, with a lightweight frontend hosted on Firebase.

---

## 🌐 Live Application

* Frontend: https://cloud-notes-api-2.web.app
* Auth Service: https://auth-service-802463941547.us-central1.run.app
* Notes Service: https://notes-service-802463941547.us-central1.run.app

---

## 🧱 Architecture Overview

This project follows a **microservices architecture**:

* **Frontend (Static Web App)** → Firebase Hosting
* **Auth Service (Backend)** → Cloud Run
* **Notes Service (Backend)** → Cloud Run
* **Database** → Firestore
* **Infrastructure as Code** → Terraform
* **CI/CD Pipeline** → GitHub Actions

Each component is independently deployable and scalable.

---

## 🖥️ Frontend

The frontend is a **static web application** built using:

* HTML
* CSS
* Vanilla JavaScript

### Responsibilities:

* Handles user interaction (login, create/edit/delete notes)
* Stores JWT token in browser (`localStorage`)
* Sends authenticated requests to backend APIs

### Hosting:

* Deployed using **Firebase Hosting**
* Serves static files globally via CDN
* Entry point (`index.html`) redirects to `login.html`

---

## 🔐 Backend Services

The backend is split into two independent microservices:

---

### 1. Auth Service

**Purpose:**
Handles user authentication and issues JWT tokens.

**Technology:**

* Node.js
* Express

**Key Endpoint:**

```
POST /login
```

**Behavior:**

* Accepts email & password (mock validation)
* Generates JWT token
* Returns token to frontend

---

### 2. Notes Service

**Purpose:**
Handles all note-related operations.

**Technology:**

* Node.js
* Express
* Firestore SDK

**Protected via JWT Middleware**

**Endpoints:**

```
GET    /notes       → Fetch user notes
POST   /notes       → Create note
PUT    /notes/:id   → Update note
DELETE /notes/:id   → Delete note
```

**Behavior:**

* Extracts user ID from JWT
* Ensures users only access their own notes
* Communicates with Firestore

---

## 🗄️ Database (Firestore)

The application uses **Google Firestore**, a NoSQL document database.

### Structure:

Collection:

```
notes
```

Document example:

```json
{
  "content": "My note text",
  "userId": "user123",
  "createdAt": "timestamp"
}
```

### Key Characteristics:

* Serverless
* Auto-scaling
* Real-time capable (not used here but supported)
* Query-based filtering (e.g., by `userId`)

---

## ☁️ Deployment (Cloud Run)

Both backend services are deployed using **Google Cloud Run**.

### Why Cloud Run:

* Fully managed container platform
* Auto-scaling
* Pay-per-use
* Easy deployment via Docker

Each service:

* Runs in its own container
* Has its own public URL
* Scales independently

---

## 🏗️ Infrastructure as Code (Terraform)

Terraform is used to define and manage cloud infrastructure.

### Responsibilities:

* Provision Cloud Run services
* Configure permissions
* Manage project resources

### Benefits:

* Reproducibility
* Version-controlled infrastructure
* Easy environment setup

---

## 🔁 CI/CD Pipeline (GitHub Actions)

CI/CD is handled using **GitHub Actions**.

### Role:

* Automates build and deployment
* Triggers on code push
* Ensures consistent deployments

### Typical Flow:

1. Code pushed to GitHub
2. GitHub Actions workflow runs
3. Builds Docker image
4. Deploys to Cloud Run
5. Updates running service

---

## 📦 Version Control (GitHub)

GitHub is used as the central repository for the project.

### Responsibilities:

* Stores all source code
* Tracks changes (version history)
* Enables collaboration
* Triggers CI/CD workflows

---

## 🔐 Authentication Flow

1. User logs in via frontend
2. Auth Service returns JWT token
3. Token is stored in browser
4. Frontend sends token in headers:

```
Authorization: Bearer <token>
```

5. Notes Service validates token before processing requests

---

## 🚀 Key Features

* Microservices architecture
* Stateless backend services
* JWT-based authentication
* CRUD operations for notes
* Cloud-native deployment
* Fully serverless database

---

## 📁 Project Structure

```
cloud-project/
│
├── frontend/              # Static frontend (HTML/CSS/JS)
├── services/
│   ├── auth-service/     # Authentication service
│   └── notes-service/    # Notes CRUD service
├── terraform/            # Infrastructure configuration
├── .github/workflows/    # CI/CD pipelines
├── firebase.json         # Firebase hosting config
└── README.md
```

---

## 🧠 Summary

This project demonstrates how to build and deploy a **cloud-native application** using:

* Microservices (Express)
* Serverless compute (Cloud Run)
* NoSQL database (Firestore)
* Static hosting (Firebase)
* Infrastructure as Code (Terraform)
* CI/CD automation (GitHub Actions)

It is designed to showcase modern backend architecture and deployment practices.

---
