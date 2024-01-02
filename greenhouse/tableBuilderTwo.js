// tableBuilder.js

import { inputData } from './data.js';

function buildTable(data) {
    // Sort the data array alphabetically based on the "Scientific Name" field
    data.sort(function (a, b) {
        var nameA = a["Scientific Name"].toLowerCase();
        var nameB = b["Scientific Name"].toLowerCase();
        return nameA.localeCompare(nameB);
    });

    // Create a container element
    var container = document.createElement("div");
    container.className = "data-container";

    // Create elements for each data entry
    for (var i = 0; i < data.length; i++) {
        // Skip creating elements if "In Inventory" is set to "No"
        if (data[i]["In Inventory"].toLowerCase() === "no") {
            continue;
        }

        // Create a link element
        var link = document.createElement("a");
        link.className = "figure-links";
        link.href = "#"; // Replace with the actual link if available

        // Create a figure element
        var figure = document.createElement("figure");
        figure.className = "figure-preview";

        // Create an image element
        var img = document.createElement("img");
        img.className = "figure-image";
        img.src = data[i]["Image"];
        img.alt = "Image";

        // Set the max width and height for the image
        img.style.maxWidth = "280px";
        img.style.maxHeight = "280px";
        // Ensure images crop instead of being distorted
        img.style.objectFit = "cover";

        // Create a figcaption element
        var figcaption = document.createElement("figcaption");

        // Create a span element for Family Name (bolded)
        var familyName = document.createElement("span");
        familyName.textContent = data[i]["Family Name"];
        familyName.style.fontWeight = "bold";

        // Create an i element for Scientific Name (unbolded)
        var scientificName = document.createElement("i");
        scientificName.textContent = data[i]["Scientific Name"];

        // Create a text node for Common Name (unbolded)
        var commonName = document.createTextNode(data[i]["Common Name"]);

        // Create a span element for Seed Availability (unbolded)
        var seedAvailability = document.createElement("span");
        seedAvailability.textContent = "Seed: " + (data[i]["In Seed Bank"] === "Checked" ? "Available" : "Unavailable");

        // Append elements to the figcaption
        figcaption.appendChild(familyName);
        figcaption.appendChild(document.createElement("br"));
        figcaption.appendChild(scientificName);
        figcaption.appendChild(document.createElement("br"));
        figcaption.appendChild(commonName);
        figcaption.appendChild(document.createElement("br"));
        figcaption.appendChild(seedAvailability);

        // Append elements to the figure
        figure.appendChild(img);
        figure.appendChild(figcaption);

        // Append the figure to the link
        link.appendChild(figure);

        // Append the link to the container
        container.appendChild(link);
    }

    // Append the container to the document body or any other desired container
    document.body.appendChild(container);
}

// Example usage of buildTable function with imported data
buildTable(inputData);
