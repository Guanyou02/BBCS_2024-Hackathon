"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('wishForm');
    const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));

    form.addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent default form submission

        // Collect form data
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        const formFile = document.getElementById('formFile').files[0]; // Get the uploaded file

        // Create form data object for file uploads
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", formFile);  // The name 'image' should match the backend field name

        try {
            // Send POST request to backend with form data (this would require backend handling multipart data)
            const response = await fetch('/api/wishes', {
                method: 'POST',
                body: formData,  // Send the FormData
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                thankYouModal.show(); // Show thank-you modal after successful submission
                form.reset(); // Clear the form
            } else {
                console.error('Error:', await response.text());
                alert('Error submitting the form. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred.');
        }
    });
});

document.addEventListener('DOMContentLoaded', async function () {
    const wishesContainer = document.getElementById('wishesContainer'); // Container for sticky notes

    try {
        const response = await fetch('/api/wishes'); // Adjust URL to match your backend
        if (response.ok) {
            const wishes = await response.json(); // Parse the JSON response

            // Create a sticky note for each wish
            wishes.forEach(wish => {
                const wishElement = document.createElement('div');
                wishElement.className = 'wish'; // Apply sticky note style
                wishElement.innerHTML = `
                    <h3>${wish.id}. ${wish.name}</h3>
                    <img src="data:image/jpeg;base64,${wish.image}" alt="${wish.name}"/>
                    <p>${wish.description}</p>
                    <p>$${wish.price}</p>
                `;
                wishesContainer.appendChild(wishElement);

                // Add click event to display full wish in a modal
                wishElement.addEventListener('click', () => {
                    // Create a modal for the full content
                    const modalContent = `
                        <div class="modal-overlay">
                            <div class="modal-content">
                                <button class="close-modal col-lg-6">X</button>
                                <h3>${wish.id}. ${wish.name}</h3>
                                <img src="data:image/jpeg;base64,${wish.image}" alt="${wish.name}" style="width: 100%; height: auto; margin-bottom: 20px;" />
                                <p>${wish.description}</p>
                                <div class="row">
                                    <p class="col-lg-6 mt-3">Price: $${wish.price}</p>
                                    <button type="button" class="btn border border-dark rounded shadow-lg col-lg-6"
                style="background-color: #FFFFFF; color: #2c6baf; font-weight: bold;">Buy</button>
                                </div>
                            </div>
                        </div>
                    `;

                    // Append modal to the body
                    document.body.insertAdjacentHTML('beforeend', modalContent);

                    // Add event listener to close the modal
                    document.querySelector('.close-modal').addEventListener('click', () => {
                        document.querySelector('.modal-overlay').remove();
                    });
                });
            });
        } else {
            console.error('Failed to fetch wishes:', await response.text());
        }
    } catch (error) {
        console.error('Error:', error);
    }
});