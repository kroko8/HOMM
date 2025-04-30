from flask import Flask
from app.routes import bp  # Importez vos routes depuis routes.py

app = Flask(__name__)

# Enregistrez le blueprint des routes
app.register_blueprint(bp)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
