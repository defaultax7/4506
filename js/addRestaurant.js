$("#btnNext").click(() => {
  step = $("#addNewRestaurantFrom").data("step");
  step++;
  $(".step.active")
    .removeClass("active")
    .addClass("disabled");
  $(".steps")
    .children()
    .eq(step)
    .removeClass("disabled")
    .addClass("active");
  $(".carousel").carousel("next");
  $("#addNewRestaurantFrom").data("step", step);
});

$("#btnComplete").click(function() {
  showAlert("Added successfully");
});

function validateForm1() {
  $("#btnNext").attr("disabled", true);
  valid = true;

  if ($("#restaurantName").val() == "") {
    valid = false;
  }
  if ($("#foundDate").val() == "") {
    valid = false;
  }
  if ($("#imageName").val() == "") {
    valid = false;
  }
  if (valid) {
    $("#error").hide();
    $("#btnNext").attr("disabled", false);
  }
}

$("#restaurantName").keyup(() => {
  validateForm1();
});

$("#branchAddress").keyup(() => {
  validateForm2();
});

$("#formS2").hide();

$(".carousel").carousel();
$(".carousel").carousel("pause");

$("#btnBack").click(function() {
  step = $("#addNewRestaurantFrom").data("step");
  step--;
  $(".step.active")
    .removeClass("active")
    .addClass("disabled");
  $(".steps")
    .children()
    .eq(step)
    .removeClass("disabled")
    .addClass("active");
  $(".carousel").carousel("prev");
  $("#addNewRestaurantFrom").data("step", step);
});

$(".btnAddBranch").click(function() {
  branchNo = $("#branchForm").data("branchnum");
  branchNo++;
  h =
    "<fieldset class='border p-3' style='display : none' id='" +
    branchNo +
    "'>    <legend class='w-auto'>Branch " +
    branchNo +
    "</legend>    <div class='form-row'>      <div class='col-12'>        <div class='form-group'>          <label for='branchAddress'            ><span class='align-top font-weight-bold'              >Address </span            ><i class='material-icons inline-icon'>              room            </i></label          >          <input            type='text'            class='form-control'            id='branchAddress'            placeholder=''          />          <small class='form-text text-muted'            >*required</small          >        </div>      </div>    </div>    <div class='form-row'>      <div class='col-2'>        <div class='form-group'>          <label for='restaurantName'            ><span class='align-top font-weight-bold'              >Opening hour </span            ><i class='material-icons inline-icon'>              access_time            </i></label          >          <div class='input-group'>            <input              type='text'              class='form-control clockpicker'            />            <i class='material-icons cbIconSize'>              arrow_forward            </i>            <input              type='text'              class='form-control clockpickerEnd'            />          </div>          <small class='form-text text-muted'            >*required</small          >        </div>      </div>    </div>    <div class='row'>      <div class='col-12'><b>Environment :</b></div>      <div class='col-12'>        <label class='cbContainer'          ><span class='align-top'> Indoor </span          ><input type='checkbox' id='cbIndoor' checked />          <span class='checkmark'></span>          <i class='material-icons cbIconSize'>            home_work          </i>        </label>        <label class='cbContainer'          ><span class='align-top'> Outdoor </span          ><input type='checkbox' id='cbOutdoor' />          <span class='checkmark'></span>          <i class='material-icons cbIconSize'>            cloud          </i>        </label>      </div>    </div>    <div class='row'>      <div class='col-12'>        <b>Feature : </b>      </div>    </div>    <label class='cbContainer'      ><span class='align-top'> Wifi </span      ><input type='checkbox' checked />      <span class='checkmark'></span>      <i class='material-icons cbIconSize'>        wifi      </i>    </label>    <label class='cbContainer'      ><span class='align-top'> Allow booking </span      ><input type='checkbox' checked />      <span class='checkmark'></span>      <i class='material-icons cbIconSize'>        airline_seat_recline_extra      </i>    </label>    <label class='cbContainer'      ><span class='align-top'> Complementary parking </span      ><input type='checkbox' />      <span class='checkmark'></span>      <i class='material-icons cbIconSize'>        directions_car      </i>    </label>    <label class='cbContainer'      ><span class='align-top'> TV </span      ><input type='checkbox' />      <span class='checkmark'></span>      <i class='material-icons cbIconSize'>        tv      </i>    </label>    <div class='row'>      <div class='col-4'>        <div class='form-group'>          <label class='font-weight-bold'>Branch image</label>          <div class='input-group'>            <span class='input-group-btn'>              <span class='btn btn-default btn-file'>                Browse…                <input                  type='file'                  id='imgInp'                  accept='image/*'                />              </span>            </span>            <input              id='imageName'              type='text'              class='form-control'              readonly            />          </div>          <small class='form-text text-muted'            >*required</small          >          <img id='img-upload' />        </div>      </div>    </div>  </fieldset>";

  id = "#" + branchNo;
  $("#branchContainer").append(h);
  $(id).toggle(800, "linear");
  $(id + " .clockpicker").clockpicker({ autoclose: true });
  $(id + " .clockpickerEnd").clockpicker({ autoclose: true });
  $("#branchForm").data("branchnum", branchNo);
});

$("#btnComplete").click(function() {
  showAlert("New restaurant is added successfully");
});

function validateForm2() {
  $("#btnComplete").attr("disabled", true);

  valid = true;

  if ($("#branchAddress").val() == "") {
    valid = false;
  }
  if ($("#startTime").val() == "") {
    valid = false;
  }
  if ($("#endTime").val() == "") {
    valid = false;
  }
  if($("#branchImg").val() == ""){
    valid = false;
  }
  if (valid) {
    $("#error").hide();
    $("#btnComplete").attr("disabled", false);
  }
}

$("#startTime").keyup(function(){
  validateForm2();
})

$("#endTime").keyup(function(){
  validateForm2();
})