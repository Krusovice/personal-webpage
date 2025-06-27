import requests

def linear_predictor_api_call(width, eccentricity, soils):
    data = {'foundationWidth': width,
            'eccentricity': eccentricity,
            'soils': [60000]*16}

    url = "http://foundation_response_api:8100/predict"
    response = requests.post(url, json=data)

    if response.status_code == 200:
        return response.json()['prediction']
    else:
        return {"error": f"FastAPI error: {response.status_code}"}