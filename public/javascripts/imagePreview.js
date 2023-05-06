const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('image-preview');
imageInput.addEventListener('change', function (event) {
    imagePreview.innerHTML = ''; // Remove any previously displayed image
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            const imageElement = document.createElement('img');
            imageElement.src = reader.result;
            imagePreview.appendChild(imageElement);
        });
        reader.readAsDataURL(file);
    }
});
