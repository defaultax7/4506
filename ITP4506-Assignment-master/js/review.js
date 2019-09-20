let total = 17, reply = 5

$('#sendReview').click(() => {
  let rate = parseFloat($('input[name=rating]:checked').val())
  reply++
  total += rate
  let newRate = Math.round(total / reply * 100) / 100
  $('#currentRate').text(newRate)
  $('.rating-bar > div').css({width: `${newRate / 5 * 100}%`})
  $('#comment').prepend(`<div class="col-12 mb-3">
    <div class="divider"></div>
    <div class="summary">
      <div class="recommendation ">
        <div class="user-information">
          <div class="user cf">
            <span itemprop="author">A verified user</span>
          </div>
        </div>
        <div class="date-posted">
          ${new Date().toLocaleString("en-US", {year: 'numeric', month: 'short', day: 'numeric' })}
        </div>
      </div>
    </div>
    <div class="details">
      <div class="rating-header-container">
        <div class="review"><span>${rate}</span> out of 5</div>
        <h3 class="review-title">${$('#review_title').val()}</h3>
      </div>
      <div class="review-text">
        <span class="translate-text">${$('#review_comment').val()}</span>
      </div>
    </div>
  </div>`)
})
