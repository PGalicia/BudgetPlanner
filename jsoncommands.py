import json

# Read JSON file
def getJSON(filePathAndName):
    with open(filePathAndName, 'r') as f:
        return json.load(f)


# Write JSON file
def setJSON_total(filePathAndName, total):
    with open(filePathAndName, 'r+') as f:
        json_data = json.load(f)

        # Check that the 'total' is valid
        json_data['Total'] = total
        f.seek(0)
        f.write(json.dumps(json_data))
        f.truncate()


def setJSON_percentage(filePathAndName, percentage):
    with open(filePathAndName, 'r+') as f:
        json_data = json.load(f)

        # Check that the 'percentage' is valid
        json_data['Percentage'] = percentage
        f.seek(0)
        f.write(json.dumps(json_data))
        f.truncate()