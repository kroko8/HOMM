class Config:
    SECRET_KEY = 'votre_cle_secrete'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True  # Mettre à False en production
    JSON_SORT_KEYS = False  # Ne pas trier les clés JSON par défaut