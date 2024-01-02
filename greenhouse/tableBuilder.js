// tableBuilder.js

import { inputData } from './data.js';

function buildTable(data) {
    // Sort the data array alphabetically based on the "Scientific Name" field
    data.sort(function (a, b) {
        var nameA = a["Scientific Name"].toLowerCase();
        var nameB = b["Scientific Name"].toLowerCase();
        return nameA.localeCompare(nameB);
    });

    // Create a table element
    var table = document.createElement("table");

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

    // Append the table to the document body or any other desired container
    document.body.appendChild(table);
}

// Example usage of buildTable function with imported data
buildTable(inputData);
