var tours = [
  {
    id: 1,
    tid: 'AJHTF-5P',
    name: 'Tokyo grape picking experience, Fujitsu two days free exercise, 5 days regiment',
    date: '2017-09-01 to 2017-11-30',
    location: 'Tokyo',
    price: 4999,
    img: 'tokyo4.jpg'
  },
  {
    id: 2,
    tid: 'AJHTN-5P',
    name: 'Tokyo Nikko Kinugawa Hot Springs Free Shopping Red Leaf View 5 Days Mission',
    date: '2017-09-01 to 2017-11-30',
    location: 'Tokyo',
    price: 5399,
    img: 'tokyo8.jpg'
  },
  {
    id: 3,
    tid: 'AJHTC-5P',
    name: 'Cathay Pacific Tokyo Fuji Mountain free event Shinjuku Odaiba shopping hot spring beauty view 5 days regiment',
    date: '2017-09-01 至 2017-12-15',
    location: 'Tokyo',
    price: 5399,
    img: 'tokyo3.jpg'
  },
  {
    id: 4,
    tid: 'AJHCF-5P',
    name: 'Tokyo Fuji Mountain Fuji Ji moving park Disney Shinjuku Hongye beauty 5 days group',
    date: '2017-09-01 to 2017-11-30',
    location: 'Tokyo',
    price: 5999,
    img: 'tokyo.jpg'
  },
  {
    id: 5,
    tid: 'AJSTF-5P',
    name: 'Tokyo Ace Fuji Fuji Jiuji moving park Disney Shinjuku 5 days group',
    date: '2017-08-01 至 2017-10-31',
    location: 'Tokyo',
    price: 6399,
    img: 'tokyo9.jpg'
  },
  {
    id: 6,
    tid: 'AJHTF-5P',
    name: 'Tokyo Osaka Kyoto Nara Wakayama Sightseeing Hot Springs 7 Days Mission',
    date: '2017-09-01 to 2017-11-30',
    location: 'Tokyo',
    price: 8399,
    img: 'tokyo3.jpg'
  },
  {
    id: 7,
    tid: 'AJHTF-5P',
    name: 'Toky, Fujitsu two days free exercise, 5 days regiment',
    date: '2017-09-01 to 2017-11-30',
    location: 'Tokyo',
    price: 6099,
    img: 'tokyo2.jpg'
  },
];

$(document).ready(function(){
  tours.forEach(function(element){
    $( ".ht_searchContent" ).prepend(`<div id="item" class="card ht_s_item flex-row mb-4 mt-4">
      <div class="card-item-image"><img src="./img/${element.img}"></div>
      <div class="card-content">
        <div class="row">
          <div class="col-12">
            <h5><a href="tours_detail.html?id=${element.id}">${element.name}</a>
            </h5>
            <p>${element.date}</p><br>
            <p>${element.tid}</p>
            <div class="ht_item_service">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-right">
            <p><span class="price">HK$${element.price.toLocaleString()}</span></p>
          </div>
        </div>
        <div class="row">
          <div class="col-8"></div>
          <div class="col-4">
            <a id="hotelsSearch" href="tours_detail.html?id=${element.id}"><button class="btn btn-search btn-lg btn-block">Select</button></a>
          </div>
        </div>
      </div>
    </div>`);
  });

});


$('input[name=price]').change(function() {
  let price = $('input[name=price]:checked').val() || 7000
  $( ".ht_searchContent" ).html('')
  let newTours = tours.filter(item => {
    return item.price <= price || (price === 7000 && item.price > 6000)
  })
  if (newTours.length === 0) {
    $('.ht_searchContent').prepend('<div id="item" class="card ht_s_item flex-row mb-4 mt-4"><div class="card-content">Tours Not Found. Please update the searching rule.</div></div>')
  }
  newTours.map(element => {
    $( ".ht_searchContent" ).prepend(`<div id="item" class="card ht_s_item flex-row mb-4 mt-4">
      <div class="card-item-image"><img src="./img/${element.img}"></div>
      <div class="card-content">
        <div class="row">
          <div class="col-12">
            <h5><a href="tours_detail.html?id=${element.id}">${element.name}</a>
            </h5>
            <p>${element.date}</p><br>
            <p>${element.tid}</p>
            <div class="ht_item_service">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-right">
            <p><span class="price">HK$${element.price.toLocaleString()}</span></p>
          </div>
        </div>
        <div class="row">
          <div class="col-8"></div>
          <div class="col-4">
            <a id="hotelsSearch" href="tours_detail.html?id=${element.id}"><button class="btn btn-search btn-lg btn-block">Select</button></a>
          </div>
        </div>
      </div>
    </div>`)
  })
})
