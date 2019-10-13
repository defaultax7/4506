$('#registerNext').click(() => {
    $('#registerNext').attr('disabled', true)
    let step = $('#registerBox').data('step')
    if (step === 3) {
      setTimeout("window.location = 'index.html'", 3000)
      return showAlert('Account registeration successful.<br/>Auto redirect in 3 seconds.')
    } else {
      $('#registerBack').attr('disabled', false)
      step++
      if (step > 2) {
        $('#registerNext').text('Submit')
        $('#acInfo').html(`Username: ${$('#username').val()}<br />
          Email: ${$('#email').val()}
        `)
        $('#personalInfo').html(`Name: ${$('#firstname').val()}${$('#lastname').val()}<br />
          Mobile Phone: ${$('#phone').val()}<br />
          Birth Date: ${$('#date').val()}<br />
          Gender: ${$('#gender:checked').val()}
        `);
        if ($('#agreeTos:checked').length > 0) {
          $('#registerNext').attr('disabled', false)
        }
      }
      $('.step.active').removeClass('active').addClass('disabled')
      $('.steps').children().eq(step - 1).removeClass('disabled').addClass('active')
      $('#step1, #step2, #step3').hide()
      $('#step' + step).show()
      $('#registerBox').data('step', step)
    }
  })

  function validateForm1() {
    restaurantName = $('#restaurantName').val(),
    foundDate = $('#foundDate').val(),
    valid = true
    
    // $('#error').html('').show()
    // if (!validateEmail($('#email').val())) {
    //   $('#error').append('Invalid Email address.<br/>')
    //   $('#email').addClass('invalid')
    //   valid = false
    // } else {
    //   $('#email').removeClass('invalid')
    // }
    // if (username.length < 6) {
    //   $('#error').append('Username cannot less than 6 characters.<br/>')
    //   $('#username').addClass('invalid')
    //   valid = false
    // } else {
    //   $('#username').removeClass('invalid')
    // }
    // if (password.length < 6) {
    //   $('#error').append('Password cannot less than 6 characters.<br/>')
    //   $('#password').addClass('invalid')
    //   valid = false
    // } else {
    //   $('#password').removeClass('invalid')
    // }
    // if (password != password_confirmation) {
    //   $('#error').append('Two password is not match.<br/>')
    //   $('#password_confirmation').addClass('invalid')
    //   valid = false
    // } else {
    //   $('#password_confirmation').removeClass('invalid')
    // }
    if (valid) {
      $('#error').hide()
      $('#registerNext').attr('disabled', false)
    }
  }

  $('#restaurantName, #foundDate').change(() => {
    validateForm1()
  })