from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import json

app = Flask(__name__)
CORS(app)

@app.route('/api/articles', methods=['GET'])
def get_articles():
    try:
        query = request.args.get('query', '')

        command = ['python', 'scraper.py']
        if query:
            command.append(query)

        result = subprocess.run(command, capture_output=True, text=True, check=True)
        scraped_data = result.stdout.strip()  

        articles = preprocess_scraped_data(scraped_data)

        return jsonify(articles)

    except subprocess.CalledProcessError as e:
        error_message = f'Scraper execution failed with return code {e.returncode}: {e.stderr}'
        return jsonify({'status': 'error', 'message': error_message}), 500

    except Exception as e:
        error_message = f'Internal server error: {str(e)}'
        return jsonify({'status': 'error', 'message': error_message}), 500

        

def preprocess_scraped_data(scraped_data):
    try:
        data = json.loads(scraped_data)

        for item in data:
            if 'Tags' in item:
                item['Tags'] = preprocess_tags(item['Tags'])

        return data

    except Exception as e:
        raise ValueError(f'Error processing scraped data: {str(e)}')

def preprocess_tags(tags):
    if isinstance(tags, list):
        return [tag.strip().replace('\n', '') for tag in tags]
    elif isinstance(tags, str):
        return [tag.strip() for tag in tags.split(',')]
    elif not tags:
        return []
    else:
        return []


@app.route('/api/execute-scraper', methods=['POST'])
def execute_scraper():
    try:
        query = request.json.get('query', '')
        command = ['python', 'scraper.py']
        if query:
            command.append(query)

        result = subprocess.run(command, capture_output=True, text=True, check=True)

        return jsonify({'status': 'success', 'message': 'Scraper executed successfully'})

    except subprocess.CalledProcessError as e:
        error_message = f'Scraper execution failed with return code {e.returncode}: {e.stderr}'
        return jsonify({'status': 'error', 'message': error_message}), 500

    except Exception as e:
        error_message = f'Internal server error: {str(e)}'
        return jsonify({'status': 'error', 'message': error_message}), 500

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True)
