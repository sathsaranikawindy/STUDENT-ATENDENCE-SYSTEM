import requests
from bs4 import BeautifulSoup


def fetch_data(url):
    try:
        response = requests.get(url) 
        response.raise_for_status()  
        return response.text 
    except requests.RequestException as e: 
        print(f"Error fetching data: {e}") 
        return None


def process_data(data):
    if data: # [cite: 17]
        soup = BeautifulSoup(data, "html.parser") 
        
        
        quote_elements = soup.find_all("div", class_="quote")
        
        print("\n--- Extracted Quotes ---")
        for item in quote_elements:
            
            text = item.find("span", class_="text").text
            author = item.find("small", class_="author").text
            
           
            print(f"{text} — {author}") 
    else:
        print("No data to process.") 

def main():
    url = input("Enter the URL: ").strip() 
    data = fetch_data(url) 
    process_data(data) 

if __name__ == "__main__": 
    main() 