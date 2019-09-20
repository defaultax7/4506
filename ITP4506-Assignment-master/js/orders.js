$('#a_room, #c_room, #c_room_no').change(() => {
  let adult = $('#a_room').val(),
    child = $('#c_room').val(),
    nobed = $('#c_room_no').val()
  total = adult * 4999 + child * 4999 + nobed * 3999
  $('.price').text(`Total: HK$${total}`)
})

$('#creditcard').click(() => {
  $('#creditInput').show()

})

$('#paypal').click(() => {
  $('#creditInput').hide()

})

$(document).ready(() => {
  let step = $('#orderBox').data('step')
  if (localStorage.getItem('auth') != 1) {
    location = 'index.html'
  }
  $('#step1, #step2, #step3, #step4').hide()
  $(`#step${step}`).show()
  var now = new Date()
  var day = ("0" + now.getDate()).slice(-2)
  var month = ("0" + (
  now.getMonth() + 1)).slice(-2)
  var today = now.getFullYear() + "-" + (
  month) + "-" + (
  day)
  $('#h_in').val(today)
})

$('.orderNext').click(() => {
  let step = $('#orderBox').data('step')
  let valid = true
  if (step === 2) {
    if (valid) {
      $('.roomArrangeType').each((i, item) => {
        if (!$(item).val()) {
          valid = false;
          alert(`Traveler ${i+1}'s Room Type cannot be empty!`)
          return false;
        }
      })
    }
    if (valid) {
      $('.surName').each((i, item) => {
        if (!$(item).val()) {
          valid = false;
          alert(`Traveler ${i+1}'s Surname cannot be empty!`)
          return false;
        }
      })
    }
    if (valid) {
      $('.givenName').each((i, item) => {
        if (!$(item).val()) {
          valid = false;
          alert(`Traveler ${i+1}'s GivenName cannot be empty!`)
          return false;
        }
      })
    }
    if (valid) {
      $('.genderName').each((i, item) => {
        if (!$(item).val()) {
          valid = false;
          alert(`Traveler ${i+1}'s GenderName cannot be empty!`)
          return false;
        }
      })
    }
    if (valid) {
      $('.travelDocNo').each((i, item) => {
        if (!$(item).val()) {
          valid = false;
          alert(`Traveler ${i+1}'s Travel Doc No cannot be empty!`)
          return false;
        }
      })
    }
    if (valid) {
      $('.travelDocExpireDate').each((i, item) => {
        if (!$(item).val()) {
          valid = false;
          alert(`Traveler ${i+1}'s Travel Doc Expire date cannot be empty!`)
          return false;
        }
      })
    }
    if (valid) {
      $('.Nation').each((i, item) => {
        if (!$(item).val()) {
          valid = false;
          alert(`Traveler ${i+1}'s Nationality cannot be empty!`)
          return false;
        }
      })
    }
    if (valid) {
      $('.birthday').each((i, item) => {
        if (!$(item).val()) {
          valid = false;
          alert(`Traveler ${i+1}'s Birthday cannot be empty!`)
          return false;
        }
      })
    }
    if (valid) {
      if (!$('.contact_genderName').val()) {
        valid = false;
        alert("Contact Peron's GenderName cannot be empty!")
      }
    }
    if (valid) {
      if (!$('.contact_email').val()) {
        valid = false;
        alert("Contact Peron's Email cannot be empty!")
      }
    }
    if (valid) {
      if (!$('.contact_surName').val()) {
        valid = false;
        alert("Contact Peron's Surname cannot be empty!")
      }
    }
    if (valid) {
      if (!$('.contact_givenName').val()) {
        valid = false;
        alert("Contact Peron's GivenName cannot be empty!")
      }
    }
  } else if (step === 4) {
    if ($('#creditcard:checked').length === 1) {
      if (valid) {
        if (!$('#payment_card').val()) {
          valid = false;
          alert("Card Number cannot be empty!")
        }
      }
      if (valid) {
        if (!$('#payment_name').val()) {
          valid = false;
          alert("Card Holder cannot be empty!")
        }
      }
      if (valid) {
        if (!$('#payment_exp').val()) {
          valid = false;
          alert("Expire date cannot be empty!")
        }
      }
      if (valid) {
        if (!$('#payment_cvv').val()) {
          valid = false;
          alert("CVV cannot be empty!")
        }
      }
    } else if ($('#paypal:checked').length === 0) {
      valid = false;
      alert("Please choose an payment method!")
    }
  }
  if (valid) {
    step++
    $('.step.active').removeClass('active').addClass('disabled')
    $('.steps').children().eq(step - 1).removeClass('disabled').addClass('active')
    if (step < 5) {
      $('#step1, #step2, #step3').hide()
      $('#step' + step).show()
    }
    $('#orderBox').data('step', step)
    if (step === 2) {
      let total = parseInt($('#a_room').val()) + parseInt($('#c_room').val()) + parseInt($('#c_room_no').val())
      $('#travelerInput').html('')
      for (let i = 1; i <= total; i++) {
        $('#travelerInput').append(`<div class="col-12 mb-4">
          <p><strong>No.${i} Traveler</strong></p>
          <table class="table table-striped">
            <tbody>
              <tr>
                <td>
                  Room<span style="color: red">*</span>
                </td>
                <td colspan="3">
                  <select class="custom-select ht_input roomArrangeType" name="RoomArrangeType">
                    <option disabled selected>Please select an option</option>
                    <option value="Single man">Single man</option>
                    <option value="Single lady">Single lady</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Surname<span style="color: red">*</span></td>
                <td colspan="3">
                  <input placeholder="Surname" name="SurName" class="ht_input surName">
                </td>
              </tr>
              <tr>
                <td>GivenName<span style="color: red">*</span></td>
                <td colspan="3">
                  <input placeholder="GivenName" name="GivenName" class="ht_input givenName">
                  <label>Passenger's name must be the same as travel document</label>
                </td>
              </tr>
              <tr>
                <td>Title<span style="color: red">*</span></td>
                <td colspan="3">
                  <select class="custom-select ht_input genderName" name="genderName">
                    <option disabled selected>Please select an option</option>
                    <option value="MR">MR</option>
                    <option value="MRS">MRS</option>
                    <option value="MS">MS</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>ID number<span style="color: red">*</span></td>
                <td colspan="3">
                  <input class="ht_input travelDocNo" maxlength="20" />
                </td>
              </tr>
              <tr>
                <td>Valid date<span style="color: red">*</span></td>
                <td colspan="3">
                  <input class="ht_input travelDocExpireDate" placeholder="DD/MM/YYYY" type="date">
                </td>
              </tr>
              <tr>
                <td>Nationality<span style="color: red">*</span></td>
                <td>
                  <select class="custom-select ht_input Nation">
                    <option disabled selected>Please select an option</option>
                    <option value="AT">Austria</option>
                    <option value="KH">Cambodia</option>
                    <option value="CA">Canada</option>
                    <option value="TD">Chad</option>
                    <option value="CL">Chile</option>
                    <option value="CN">China</option>
                    <option value="HK">Hong Kong</option>
                    <option value="IS">Iceland</option>
                    <option value="IT">Italy</option>
                    <option value="JP">Japan</option>
                    <option value="KR">Korea (south)</option>
                    <option value="SE">Sweden</option>
                    <option value="TW">Taiwan</option>
                    <option value="GB">United Kingdom</option>
                    <option value="US">United States</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Birthday<span style="color: red">*</span></td>
                <td><input class="ht_input birthday" placeholder="DD/MM/YYYY" type="date"></td>
              </tr>
            </tbody>
          </table>
        </div>`);
      }
      $('#travelerInput').append(`<div class="col-12 mb-4">
        <p><strong>Contact information</strong></p>
        <table class="table table-striped">
          <tbody>
            <tr>
              <td>Title<span style="color: red">*</span></td>
              <td colspan="3">
                <select class="custom-select ht_input contact_genderName" name="contact_genderName">
                  <option disabled selected>Please select an option</option>
                  <option value="MR">MR</option>
                  <option value="MRS">MRS</option>
                  <option value="MS">MS</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Surname<span style="color: red">*</span></td>
              <td colspan="3">
                <input placeholder="Surname" name="SurName" class="ht_input contact_surName">
              </td>
            </tr>
            <tr>
              <td>GivenName<span style="color: red">*</span></td>
              <td colspan="3">
                <input placeholder="GivenName" name="GivenName" class="ht_input contact_givenName">
              </td>
            </tr>
            <tr>
              <td>Email<span style="color: red">*</span></td>
              <td colspan="3">
                <input placeholder="Email" name="Email" class="ht_input contact_email">
              </td>
            </tr>
          </tbody>
        </table>
      </div>`)
    } else if (step === 3) {
      let total = parseInt($('#a_room').val()) + parseInt($('#c_room').val()) + parseInt($('#c_room_no').val())
      $('#travelerInfo').html('')
      for (let i = 1; i <= total; i++) {
        $('#travelerInfo').append(`<div class="col-12 mb-4">
          <p><strong>No.${i} Traveler</strong></p>
          <table class="table table-striped">
            <tbody>
              <tr>
                <td>
                  Room<span style="color: red">*</span>
                </td>
                <td colspan="3">${$($('.roomArrangeType')[i - 1]).val()}</td>
              </tr>
              <tr>
                <td>Name<span style="color: red">*</span></td>
                <td colspan="3">${$($('.genderName')[i - 1]).val()}. ${$($('.surName')[i - 1]).val()} ${$($('.givenName')[i - 1]).val()}</td>
              </tr>
              <tr>
                <td>ID number<span style="color: red">*</span></td>
                <td colspan="3">${$($('.travelDocNo')[i - 1]).val()}</td>
              </tr>
              <tr>
                <td>Valid date<span style="color: red">*</span></td>
                <td colspan="3">${$($('.travelDocExpireDate')[i - 1]).val()}</td>
              </tr>
              <tr>
                <td>Nationality<span style="color: red">*</span></td>
                <td colspan="3">${$($('.Nation')[i - 1]).val()}</td>
              </tr>
              <tr>
                <td>Birthday<span style="color: red">*</span></td>
                <td colspan="3">${$($('.birthday')[i - 1]).val()}</td>
              </tr>
            </tbody>
          </table>
        </div>`);
      }
      $('#travelerInfo').append(`<div class="col-12 mb-4">
        <p><strong>Contact information</strong></p>
        <table class="table table-striped">
          <tbody>
            <tr>
              <td>Name<span style="color: red">*</span></td>
              <td colspan="3">${$('.contact_genderName').val()}. ${$('.contact_surName').val()} ${$('.contact_givenName').val()}</td>
            </tr>
            <tr>
              <td>Email<span style="color: red">*</span></td>
              <td colspan="3">${$('.contact_email').val()}</td>
            </tr>
          </tbody>
        </table>
      </div>`)
    } else if (step === 5) {
      setTimeout("window.location = 'index.html'", 3000)
      return showAlert('Payment successful.<br/>Auto redirect in 3 seconds.')
    }
  }
})

$('.orderBack').click(() => {
  let step = $('#orderBox').data('step')
  $('.orderNext').text('Next')
  step--
  if (step <= 1) {
    step = 1
  }
  $('.step.active').removeClass('active').addClass('disabled')
  $('.steps').children().eq(step - 1).removeClass('disabled').addClass('active')
  $('#step2, #step3, #step4, #step5').hide()
  $('#step' + step).show()
  $('#orderBox').data('step', step)
})

$('.saveCart').click(() => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [],
  id = getUrlParams(location.search).id || 1
  cart.push({type: type, id: id, price: $('.price').first().text().split(' ')[1]})
  localStorage.setItem('cart', JSON.stringify(cart))
  location = 'cart.html'
})
