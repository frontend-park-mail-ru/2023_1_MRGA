fetch("localhost:8080/login", {
    method: 'POST',
    headers: {

        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
    .then((response) => response.json())
    .then((data) => {
        console.log("Success:", data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });