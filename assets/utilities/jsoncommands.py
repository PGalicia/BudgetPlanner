import json


def get_json(filepath) -> json:
    """ Return the content in the specified JSON file """
    with open(filepath, 'r') as f:
        return json.load(f)


def set_json_total(filepath, total) -> bool:
    """
        Update the 'total' value in the JSON file.
        Return TRUE if the update is successful and
        return FALSE if the JSON file given is not found
    """
    try:
        with open(filepath, 'r+') as f:
            json_data = json.load(f)
            json_data['Total'] = total
            f.seek(0)
            f.write(json.dumps(json_data))
            f.truncate()
            return True
    except FileNotFoundError:
        return False


def set_json_percentage(filepath, percentage) -> bool:
    """
        Update the 'percentage' value in the JSON file.
        Return TRUE if the update is successful and
        return FALSE if the JSON file given is not found
    """
    try:
        with open(filepath, 'r+') as f:
            json_data = json.load(f)
            json_data['Percentage'] = percentage
            f.seek(0)
            f.write(json.dumps(json_data))
            f.truncate()
            return True
    except FileNotFoundError:
        return False

