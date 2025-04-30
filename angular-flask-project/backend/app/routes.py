from flask import Blueprint, jsonify, request

bp = Blueprint('routes', __name__)

# Exemple de données en mémoire (remplacez par une base de données si nécessaire)
map_data = {
    "cities": []
}

games_data = []
scenarios_data = [
    {"id": 1, "name": "Basic Map", "description": "Un scénario simple avec un petit terrain."},
    {"id": 2, "name": "Advanced Map", "description": "Un scénario complexe avec plusieurs ressources."}
]

# Gestion des villes
@bp.route('/api/cities', methods=['POST'])
def create_city():
    """Créer une nouvelle ville sur la carte."""
    if not request.is_json:
        return jsonify({"error": "Le Content-Type doit être 'application/json'"}), 415
    data = request.json
    city = {
        "id": len(map_data["cities"]) + 1,
        "name": data.get("name", "Ville sans nom"),
        "position": data.get("position", {"x": 0, "y": 0}),
        "resources": data.get("resources", {"gold": 0, "wood": 0, "stone": 0}),
        "buildings": data.get("buildings", []),
        "population": data.get("population", 0)
    }
    map_data["cities"].append(city)
    return jsonify({"message": "Ville créée avec succès", "city": city}), 201

@bp.route('/api/cities/<int:city_id>', methods=['GET'])
def get_city(city_id):
    """Récupérer les informations d'une ville."""
    city = next((c for c in map_data["cities"] if c["id"] == city_id), None)
    if not city:
        return jsonify({"error": "Ville introuvable"}), 404
    return jsonify(city), 200

@bp.route('/api/cities', methods=['GET'])
def list_cities():
    """Lister toutes les villes sur la carte."""
    return jsonify(map_data["cities"]), 200

# Gestion des parties
@bp.route('/api/games', methods=['GET'])
def list_games():
    """Lister toutes les parties sauvegardées."""
    if not games_data:
        # Ajouter un exemple de partie si la liste est vide
        example_game = {
            "id": 1,
            "name": "Partie 1",
            "scenario_id": 1,
            "state": {
                "turn": 1,
                "player": {
                    "resources": {"gold": 500, "wood": 100, "stone": 50},
                    "heroes": [],
                    "cities": []
                },
                "ai": {
                    "resources": {"gold": 300, "wood": 50, "stone": 20},
                    "heroes": [],
                    "cities": []
                }
            },
            "created_at": "2023-10-01T12:00:00Z",
            "last_saved": "2023-10-01T12:00:00Z"
        }
        games_data.append(example_game)
    return jsonify({
        "message": "Parties listées avec succès",
        "games": games_data
    }), 200

@bp.route('/api/games', methods=['POST'])
def create_game():
    """Créer une nouvelle partie."""
    data = request.json
    game = {
        "id": len(games_data) + 1,
        "name": data.get("name", "Nouvelle Partie"),
        "scenario_id": data.get("scenario_id"),
        "state": data.get("state", {}),
        "created_at": "2023-10-01T12:00:00Z",
        "last_saved": "2023-10-01T12:00:00Z"
    }
    games_data.append(game)
    return jsonify({"message": "Partie créée avec succès", "game": game}), 201

@bp.route('/api/games/<int:game_id>/save', methods=['POST'])
def save_game(game_id):
    """Sauvegarder une partie existante."""
    game = next((g for g in games_data if g["id"] == game_id), None)
    if not game:
        return jsonify({"error": "Partie introuvable"}), 404
    data = request.json
    game["state"] = data.get("state", game["state"])
    game["last_saved"] = "2023-10-01T12:30:00Z"
    return jsonify({"message": "Partie sauvegardée avec succès", "game": game}), 200

@bp.route('/api/games/<int:game_id>', methods=['GET'])  # Correction ici : methods=['GET']
def load_game(game_id):
    """Charger une partie sauvegardée."""
    game = next((g for g in games_data if g["id"] == game_id), None)
    if not game:
        return jsonify({"error": "Partie introuvable"}), 404
    return jsonify(game), 200

# Gestion des scénarios
@bp.route('/api/scenarios', methods=['GET'])
def list_scenarios():
    """Lister tous les scénarios disponibles."""
    return jsonify(scenarios_data), 200

