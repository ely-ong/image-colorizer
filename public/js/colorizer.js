function readURL(input) {

    if (input.files && input.files[0]) {

      var reader = new FileReader();

      reader.onload = function(e) {
        $('.image-upload-wrap').hide();
        $('.file-upload-btn').hide();
        $('.file-upload-image').attr('src', e.target.result);
        $('.file-upload-content').show();
        $('#origTag').addClass("active")

        // $('.image-title').html(input.files[0].name);
        $('.image-name').html(input.files[0].name);
        $('.image-name').show();
      };

      reader.readAsDataURL(input.files[0]);

    } else {
      removeUpload();
    }
  }

  function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
    $('.file-upload-btn').show();
    $('.image-name').hide();
    $('#origTag').removeClass("active");
    $("#image-url").val('');

  }
  $('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
    });
    $('.image-upload-wrap').bind('dragleave', function () {
      $('.image-upload-wrap').removeClass('image-dropping');
  });

  function uploadURL() {

    if ($("#image-url").val()) {
      var filename = $("#image-url").val().match(/.*\/(.*)$/)[1];

      var extensions = ['jpg', 'png','gif'];
      var inputExt = filename.substr(filename.lastIndexOf('.') + 1);

      if ($.inArray(inputExt, extensions) == -1){
         $('.notif-box-fail').text("Entered URL is invalid. Please enter an image URL.");
         $('.notif-box-fail').show();
         $("#image-url").val('');
         $('.image-name').hide();
      }

      else{
        $('.notif-box-fail').text("An error occurred in image colorization. Try another image.");
        $('.notif-box-fail').hide();
        $(".file-upload-image").attr("src", $("#image-url").val());
        $('.image-upload-wrap').hide();
        $('.file-upload-btn').hide();
        $('.file-upload-content').show();
        $('#origTag').addClass("active")
        $('.image-name').text(filename);
        $('.image-name').show();
      }
      
    }
  };