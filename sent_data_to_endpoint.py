import requests
import time
from datetime import datetime

# The URL of your SvelteKit API endpoint
# Change this to your actual endpoint
# url = "https://wonderful-starlight-c328e0.netlify.app/api/receive-data"
url = "http://localhost:5173/api/receive-data"

counter = 0

# Function to send CSV data


def send_csv_data():
    # The CSV data to be sent
    # Year;Month;Day;Hour;Minute;Second;
    # Outside temperature[°C];Wind speed [m/s];Air pressure (inside box) [hPa];
    # Relative humidity (inside box) [%];Temperature inside pot 1 [°C];
    # Temperature inside pot 2 [°C];Temperature inside pot 3 [°C];Solar irradiance [W/m²]
    current_time = datetime.now()
    csv_data = f"{current_time.year};{current_time.month:02};{current_time.day:02};{
        current_time.hour:02};{current_time.minute:02};{current_time.second:02};23.71;1.53;1013.15;40.89;25.13;64.02;x;805.61"

    # Headers to indicate that the content type is CSV
    headers = {
        "Content-Type": "text/csv"
    }

    # Make the POST request
    response = requests.post(url, headers=headers, data=csv_data)

    # Print the response from the server
    if response.ok:
        print(counter, ": Success:", response.json())
    else:
        print(counter, ": Failed:", response.status_code, response.text)


# Send data continuously
while True:
    send_csv_data()
    counter += 1
    time.sleep(5)  # Wait for 5 seconds before sending the next data
