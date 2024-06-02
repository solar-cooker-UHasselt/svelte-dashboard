import requests
import time

# The URL of your SvelteKit API endpoint
# Change this to your actual endpoint
url = "http://localhost:5173/api/receive-data"

counter = 0

# Function to send CSV data


def send_csv_data():
    # The CSV data to be sent
    csv_data = f"{counter},2024,06,2,17,42,30"  # Example CSV data

    # Headers to indicate that the content type is CSV
    headers = {
        "Content-Type": "text/csv"
    }

    # Make the POST request
    response = requests.post(url, headers=headers, data=csv_data)

    # Print the response from the server
    if response.ok:
        print("Success:", response.json())
    else:
        print("Failed:", response.status_code, response.text)


# Send data continuously
while True:
    send_csv_data()
    counter += 1
    time.sleep(5)  # Wait for 5 seconds before sending the next data
