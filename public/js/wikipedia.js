window.onload = async function () {
    const cityName = document.getElementById("city").textContent;

    fetch(`/photo?city=${cityName}`)
        .then(response => response.json())
        .then(data => {
            const photoDiv = document.getElementById("photo");
            const img = document.createElement("img");
            img.src = data;
            img.style.width = "100%";
            img.style.height = "auto";
            photoDiv.appendChild(img);
        })
        .catch(error => {
            console.error(error);
        });
};
