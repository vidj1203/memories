// script.js
const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const dateInput = document.getElementById('dateInput');
const imageGallery = document.getElementById('imageGallery');

// Load images from local storage on page load
window.addEventListener('DOMContentLoaded', () => {
    loadImages();
});

uploadForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const files = fileInput.files;
    const date = dateInput.value; // Get the date input value

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function() {
            const img = document.createElement('img');
            img.src = reader.result;

            const dateElement = document.createElement('p');
            dateElement.textContent = date;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                deleteImage(img.src); // Call deleteImage function when clicked
                imageGallery.removeChild(container); // Remove image container from the webpage
            });

            const container = document.createElement('div');
            container.appendChild(img);
            container.appendChild(dateElement);
            container.appendChild(deleteButton);

            imageGallery.appendChild(container);

            // Save uploaded image and its date to local storage
            saveImage(reader.result, date);
        }

        reader.readAsDataURL(file);
    }

    fileInput.value = ''; // Clear the input after uploading
});

function saveImage(imageData, date) {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images.push({ imageData, date });
    // Sort images by date before saving to local storage
    images.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem('images', JSON.stringify(images));
}

function loadImages() {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    images.forEach(imageData => {
        const img = document.createElement('img');
        img.src = imageData.imageData;

        const dateElement = document.createElement('p');
        dateElement.textContent = imageData.date;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteImage(img.src); // Call deleteImage function when clicked
            imageGallery.removeChild(container); // Remove image container from the webpage
        });

        const container = document.createElement('div');
        container.appendChild(img);
        container.appendChild(dateElement);
        container.appendChild(deleteButton);

        imageGallery.appendChild(container);
    });
}

function deleteImage(imageSrc) {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images = images.filter(image => image.imageData !== imageSrc);
    localStorage.setItem('images', JSON.stringify(images));
}
