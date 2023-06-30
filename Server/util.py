import json
import pickle
import numpy as np

locations = None
data_columns = None
model = None

def get_predicted_price(location, sqft, bhk, bath):
    try:
        loc_index = data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk

    if loc_index >= 0:
        x[loc_index] = 1

    return round(model.predict([x])[0], 2)

def get_location_names():
    return locations

def load_artifacts():
    print("Loading Saved Artifacts....")
    global data_columns
    global locations
    global model

    with open("columns.json", "r") as f:
        data_columns = json.load(f)['data columns']
        locations = data_columns[3:]

    with open("bangalore_home_prices_model.pickle", 'rb') as f:
        model = pickle.load(f)
    print("Saved Artifacts Loaded")


if __name__ == '__main__':
    load_artifacts()
    print(get_location_names())
    print(get_predicted_price("1st Phase JP Nagar", 1000, 2, 2))
    print(get_predicted_price("1st Phase JP Nagar", 1000, 3, 3))
    print(get_predicted_price("Kalhalli", 1000, 2, 2)) # other location
    print(get_predicted_price("Ejipura", 1000, 2, 2)) # other location
