import axios from 'axios';
import random from 'random';

async function sendRandomIncident(amount) {

    for (let i = 0; i < amount; i++) {
        try {
            const incident = {
                "type": random.choice(["traffic_jam", "road_closed", "accident"]),
                "location": {
                    "lat": random.float(49.4478, 50.1828),
                    "lon": random.float(5.7349,6.5286)
                },
            };
            const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTMyODlhMWFjMGQ3MTAwNDZmNzNiZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQyOTQwMzE0LCJleHAiOjE3NDMxOTk1MTR9.TDsoEMZBPOyy6Y0coWg8DOaAMXRbH7sbalEStDueS58'
                };
            const response = await axios.post('http://localhost:5000/api/incidents/create', incident, {headers: headers});
            console.log("Sent incident: ", JSON.stringify(incident));
            console.log(response.status);
        } catch (error) {
            console.error(error);
        }
    }
}

sendRandomIncident(1);