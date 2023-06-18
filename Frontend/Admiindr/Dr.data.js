

$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault(); // Prevent form submission

    // Collect form data
    var formData = {
      name: $('#name').val(),
      age: $('#age').val(),
      email: $('#email').val(),
      imageURL: $('#imageURL').val(),
      feesAddress: $('#feesAddress').val(),
      description: $('#description').val()
    };

    // Send AJAX request
    $.ajax({
      type: 'POST',
      url: 'https://greasy-sofa-244-production.up.railway.app/doctor/newdr',
      data: formData,
      success: function(response) {
        // Handle success response
        console.log('Form data submitted successfully!');
        console.log(response); // Log the response from the server
      },
      error: function(error) {
        // Handle error response
        console.error('Error submitting form data:');
        console.error(error);
      }
    });
  });
});
