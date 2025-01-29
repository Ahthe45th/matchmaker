import sys
import json
import datetime

import RAHIB.UTILS.storage.Location as Location

import halaallove.utils.general as general_utils

def main():
    if len(sys.argv) == 2:
        start_date = sys.argv[1]
        the_timestamp = datetime.datetime.strptime(start_date, '%d/%m/%Y').timestamp()
        
        print(f"Going for users after {start_date}: {the_timestamp}")   
        thewomen = [general_utils.safejsonloads(x) for x in general_utils.get_all_women_past_timestamp(the_timestamp)]
    else:
        thewomen = [general_utils.safejsonloads(x) for x in general_utils.get_all_women()]

    general_data = {}
    cities = {}
    ages = {}
    
    tribes = {}
    work_statuses = {}
    relationship_statuses = {}

    i = 0

    for woman in thewomen:
        i += 1
        city = woman['city'].upper().replace('/',' ').rstrip()
        if city in cities:
            cities[city] += 1
        else:
            cities[city] = 1

        if 'herworkstatus' in woman:
            herworkstatus = woman['herworkstatus'].upper().replace('/',' ').rstrip()
            if herworkstatus in work_statuses:
                work_statuses[herworkstatus] += 1
            else:
                work_statuses[herworkstatus] = 1

        if 'relationshipstatus' in woman:
            relationship_status = woman['relationshipstatus'].upper().replace('/',' ').rstrip()
            if relationship_status in relationship_statuses:
                relationship_statuses[relationship_status] += 1
            else:
                relationship_statuses[relationship_status] = 1

        age = woman['age'].upper().replace('YEARS','').replace('YRS','').rstrip()
        try:
            intble = float(age)
            if age in ages:
                ages[age] += 1
            else:
                ages[age] = 1
        except Exception as e:
            print('Not an int')

        prefer = False

        for key in woman:
            if 'prefer' in key:
                prefer = True
                if 'spouse' not in key:
                    if woman[key] == 'true':
                        tribe = key.replace('prefer','').upper().rstrip()
                        if tribe in tribes:
                            tribes[tribe] += 1
                        else:
                            tribes[tribe] = 1
                            
        if not prefer:
            if 'ethnicity' in woman:
                tribees = [x for x in woman['ethnicity'].upper().rstrip().replace(',',' ').replace('/',' ').replace('-',' ').split(' ') if x]
                for tribe in tribees:
                    if tribe in tribes:
                        tribes[tribe.upper()] += 1
                    else:
                        tribes[tribe.upper()] = 1

    print(f"Number of women: {i}")
    print('Cities')
    for city in cities:
        print(f"{city}: {cities[city]}")

    print('\nAges')
    for age in ages:
        print(f"{age}: {ages[age]}")

    print('\nTribes')
    for tribe in tribes:
        print(f"{tribe}: {tribes[tribe]}")

    print('\nRelationship Statuses')
    for relationshipstatus in relationship_statuses:
        print(f"{relationshipstatus}: {relationship_statuses[relationshipstatus]}")

    print('\nWork Statuses')
    for herworkstatus in work_statuses:
        print(f"{herworkstatus}: {work_statuses[herworkstatus]}")

    general_data['work_status'] = work_statuses
    general_data['relationship_status'] = relationship_statuses
    general_data['tribe'] = tribes
    general_data['age'] = ages
    general_data['cities'] = cities

    with open(Location.general_storage() + '/data.json', 'w') as target:
        target.write(json.dumps(general_data, indent=2))

if __name__ == '__main__':
    main()
