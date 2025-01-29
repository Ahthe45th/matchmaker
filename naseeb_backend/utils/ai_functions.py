from openai import OpenAI
import os
import json
import logging
import datetime 


openaikey = ''
client = OpenAI(api_key=openaikey)

data_locale = Location.general_storage() + '/aigenned/'

def choose_prompt(conversation):
    if conversation != '':
        prompt = f"""Provide a response given the conversation below. 
        Conversation:
        {conversation}
        """
        return prompt
    else:
        prompt = f"""Write a DM to start a conversation with a middle aged African woman your interested in on a dating site. Be inquisitive."""
        return prompt
    
def choose_prompt_profile_generator(data):
    files = [os.path.join(data_locale, f) for f in os.listdir(data_locale)] # add path to each file
    files.sort(key=lambda x: os.path.getmtime(x))
    
    if len(files) <= 2:
        returned = [open(x).read() for x in files]
        prompt = f"""
                I need you to write for me the profile of a man. He's {data['age1']}, a {data['currentoccupation1']}, {data['relationshipstatus1']} and {data['ethnicity1']} and it must be from his point of view.

                The profile has to include: 
                - His full name, choose an uncommon name but one that comes from his location.
                - What his friends/parents/relatives say are his good qualities, and make these varied and specific
                - What he seeks in a woman i.e whether he's looking for someone who has been divorced, someone who is a widow, someone with 1 or many kids or a combination of all three
                - What he'll provide financially and emotionally for her and vary these maybe he's doing amazingly financially or just able to provide a comfortable existence for her or somewhere in between
                - a call to action to get a lady interested in speaking to him.

                Ensure the language, tone, and content reflect the person's distinct character. Use anecdotes and specific hobbies to make the profile feel personal and genuine.
                Don't use the word connections or double hyphens "--" and try to keep each point to just one paragraph. 
              """
    else:
        returned = [open(x).read() for x in files][:2]
        prompt = f"""
                I need you to write for me the profile of a man. He's {data['age1']}, a {data['currentoccupation1']}, {data['relationshipstatus1']} and {data['ethnicity1']} and it must be from his point of view.

                The profile has to include: 
                - His full name, choose an uncommon name but one that comes from his location.
                - What his friends/parents/relatives say are his good qualities, and make these varied and specific
                - What he seeks in a woman i.e whether he's looking for someone who has been divorced, someone who is a widow, someone with 1 or many kids or a combination of all three
                - What he'll provide financially and emotionally for her and vary these maybe he's doing amazingly financially or just able to provide a comfortable existence for her or somewhere in between
                - a call to action to get a lady interested in speaking to him.

                Ensure the language, tone, and content reflect the person's distinct character. Use anecdotes and specific hobbies to make the profile feel personal and genuine.
                Don't use the word connections or double hyphens "--" and try to keep each point to just one paragraph. 
                Below are some profiles you have previously generated. Make sure to generate something that while following the rule is unique theme wise and linguistically from the below: 
                {json.dumps(returned)} 
              """
    return prompt
    
def generate_suggestions(conversation):
    """Generates three response suggestions based on the conversation and guys personality."""

    messages = [
        {"role": "system", "content": "You are a charming, respectful conversationalist who expresses romantic interest in the person you are talking to. Be attentive, warm, and kind."},
        {"role": "user", "content": choose_prompt(conversation)}
    ]
    
    logging.info("Prompt to generate responses:")
    logging.info(conversation)
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # or use gpt-4 if available
            messages=messages,
            n=3,  # Single prompt, not multiple completions
        )
        
        suggestions_genned = []
        for i, choice in enumerate(response.choices):
            logging.info(f"Suggestion {i + 1}: {choice.message.content}\n")
            suggestions_genned.append(choice.message.content)
        return suggestions_genned
    except Exception as e:
        logging.error(f"Error: {e}")
        return []
    
def generate_profile(data):
    prompt = choose_prompt_profile_generator(data)
    messages = [
        {"role": "system", "content": "You are a dating coach."},
        {"role": "user", "content": prompt}
    ]
    
    logging.info("Prompt to generate responses:")
    logging.info(prompt)
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # or use gpt-4 if available
            messages=messages,
            n=1,  # Single prompt, not multiple completions
        )
        
        suggestions_genned = []
        for i, choice in enumerate(response.choices):
            logging.info(f"Suggestion {i + 1}: {choice.message.content}\n")
            suggestions_genned.append(choice.message.content) 

        with open(f"{data_locale}{datetime.datetime.now().timestamp()}.txt", 'w') as file: 
            file.write(json.dumps(suggestions_genned, indent=2))

        return suggestions_genned
    except Exception as e:
        logging.error(f"Error: {e}")
        return []

def setprofiledata(data):
    prompt = f'''
    Based on the data below I want you to generate a json object. 
    - The occupation should be under a property name currentoccupation1
    - The age under age1
    - The nationality under ethnicity1
    - The city under city1
    - The country under country1 extrapolated from the city name. 
    - A full male first and second name, choose an uncommon name but one that comes from his nationality under the property name fullname1.
    Respond ONLY with the json. Here is the data:
    {data['details']}
    '''
    messages = [
        {"role": "system", "content": "You are an api endpoint that returns json given certain input parameters."},
        {"role": "user", "content": prompt}
    ]
    
    logging.info("Prompt to generate responses:")
    logging.info(prompt)
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # or use gpt-4 if available
            messages=messages,
            n=1,  # Single prompt, not multiple completions
        )
        
        suggestions_genned = []
        for i, choice in enumerate(response.choices):
            logging.info(f"Suggestion {i + 1}: {choice.message.content}\n")
            suggestions_genned.append(choice.message.content) 

        return suggestions_genned[0].replace('```json', '').replace('—', ', ').replace('```', '').strip()
    except Exception as e:
        logging.error(f"Error: {e}")
        return json.dumps({"data": "error"})
    
def generalprompt(data):
    messages = [
        {"role": "system", "content": data['context']},
        {"role": "user", "content": data['prompt']}
    ]
    
    logging.info("Prompt to generate responses:")
    logging.info(data['prompt'])

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # or use gpt-4 if available
            messages=messages,
            n=int(data['numofresponses']),  # Single prompt, not multiple completions
        )
        
        suggestions_genned = []
        for i, choice in enumerate(response.choices):
            logging.info(f"Suggestion {i + 1}: {choice.message.content}\n")
            suggestions_genned.append(choice.message.content) 

        return suggestions_genned
    except Exception as e:
        logging.error(f"Error: {e}")
        return json.dumps({"data": "error"})

if __name__ == '__main__':
    # Example usage
    conversation = """
    User: I've been feeling really anxious lately. It's like I'm stuck in my head, and I don't know how to get out.
    AI: I'm really sorry you're going through this. It's normal to feel overwhelmed sometimes.
    """

    suggestions = generate_suggestions(conversation)
    print("Here are the suggestions:")
    for i, suggestion in enumerate(suggestions, 1):
        print(f"{i}. {suggestion}")
