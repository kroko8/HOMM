# Angular Flask Project

Ce projet est une application web développée avec Angular pour le frontend et Flask pour le backend. 

## Structure du projet

Le projet est organisé comme suit :

```
angular-flask-project
├── frontend
│   ├── angular.json          # Configuration du projet Angular
│   ├── package.json          # Dépendances et scripts npm
│   ├── tsconfig.json         # Configuration TypeScript
│   ├── src
│   │   ├── app
│   │   │   ├── app.component.ts      # Composant principal de l'application
│   │   │   ├── app.module.ts          # Module principal de l'application
│   │   │   └── app-routing.module.ts  # Configuration des routes
│   │   ├── assets                   # Fichiers statiques (images, styles)
│   │   └── environments
│   │       ├── environment.prod.ts   # Variables d'environnement pour la production
│   │       └── environment.ts         # Variables d'environnement pour le développement
│   └── README.md                     # Documentation pour le projet frontend
├── backend
│   ├── app
│   │   ├── __init__.py               # Initialisation du package Flask
│   │   ├── routes.py                 # Définition des routes de l'application
│   │   └── models.py                 # Modèles de données
│   ├── requirements.txt               # Dépendances Python pour le backend
│   ├── config.py                      # Configuration de l'application Flask
│   └── README.md                      # Documentation pour le projet backend
└── README.md                          # Documentation générale pour le projet
```

## Installation

Pour installer les dépendances du frontend, exécutez :

```
cd frontend
npm install
```

Pour le backend, installez les dépendances avec :

```
cd backend
pip install -r requirements.txt
```

## Démarrage

Pour démarrer le frontend, utilisez :

```
ng serve
```

Pour démarrer le backend, exécutez :

```
python -m flask run
```

## Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre une demande de tirage pour toute amélioration ou correction.