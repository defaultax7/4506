const S_TAG = 0;
const S_FILTER = 1;
var restaurants = [];
var currRestId = -1;
var filtering = false;
var featureList = { priceLv: [], feature: [], type: [], feeRange: [] };
var pNum = 1;

// Onload
$(document).ready(function() {
  $.getJSON("data/data.json", function(data) {
    restaurants = data.restaurant;
    let context = "";
    for (let i = 0; i < restaurants.length; i++) {
      context += putRestaurant(restaurants[i]);
    }
    $.when($(".lds-default").fadeOut(1000)).done(function() {
      $("#restList").append(context);
      $(".foodItem:gt(11)").hide();
    });
  });

  //   setTimeout(function() {
  //     $("#loginModal")
  //     .modal("show");
  //   }, 5000);

  // filterTag
  $("#allTag").click(function() {
    closeMenu();
    resetRest();
    pNum = 2;
    $(".page-link")
      .eq(4)
      .click();
    $(".page-link:first").click();
  });
  $(".tag").click(function() {
    if (filtering) {
      featureList = { priceLv: [], feature: [], type: [], feeRange: [] };
      filtering = false;
    }
    $(this).toggleClass("active");
    let searchText = $(this).val();
    // restaurants.find(x => x.feature.contain(searchText));
    let thisType = $(this).data("type");
    if ($(this).hasClass("active")) {
      featureList[thisType].push(searchText);
    } else {
      featureList[thisType] = featureList[thisType].filter(
        e => e !== searchText
      );
    }
    filterRest(S_TAG);
  });
  // give rating
  $('input:radio[name="rate"]').change(function() {
    showToast("We have received your comment");
  });

  $("#orderTime").clockpicker({
    placement: "top",
    align: "left",
    donetext: "Done",
    autoclose: true,
    default: "now"
  });

  // change food detail
  $(".cloud-zoom-gallery").click(function() {
    $(".cloud-zoom-gallery").removeClass("active");
    $(this).addClass("active");
    let fd =
      restaurants[currRestId].foods[$(".cloud-zoom-gallery").index($(this))];
    $("#addCartBtn").attr(
      "onclick",
      "addCart('" + fd.name + "', '" + fd.price + "')"
    );

    let desc = fd.desc == null ? "No Description" : fd.desc;
    $("#food_title").text(fd.name);
    $(".food_desc").text(desc);
    $("#food_price").text(fd.price);
  });
  $("#pagination-demo").twbsPagination({
    totalPages: 4,
    visiblePages: 4,
    onPageClick: function(event, page) {
      goShopPage(page);
      $("#page-content").text("Page " + page);
    }
  });

  //temp make
  $(".adder").click(function() {
    qty = parseInt(
      $(this)
        .parent()
        .children()
        .eq(1)
        .text()
    );
    qty--;
    $(this)
      .parent()
      .children()
      .eq(1)
      .text(qty);
  });
  $(".decer").click(function() {
    qty = parseInt(
      $(this)
        .parent()
        .children()
        .eq(1)
        .text()
    );
    qty++;
    $(this)
      .parent()
      .children()
      .eq(1)
      .text(qty);
  });
});
// End Onload

function addQty() {
  qty = parseInt(
    $(this)
      .parent()
      .children()
      .eq(1)
      .text()
  );
  qty++;
  $(this)
    .parent()
    .children()
    .eq(1)
    .text(qty);
}
function substractQty() {
  qty = parseInt(
    $(this)
      .parent()
      .children()
      .eq(1)
      .text()
  );
  qty--;
  $(this)
    .parent()
    .children()
    .eq(1)
    .text(qty);
}

function putRestaurant(rest) {
  let label = "";
  if (rest.label !== undefined) {
    label = '<div class="card-label">' + rest.label + "</div>";
  }
  let restDiv =
    '<div class="col-12 col-sm-6 col-md-4 col-xl-3 p-3 foodItem"> <a class="card" href="#!" data-id="' +
    rest.id +
    '" onclick="showFood( ' +
    rest.id +
    ' );"> ' +
    label +
    '<div class="card-img"> <img class="card-img-top"  src="' +
    rest.imagePath +
    '" alt="food image"> </div> <div class="card-body"> <span>' +
    rest.name +
    '</span> <ul class="food"> <li>' +
    "$".repeat(rest.priceLv) +
    "</li> <li>" +
    rest.feature.join("</li><li>") +
    '</li> </ul> <ul class="food-price"> <li><strong>$' +
    rest.minPrice +
    "</strong></li> <li>minimum</li><br /> <li><strong>$" +
    rest.fee +
    "</strong></li> <li>delivery fee</li> </ul> </div> </a> </div> ";
  return restDiv;
}
function putFood(food, index) {
  let description;
  if (food.desc !== null) {
    description = food.desc;
  } else {
    description = "No Description";
  }
  let image;
  if (food.imagePath !== null) {
    image =
      '<img src="' +
      food.imagePath +
      '" class="align-self-start mr-3" alt="food picture" />';
  } else {
    image =
      '<div class="material-icons p-2" style="font-size: 8rem;">restaurant_menu</div>';
  }
  // console.log(image);
  let foodDiv =
    '<div class="mediaContainer shadow-lg" style="visibility: visible;">' +
    '<div class="media p-2" style="background-color: white;"> ' +
    image +
    ' <div class="media-body"> <h5 class="mt-0 py-3" style="font-family: Arial;">' +
    food.name +
    '</h5> <span class="reportNo" style="color: rgb(38, 4, 82);font-size: 1em;">' +
    description +
    '</span> </div> </div> <div class="mediaBtn p-3">' +
    ' <button type="button" class="btn btn-primary float-right mx-2 add-cart-btn" onclick="editFood(' +
    index +
    ')"> ' +
    '<i class="material-icons align-top">add</i> </button> <span class="float-right p-2">' +
    '<span>Price : </span><span class="foodPrice">' +
    food.price +
    "</span></span>" +
    ' <div class="clearfix"></div> </div> </div> ';
  return foodDiv;
}

function showFood(fid) {
  currRestId = fid - 1;
  restHeart.attr("class", "heart fa fa-heart-o");
  if (restSet.has(currRestId)) {
    restHeart.toggleClass("fa-heart fa-heart-o");
  }
  if ($("#restMenu").css("display") == "block") {
    $("#restMenu").hide();
    $("#shopPage").hide();
  }
  if ($("#restList").css("display") == "flex") {
    $("#restList").hide();
    $("#shopPage").hide();
  }
  $(".breadcrumb").html(
    '<li class="breadcrumb-item"><a href="#!" onclick="closeMenu();"><i class="material-icons">store</i><span >Restaurants</span></a></li><li class="breadcrumb-item"><i class="material-icons">restaurant_menu</i><span >Menu</span></li>'
  );

  let menu = restaurants.find(x => x.id === fid);
  let ratingContext =
    '<span class="stared"></span>'.repeat(menu.rating) +
    '<span class="nostar"></span>'.repeat(5 - menu.rating);
  $("#restName").text(menu.name);
  $("#desc").html(
    "<img class='float-left p-2' style='width: 15rem; height: 15rem; object-fit: cover;' src='" +
      menu.imagePath +
      "'></img><p>" +
      menu.desc +
      "</p><div class='clearfix'></div>" +
      "<table  class='restAttr'><tbody><tr><td>Address : &nbsp;&nbsp;</td><td>" +
      menu.address +
      "</td></tr><tr><td>Rating : </td><td>" +
      ratingContext +
      "</td></tr>" +
      "<tr><td>Telephone</td><td><a href='#!'>36884587</a></td></tr>" +
      "<tr><td>Opening Hour :  &nbsp;&nbsp;</td><td>" +
      menu.openHour +
      "</td></tr>" +
      "</tbody>"
  );
  $("#restMenu").fadeIn();
  $("#rating").html(ratingContext);
  let foodContext = "";
  if (menu.foods.length != 0) {
    for (let i = 0; i < menu.foods.length; i++) {
      foodContext += putFood(menu.foods[i], i);
    }
  } else {
    foodContext +=
      "<div class='p-5'><h3>Cannot find list</h3><h5>No food is provide, You may call <a href='#!'>36884587</a> to order food</h5></div>";
  }
  $("#foodList").html(foodContext);
  // foodList = "";
  // for (let food in menu.foods) {
  //   foodList += ""
  // }
  // $("#foodList").html("")
}
function giveComment() {
  let rating = $("input[name= 'rate']:checked").val();
  if (rating == undefined) {
    rating = 0;
  }
  $("#cmt-block").append(
    ' <div class="cmt shadow p-2"> <div class="cmt-header"><span class="text-warning">#1</span><span> p**** ' +
      "</span><span>2019-10-17</span><span>" +
      '<span class="stared"></span>'.repeat(rating) +
      '</span></div> <div class="cmt-body">' +
      $("#your-cmt").val() +
      "</div> </div> "
  );
  $("#your-cmt").val("");
  return false;
}

function modelFilter() {
  restaurants.find(x => x.priceLv === fid);
}

function searchByFilter() {
  resetRest();
  filtering = true;
  featureList = { priceLv: [], feature: [], type: [], feeRange: [] };
  $("input[name= 'budget']:checked").each(function() {
    featureList.priceLv.push(parseInt($(this).val()));
  });
  $("input[name= 'feature']:checked").each(function() {
    featureList.feature.push($(this).val());
  });
  $("input[name= 'type']:checked").each(function() {
    featureList.type.push($(this).val());
  });
  featureList.feeRange.push($("#amount1").val());
  featureList.feeRange.push($("#amount2").val());
  // console.log($("input[name= 'restType']").val());
  filterRest(S_FILTER);
}

function closeMenu() {
  // return
  // $(".breadcrumb").empty();
  $(".breadcrumb").html(
    '<li class="breadcrumb-item"><i class="material-icons">store</i><span >Restaurants</span></li>'
  );

  $("#restMenu").hide();
  $("#restList").fadeIn();

  $("#shopPage").fadeIn();
}
function resetRest() {
  $(".tag").each(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    }
  });
  $(".foodItem").each(function() {
    $(this).fadeIn();
  });
}

function filterRest(mode) {
  for (let i = 0; i < restaurants.length; i++) {
    let isMatch;
    if (mode == S_TAG) {
      isMatch =
        featureList.feature.every(val =>
          restaurants[i].feature.includes(val)
        ) &&
        (!featureList.priceLv.length ||
          featureList.priceLv.includes(restaurants[i].priceLv));
    } else {
      // if no featureList.feature.length = 0
      isMatch =
        (featureList.feature.some(val =>
          restaurants[i].feature.includes(val)
        ) ||
          featureList.feature.length == 0) &&
        (!featureList.priceLv.length ||
          featureList.priceLv.includes(restaurants[i].priceLv)) &&
        restaurants[i].fee >= featureList.feeRange[0] &&
        restaurants[i].fee <= featureList.feeRange[1];
    }
    if (isMatch) {
      $(".foodItem")
        .eq(i)
        .fadeIn();
    } else {
      $(".foodItem")
        .eq(i)
        .fadeOut();
    }
  }
  //  console.log(featureList);
}
function backToRestaurentView() {
  $("#restList").fadeIn();
  $("#restMenu").fadeIn();
  $("#restMenu").hide();
}
function showToast(msg) {
  $("#myToast > .toast-body").text(msg);
  $("#myToast").toast("show");
}

function goShopPage(page) {
  if (pNum == page) {
    return;
  }
  pNum = page;
  let minp = (pNum - 1) * 12 - 1;
  let maxp = (pNum - 1) * 12 + 12;
  let foodLength = document.getElementsByClassName("foodItem").length;
  // if (maxp-1 > foodLength) {
  //   maxp = foodLength;
  // }

  $(".foodItem").hide();
  if (minp < 0) {
    $(".foodItem:lt(" + maxp + ")").show();
  } else $(".foodItem:lt(" + maxp + "):gt(" + minp + ")").show();
}

var cart = {};
function editFood(index) {
  let foodList = restaurants[currRestId].foods;
  let food = restaurants[currRestId].foods[index];
  // console.log(e.parentElement.parentElement);
  let desc = "No Description";
  if (food.desc != null) {
    desc = food.desc;
  }
  let image = "img/noImg.jpg";
  if (food.imagePath != null) {
    image = food.imagePath;
  }
  let price = food.price;
  let name = food.name;

  $("#zoom1").attr("href", image);
  $("#zoomImg").attr("src", image);
  let img = "img/noImg.jpg";
  for (let i = 0; i < foodList.length; i++) {
    if (foodList[i].imagePath != null) {
      img = foodList[i].imagePath;
    } else {
      img = "img/noImg.jpg";
    }

    // console.log(foodList[i].name)
    $(".cloud-zoom-gallery")
      .eq(i)
      .attr("href", img);
    $(".cloud-zoom-gallery")
      .eq(i)
      .attr(
        "rel",
        "gallerySwitchOnMouseOver: true, popupWin:'" +
          img +
          "', useZoom: 'zoom1', smallImage: '" +
          img +
          "'"
      );
    $(".restFood-img")
      .eq(i)
      .attr("src", img);
    // $(".restFood-img").eq(i).attr("title", foodList[i].name);
  }
  if (foodList.length < 5) {
    let i = foodList.length;
    img = "img/noImg.jpg";
    while (i < 5) {
      $(".cloud-zoom-gallery")
        .eq(i)
        .attr("href", img);
      $(".cloud-zoom-gallery")
        .eq(i)
        .attr(
          "rel",
          "gallerySwitchOnMouseOver: true, popupWin:'" +
            img +
            "', useZoom: 'zoom1', smallImage: '" +
            img +
            "'"
        );
      $(".restFood-img")
        .eq(i)
        .attr("src", img);
      i++;
    }
  }
  $(".cloud-zoom-gallery").removeClass("active");
  $(".cloud-zoom-gallery")
    .eq(index)
    .addClass("active");
  $(".cloud-zoom, .cloud-zoom-gallery").CloudZoom();

  $("#addCartBtn").attr("onclick", "addCart('" + name + "', '" + price + "')");

  // init favourite food button
  foodHeart.attr("class", "heart fa fa-heart-o");
  if (foodSet.has(name)) {
    foodHeart.toggleClass("fa-heart fa-heart-o");
  }

  $("#food_title").text(name);
  $(".food_desc").text(desc);
  $("#food_price").text(price);
  $("#editFoodModal").modal();
}

function addCart(food, price) {
  //   if (food in cart) {
  //     cart[food][0]++;
  //   } else {
  //     // qty, price
  //     cart[food] = [1, parseInt(price)];
  //   }
  //   $("#cartBody").empty();
  //   let totalPrice = 0;
  //   let context = "";
  //   for (const fd in cart) {
  //     if (cart.hasOwnProperty(fd)) {
  //       const elem = cart[fd];
  //       totalPrice += elem[0] * elem[1];

  //     }
  //   }
  context =
    "<div class='row cart-block'>   <div class='col-8'>     <dl>       <dt><u>" + $("#food_title").text() +"</u></dt>       <dd class='small' class='bold mb-2'><img src='" + $("#zoom1").attr("href") +"' alt='' style='width:100px; height:100px'></dd>       <dd class='small'><b>Restaurant</b> <span>"+ $("#restName").text() +"</span></dd>       <dd class='small'><b>Description:</b> <span>" + $(".food_desc").text() +"</span></dd>     </dl>   </div>   <div class='col-4'>     <div class='float-right m-3'>$HKD <span class='text-danger'>"+ $("#food_price").text() +"</span></div>     <div><button class='adder btn btn-light' >-</button><span class='cartQty col-1'>1</span><button class='decer btn btn-light' >+</button></div>     <div class='clearfix m-3'></div>     <div class='float-right'><button class='btn btn-danger'>Delete</button></div>     <div class='clearfix m-3'></div>   </div> </div>";
  $("#tCart").append(context);
  $("#tCart")
    .last()
    .children()
    .last()
    .children()
    .eq(1)
    .children()
    .eq(1)
    .children()
    .eq(0)
    .click(function() {
      qty = $(this)
        .parent()
        .children()
        .eq(1)
        .text();
      qty--;
      qty = $(this)
        .parent()
        .children()
        .eq(1)
        .text(qty);
    });
  $("#tCart")
    .last()
    .children()
    .last()
    .children()
    .eq(1)
    .children()
    .eq(1)
    .children()
    .eq(2)
    .click(function() {
      qty = $(this)
        .parent()
        .children()
        .eq(1)
        .text();
      qty++;
      qty = $(this)
        .parent()
        .children()
        .eq(1)
        .text(qty);

    });

  $("#tCart")
    .last()
    .children()
    .last()
    .children()
    .eq(1)
    .children()
    .eq(3)
    .click(function() {
      $(this)
        .parent()
        .parent()
        .hide();

    
    });


    tprice = $("#total_price").text() * 1;

    tprice +=  ($("#food_price").text() * 1);

    $("#total_price").text(tprice);

  // $(".addor").off("click");
  // $(".decor").off("click");
  //   $(".addor").on("click", function() {
  //     let qtyDiv = $(this)
  //       .parent()
  //       .parent()
  //       .children()
  //       .eq(4);
  //     let qty = parseInt(qtyDiv.text());
  //     let foodName = $(this)
  //       .parent()
  //       .parent()
  //       .children()
  //       .eq(0)
  //       .text();
  //     qty += 1;
  //     qtyDiv.text(qty);
  //     cart[foodName][0] = qty;
  //     calTotal();
  //   });
  //   $(".decor").on("click", function() {
  //     let qtyDiv = $(this)
  //       .parent()
  //       .parent()
  //       .children()
  //       .eq(4);
  //     let qty = parseInt(qtyDiv.text());
  //     qty -= 1;
  //     let foodName = $(this)
  //       .parent()
  //       .parent()
  //       .children()
  //       .eq(0)
  //       .text();
  //     if (qty <= 0) {
  //       $(this)
  //         .parent()
  //         .parent()
  //         .remove();
  //       delete cart[foodName];
  //     } else {
  //       cart[foodName][0] = qty;
  //       qtyDiv.text(qty);
  //     }
  //     calTotal();
  //   });
//   $("#total_price").text(calTotal());

  $("#shoppingCartModal").modal();
  showToast("Item has add to cart.");
}

function calTotal() {
  // cal total price
  let totalPrice = 0;
  for (const fd in cart) {
    if (cart.hasOwnProperty(fd)) {
      const elem = cart[fd];
      totalPrice += elem[0] * elem[1];
    }
  }
  $("#total_price").text(totalPrice);
}
function getFav() {
  let context = "";
  if (restSet.size != 0) {
    restSet.forEach(e => {
      context += restaurants[e].name + "<br>";
    });
    $("#tRest").html(context);
  }
  //else {
  //$("#tRest").html("Still no favourite restaurant added.")
  //}
  constext = "";
  if (foodSet.size != 0) {
    foodSet.forEach(e => {
      context += e + "<br>";
    });
    $("#tFood").html(context);
  }
  //else {
  //$("#tRest").html("Still no favourite restaurant added.")
  //}
}
$("#orderTag").click(function() {
  calTotal();
  getFav();
  $("#shoppingCartModal").modal();
});

var restSet = new Set();
var foodSet = new Set();
const foodHeart = $("#foodHeart");
const restHeart = $("#restHeart");
$(document).ready(function() {
  restHeart.on("click", function() {
    if ($(this).hasClass("fa-heart-o")) {
      //   restSet.add(currRestId);
      newFaRes =
        " <tr>    <td>      <a href='#!'><i class='material-icons' onclick=\"delFaRes(this)\">close</i></a>    </td>    <td>      <span><i class='heart fa fa-heart' style='font-size: 24px'></i></span>    </td>    <td>      " +
        $("#restName").text() +
        "    </td>  </tr>";

      $("#tRest tbody").append(newFaRes);
    } else if ($(this).hasClass("fa-heart")) {
      //   restSet.delete(currRestId);
    }
    $(this).toggleClass("fa-heart fa-heart-o");
  });
  foodHeart.on("click", function() {
    if ($(this).hasClass("fa-heart-o")) {
      //   foodSet.add($("#food_title").text());
      newFaFood =
        "<tr>    <td>      <a href='#!'><i class='material-icons' onclick=\"delFaFood(this)\">close</i></a>    </td>    <td>      <span><i class='heart fa fa-heart' style='font-size: 24px'></i></span>    </td>    <td>      <img src='" +
        $("#zoom1").attr("href") +
        "' alt='' style='width:100px; height:100px'>    </td>    <td>      " +
        $("#food_title").text() +
        "<br>      <small>" +
        $("#restName").text() +
        "</small>    </td>    <td>      $" +
        $("#food_price").text() +
        "    </td>  </tr>";

      $("#tFood tbody").append(newFaFood);
    } else if ($(this).hasClass("fa-heart")) {
      //   foodSet.delete($("#food_title").text());
    }
    $(this).toggleClass("fa-heart fa-heart-o");
  });
});

function delFaRes(element){
    element.parentElement.parentElement.parentElement.remove();  
}

function delFaFood(element) {
  element.parentElement.parentElement.parentElement.remove();
}

function loggingIn() {
  //   $("#tabone").prop("disabled", false);
  //   $("#loginModal").modal("hide");
  //   $("#hc-cart").show();
  //   $("#hc-sign-up").hide();
  //   $("#hc-sign-in").hide();
  //   $("#hc-profile").show();
  //   $("#hc-logout").show();
  //   showToast("You have logged in");
  window.location.href = "restaurantLoged.html";
  return false;
}

$(".animeBackground").hide();

// $(".animeBackground")
//   .show(3000)
//   .delay(4000)
//   .fadeOut(1000);
