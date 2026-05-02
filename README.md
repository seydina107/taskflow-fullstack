# TaskFlow API

## Description
TaskFlow est une API REST développée avec Node.js et Express permettant de gérer des projets et des tâches.

## Fonctionnalités
- Authentification avec JWT
- CRUD projets (Create, Read, Update, Delete)
- CRUD tâches
- API déployée sur Render

## Déploiement
Backend disponible ici :
https://taskflow-backend-own6.onrender.com

## Authentification

POST /api/auth/register  
POST /api/auth/login  
GET /api/auth/me  

## Projets

POST /api/projects  
GET /api/projects  
PUT /api/projects/:id  
DELETE /api/projects/:id  

## Tâches

POST /api/tasks  
GET /api/tasks  
PUT /api/tasks/:id  
DELETE /api/tasks/:id  

## Variables d'environnement

Créer un fichier `.env` :

PORT=5000  
JWT_SECRET=my_secret_key  

## Installation

```bash
npm install
node server.js
