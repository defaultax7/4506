$(document).ready( function() {
    $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = label;
        
        if( input.length ) {
            input.val(log);
            validateForm1();
        } else {
            if( log ) alert(log);
        }
    
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function(){
        readURL(this);
    });
});

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