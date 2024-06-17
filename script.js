document.getElementById('donationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    document.getElementById('donationForm').classList.add('hidden');
    document.getElementById('qrCodeContainer').classList.add('hidden');
    document.getElementById('thankYouMessage').classList.remove('hidden');
});

let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// PayPal Button
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '10.00' // Can be dynamically set
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
            document.getElementById('donationForm').classList.add('hidden');
            document.getElementById('qrCodeContainer').classList.add('hidden');
            document.getElementById('thankYouMessage').classList.remove('hidden');
        });
    }
}).render('#paypal-button-container');
