from flask import Blueprint, jsonify

# Example: Initialize GroQ (replace with actual configuration)
groq_client = groq.Client(api_key="your_groq_api_key")

bp = Blueprint('routes', __name__)

@bp.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'}), 200

@bp.route('/api/data', methods=['GET'])
def get_data():
    # Exemple de données à retourner
    data = {
        'message': 'Bienvenue dans l\'API Flask!',
        'data': [1, 2, 3, 4, 5]
    }
    return jsonify(data), 200