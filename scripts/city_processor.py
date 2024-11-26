import pandas as pd
import json

def generate_city_dict():
    df = pd.read_excel('scripts/cities_list.xlsx')

    # Create a dictionary with countries as keys and lists of cities as values
    city_dict = {}
    for index, row in df.iterrows():
        country = row[3]  # Assuming the country name is in the 4th column (index 3)
        city = row[0]     # Assuming the city name is in the 1st column (index 0)

        if country not in city_dict:
            city_dict[country] = []
        city_dict[country].append(city)

    return city_dict



def save_complete_json(output_filename):
    # Generate the complete dictionary
    city_dict = generate_city_dict()

    # Save the dictionary to a JSON file
    with open(output_filename, 'w') as json_file:
        json.dump(city_dict, json_file, indent=4)
    print(f"JSON file saved as {output_filename}")



# Example usage
save_complete_json('scripts/city_lists.json')
