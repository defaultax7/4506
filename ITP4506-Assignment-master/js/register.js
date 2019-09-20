$(document).ready(() => {
  $('#step2, #step3, #error').hide()
  if (localStorage.getItem('auth') > 0) {
    window.location = 'index.html'
  }
})

$('#email, #username, #password, #password_confirmation').change(() => {
  validateForm1()
})

$('#firstname, #lastname, #phone, #date, #gender').change(() => {
  validateForm2()
})

$('#registerBack').click(() => {
  let step = $('#registerBox').data('step')
  $('#registerNext').text('Next')
  $('#registerBack').attr('disabled', false)
  $('#registerNext').attr('disabled', true)
  step--
  if (step <= 1) {
    $('#registerBack').attr('disabled', true)
    step = 1
  }
  $('.step.active').removeClass('active').addClass('disabled')
  $('.steps').children().eq(step - 1).removeClass('disabled').addClass('active')
  $('#step1, #step2, #step3').hide()
  $('#step' + step).show()
  $('#registerBox').data('step', step)
  verifyForm(step)
})

$('#agreeTos').click(() => {
  if ($('#registerBox').data('step') === 3) {
    $('#registerNext').attr('disabled', $('#agreeTos:checked').length === 0)
  }
})

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


function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email)
}

function verifyForm(step) {
  if (step == 1) {
    validateForm1()
  } else if (step == 2) {
    validateForm2()
  }
}

function validateForm1() {
  let username = $('#username').val(),
  password = $('#password').val(),
  password_confirmation = $('#password_confirmation').val(),
  valid = true
  $('#error').html('').show()
  if (!validateEmail($('#email').val())) {
    $('#error').append('Invalid Email address.<br/>')
    $('#email').addClass('invalid')
    valid = false
  } else {
    $('#email').removeClass('invalid')
  }
  if (username.length < 6) {
    $('#error').append('Username cannot less than 6 characters.<br/>')
    $('#username').addClass('invalid')
    valid = false
  } else {
    $('#username').removeClass('invalid')
  }
  if (password.length < 6) {
    $('#error').append('Password cannot less than 6 characters.<br/>')
    $('#password').addClass('invalid')
    valid = false
  } else {
    $('#password').removeClass('invalid')
  }
  if (password != password_confirmation) {
    $('#error').append('Two password is not match.<br/>')
    $('#password_confirmation').addClass('invalid')
    valid = false
  } else {
    $('#password_confirmation').removeClass('invalid')
  }
  if (valid) {
    $('#error').hide()
    $('#registerNext').attr('disabled', false)
  }
}

function validateForm2() {
  let firstname = $('#firstname').val(),
  lastname = $('#lastname').val(),
  phone = $('#phone').val(),
  date = $('#date').val(),
  gender = $('#gender:checked').val(),
  valid = true
  $('#error').html('').show()
  if (!firstname) {
    $('#error').append('First name cannot be empty.<br/>')
    $('#firstname').addClass('invalid')
    valid = false
  } else {
    $('#firstname').removeClass('invalid')
  }
  if (!lastname) {
    $('#error').append('Last name cannot be empty.<br/>')
    $('#lastname').addClass('invalid')
    valid = false
  } else {
    $('#lastname').removeClass('invalid')
  }
  if (!phone) {
    $('#error').append('Phone number cannot be empty.<br/>')
    $('#phone').addClass('invalid')
    valid = false
  } else {
    $('#phone').removeClass('invalid')
  }
  if (!date) {
    $('#error').append('Birth date cannot be empty.<br/>')
    $('#date').addClass('invalid')
    valid = false
  } else if (new Date() < Date.parse(date)) {
    $('#error').append('Birth date can not greater than today.<br/>')
    $('#date').addClass('invalid')
    valid = false
  } else {
    $('#date').removeClass('invalid')
  }
  if (!gender) {
    $('#error').append('Gender cannot be empty.<br/>')
    $('#gender').addClass('invalid')
    valid = false
  } else {
    $('#gender').removeClass('invalid')
  }
  if (valid) {
    $('#error').hide()
    $('#registerNext').attr('disabled', false)
  }
}
