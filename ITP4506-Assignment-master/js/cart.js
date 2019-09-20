var total = 8302

$('.removeBtn').click(function() {
  var container = $(this).closest('.item').parent()
  total = total - $(this).closest('.item').data('price')
  $('#price').text(total)
  $(this).closest('.item').remove()
  if ($('.item').length === 0) {
    container.prepend('<div id="item" class="card ht_s_item flex-row mb-4 mt-4"><div class="card-content">Cart is empty.</div></div>')
    $('.ht_cartList > button').attr('disabled', true)
  }
})
