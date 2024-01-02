// tableBuilder.js

import { inputData } from './data.js';

function buildFigureTable(data) {
    // Sort the data array alphabetically based on the "Scientific Name" field
    data.sort(function (a, b) {
        var nameA = a["Scientific Name"].toLowerCase();
        var nameB = b["Scientific Name"].toLowerCase();
        return nameA.localeCompare(nameB);
    });

    // Create a container element
    var container = document.createElement("div");
    container.id = "figureTableContainer";
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

    // Return the container element
    return container;
}

// Example usage of buildFigureTable function with imported data
var figureTableContainer = buildFigureTable(inputData);
document.body.appendChild(figureTableContainer);

function buildDataTable(data) {
    // Sort the data array alphabetically based on the "Scientific Name" field
    data.sort(function (a, b) {
        var nameA = a["Scientific Name"].toLowerCase();
        var nameB = b["Scientific Name"].toLowerCase();
        return nameA.localeCompare(nameB);
    });

    // Create a table element
    var table = document.createElement("table");
    table.id = "dataTableContainer";
    table.style.display = "none"; // Initially hide the table

    // Create a header row
    var headerRow = table.insertRow();
    for (var key in data[0]) {
        if (data[0].hasOwnProperty(key) && key.toLowerCase() !== "in inventory") {
            var th = document.createElement("th");
            th.textContent = key;
            headerRow.appendChild(th);
        }
    }

    // Create rows and cells with data
    for (var i = 0; i < data.length; i++) {
        // Skip creating the row if "In Inventory" is set to "No"
        if (data[i]["In Inventory"].toLowerCase() === "no") {
            continue;
        }

        var row = table.insertRow();
        for (var key in data[i]) {
            if (data[i].hasOwnProperty(key) && key.toLowerCase() !== "in inventory") {
                var cell = row.insertCell();
                // For the "Image" key, create an img element
                if (key.toLowerCase() === "image") {
                    var img = document.createElement("img");
                    img.src = data[i][key];
                    img.alt = "Image";
                    img.style.maxHeight = "100px"; // Adjust the max width as needed

                    // Add event listener for hover effect
                    img.addEventListener('mouseover', function() {
                        this.style.height = "100%";
                        this.style.width = "auto";
                        this.style.maxHeight = "500px";
                    });

                    // Add event listener for mouseout to reset styles
                    img.addEventListener('mouseout', function() {
                        this.style.height = "100px";
                        this.style.width = "auto";
                        this.style.maxHeight = "100px";
                    });

                    cell.appendChild(img);
                } else if (key.toLowerCase() === "scientific name") {
                    // Check if the key is "Scientific Name" (case-insensitive) and apply italic styling
                    var italicizedText = document.createElement("i");
                    italicizedText.textContent = data[i][key];
                    cell.appendChild(italicizedText);
                } else if (key.toLowerCase() === "in seed bank") {
                    // Check if the key is "In Seed Bank" (case-insensitive) and create a checkbox
                    var checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = data[i][key].toLowerCase() === "checked";
                    checkbox.onclick = function() {
                        return false;
                    };
                    cell.appendChild(checkbox);
                } else {
                    cell.textContent = data[i][key];
                }
            }
        }
    }

    // Return the table element
    return table;
}

// Example usage of buildDataTable function with imported data
var dataTableContainer = buildDataTable(inputData);
document.body.appendChild(dataTableContainer);

// Function to toggle table visibility
function toggleTableVisibility(table, button) {
    // Hide the other table before showing the selected one
    if (table.id === "figureTableContainer") {
        dataTableContainer.style.display = "none";
        toggleDataTableButton.disabled = false;
    } else if (table.id === "dataTableContainer") {
        figureTableContainer.style.display = "none";
        toggleFigureButton.disabled = false;
    }

    table.style.display = table.style.display === "none" ? "table" : "none";
    button.disabled = true;
}

// Create buttons to toggle table visibility
var toggleFigureButton = document.createElement("button");
toggleFigureButton.textContent = "Toggle Figure Table";
toggleFigureButton.onclick = function() {
    toggleTableVisibility(figureTableContainer, toggleFigureButton);
};
toggleFigureButton.disabled = true; // Initially disable the figure button

var toggleDataTableButton = document.createElement("button");
toggleDataTableButton.textContent = "Toggle Data Table";
toggleDataTableButton.onclick = function() {
    toggleTableVisibility(dataTableContainer, toggleDataTableButton);
};

// Append buttons to the document body or any other desired container
document.body.appendChild(toggleFigureButton);
document.body.appendChild(toggleDataTableButton);
