import json

def read_json(filename):
    with open(filename, 'r') as f:
        return json.load(f)

def add_prop_to_all_items(prop, value, items):
    for item in items:
        items[item][prop] = value if not isinstance(value, list) else []
    return items

def write_json(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def find_category(item, sub_cats):
    for cat in sub_cats:
        if item in sub_cats[cat]['items']:
            return cat
    return None

def find_categories(item, sub_cats):
    matching_categories = [cat for cat in sub_cats if item in sub_cats[cat]['items']]
    return matching_categories

def add_sub_types(repo_items, sub_cats):
    for item in repo_items:
        sub_types = find_categories(item, sub_cats)

        if 'sub_types' not in repo_items[item] or not isinstance(repo_items[item]['sub_types'], list):
            repo_items[item]['sub_types'] = []

        for sub_type in sub_types:
            if sub_type not in repo_items[item]['sub_types']:  
                repo_items[item]['sub_types'].append(sub_type)
    return repo_items


if __name__ == '__main__':
    sub_cats = read_json('subCat.json')
    repo_items = read_json('repo_items.json')
    repo_items = add_prop_to_all_items('languages', [], repo_items)
    # repo_items = add_prop_to_all_items('types', [], repo_items)
    repo_items = add_prop_to_all_items('date_added', [], repo_items)
    # t.d. prófunargögn, málheildir...
    repo_items = add_prop_to_all_items('sub_types', [], repo_items)
    repo_items = add_sub_types(repo_items, sub_cats)
    write_json('repo_items_v2.json', repo_items)