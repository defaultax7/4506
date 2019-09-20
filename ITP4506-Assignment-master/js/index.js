$('body').on('click', '.modal-trigger', async function(e) {
  if ($(this).data('toggle')) {
    e.preventDefault()
    let modal = $(this).data('target')
    await $(modal).css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 0
    }).promise()
    $(modal).addClass('show')
    await $('body').append('<div class="modal-backdrop fade"></div>').css('overflow-y', 'hidden').promise()
    $('.modal-backdrop').addClass('show')
  }
})

$('body').on('click', '.modal.show, .modal-dismiss', async function(e) {
  if (e.target !== this)
    return;
  await $(this).closest('.modal').removeClass('show')
  setTimeout(() => {
    if (!$(this).closest('.modal').hasClass('show') && $(this).closest('.modal').hasClass('modal')) {
      $('body').css({'overflow-y': 'scroll'})
      $(this).closest('.modal').attr('style', '')
      $('.modal-backdrop').last().remove()
    }
    $('#errorModal .trigger').removeClass('drawn')
  }, 150)
})

$('body').on('click', '#toursTag, #hotelsTag', function(){
  try {
    let scrollTo = $(this).attr('href').split('#')[1]
    let position = $('#'+scrollTo).offset().top - 70
    $('html, body').animate({scrollTop: position},1000)
  } catch(e) {}
})

$(document).ready(function() {
  $('.ht_searchBox,.ht_caption').addClass('show');
  if (location.hash) {
    try {
      let position = $(location.hash).offset().top - 70
      $('html, body').animate({scrollTop: position},1000)
    } catch(e) {}
  }
  showNavItem()
});

$('.ht_searchBox_tab > .tablinks').click(function(e) {
  let content = $(this).data('target')
  $(this).siblings().removeClass('active')
  $(this).addClass('active')
  $(content).siblings().hide()
  $(content).show()
});

$('.carousel-prev').click(function(e) {
  let item = $(this).siblings('.carousel-items')
  let index = item.data('index')
  let totalPage = Math.ceil(item.children().length / 3) - 1
  index--
  let position = index * 200
  if (index < 0) {
    index = totalPage
  }
  item.data('index', index)
  item.children().css({transform: 'translateX('+position+'%)'})
});
$('.carousel-next').click(function(e) {
  let item = $(this).siblings('.carousel-items')
  let index = item.data('index')
  let totalPage = Math.ceil(item.children().length / 3) - 1
  index++
  if (index > totalPage) {
    index = 0
  }
  let position = index * -200
  item.data('index', index)
  item.children().css({transform: 'translateX('+position+'%)'})
});

$('#btnLogin').click(function() {
  let username = $('#loginUsername').val(),
  password = $('#loginPassword').val()
  $('#loginError').html('').hide()
  if (!username || !password) {
    $('#loginError').append('Invalid username / password.').show()
    return
  }
  localStorage.setItem('auth', 1)
  showNavItem()
  dismissModal()
})

$('body').on('click', '#signout', function() {
  localStorage.setItem('auth', 0)
  location = 'index.html'
})

async function dismissModal() {
  let modal = await $('.modal.show').removeClass('show')
  setTimeout(() => {
    if (!$(modal).hasClass('show') && $(modal).hasClass('modal')) {
      $('body').css({'overflow-y': 'scroll'})
      $(modal).attr('style', '')
      $('.modal-backdrop').last().remove()
    }
    $('#errorModal .trigger').removeClass('drawn')
  }, 150)
}

async function showAlert(msg) {
  $('#errorModal #errorModalLabel').html(msg)
  await $('#errorModal').css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    background: 'rgba(0,0,0,.7)'
  }).promise()
  setTimeout(() => {
    $('#errorModal .trigger').addClass('drawn')
    $('#errorModal').addClass('show')
    $('body').append('<div class="modal-backdrop fade"></div>').css('overflow-y', 'hidden').promise()
  }, 150)
}

function showNavItem() {
  $('.navbar-nav').html('<li class="nav-item"><a id="toursTag" class="nav-link" href="./tour.html">Tours</a></li><li class="nav-item"><a id="hotelsTag" class="nav-link" href="./hotel.html">Hotel</a></li>')
  if (localStorage.getItem('auth') > 0) {
    $('.navbar-nav').prepend(`
      <li class="nav-item"><a class="nav-link" href="./cart.html">My Cart</a></li>
    `)
    $('.navbar-nav').append('<li class="nav-item"><a class="nav-link" href="#!" id="signout">Sign-out</a></li>')
    $('#auth-btn').removeClass('disabled').text('Select')
  } else {
    $('.navbar-nav').append('<li class="nav-item"> <a class="nav-link" href="./register.html">Sign-Up</a> </li> <li class="nav-item"> <a class="nav-link modal-trigger" href="#" data-toggle="modal" data-target="#loginModal">Sign-In</a> </li>')
    $('#auth-btn').addClass('disabled').text('Please sign-in first')
  }
}

function getUrlParams(search) {
  let hashes = search.slice(search.indexOf('?') + 1).split('&')
  return hashes.reduce((params, hash) => {
      let [key, val] = hash.split('=')
      return Object.assign(params, {[key]: decodeURIComponent(val)})
  }, {})
}
