import requests

def linear_predictor_api_call(width, eccentricity, soils):
    '''
    The soils api expect a list of soil E-moduli per 0.5 m.

    The input is here transformed into a list of 16 soil layers with E-moduli,
    each representing a layer of 0.5 m.
    '''
    soil_layer_E_modulus_list = []
    max_level = soils[0]['level']

    for layer_number in range(16):
        level = max_level - layer_number*0.5 # Layers are in 0.5 m intervals.
        for soil_input in [i for i in soils if i != {}]:
            if level <= soil_input['level']:
                soil_layer_E_modulus = soil_input['e_modulus']
                soil_layer_E_modulus *= 1000 # Multiplying by 1000 to get from MPa to kPa.
        soil_layer_E_modulus_list.append(soil_layer_E_modulus)

    print('Emodulus list')
    print(soil_layer_E_modulus_list)
    
    data = {'foundationWidth': width,
            'eccentricity': eccentricity,
            'soils': soil_layer_E_modulus_list}

    url = "http://foundation_response_api:8100/predict"
    response = requests.post(url, json=data)

    if response.status_code == 200:
        return response.json()['prediction']
    else:
        return {"error": f"FastAPI error: {response.status_code}"}