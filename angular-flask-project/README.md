# Projet Angular-Flask

Ce projet est une application web qui utilise Angular pour le frontend et Flask pour le backend. Il est conçu pour être une base solide pour le développement d'applications web modernes.

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
│   │   │   ├── app.component.ts       # Composant principal de l'application
│   │   │   ├── app.module.ts           # Module principal de l'application
│   │   │   └── app-routing.module.ts   # Configuration des routes
│   │   ├── assets                     # Fichiers statiques (images, styles)
│   │   └── environments
│   │       ├── environment.prod.ts    # Variables d'environnement pour la production
│   │       └── environment.ts          # Variables d'environnement pour le développement
│   └── README.md                      # Documentation du projet frontend
├── backend
│   ├── app
│   │   ├── __init__.py                # Initialisation du package Flask
│   │   ├── routes.py                  # Définition des routes de l'application
│   │   └── models.py                  # Modèles de données
│   ├── requirements.txt                # Dépendances Python
│   ├── config.py                       # Configuration de l'application Flask
│   └── README.md                       # Documentation du projet backend
└── README.md                          # Documentation générale du projet
```

## Installation

### Frontend

1. Naviguez dans le dossier `frontend`.
2. Exécutez `npm install` pour installer les dépendances.
3. Lancez l'application avec `ng serve`.

### Backend

1. Naviguez dans le dossier `backend`.
2. Créez un environnement virtuel et activez-le.
3. Exécutez `pip install -r requirements.txt` pour installer les dépendances.
4. Lancez l'application avec `flask run`.

## Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre une demande de tirage pour toute amélioration ou correction.

## License

Ce projet est sous licence MIT. Veuillez consulter le fichier LICENSE pour plus de détails.