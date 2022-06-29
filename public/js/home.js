function readURL(input) {
    if (input.files && input.files[0]) {

      var reader = new FileReader();

      reader.onload = function(e) {
        $('.image-upload-wrap').hide();
        $('.file-upload-btn').hide();
        $('.file-upload-image').attr('src', e.target.result);
        $("#imageURL").attr("src", reader.result);
        $('.file-upload-content').show();

        $('.image-title').html(input.files[0].name);
        $("#upload-btn-hidden").trigger('click'); 
      };

      reader.readAsDataURL(input.files[0]);

    } else {
      removeUpload();
    }
  }

  $('#upload-btn-hidden').click(function(e){
    e.preventDefault();

    var form = $('#uploadImage')[0]; 
    var formData = new FormData(form);     
    formData.append('imageURL', $("#imageURL")[0].files[0].name);
    $.ajax({
      type: "POST",
      url: "/colorizeImage",
      data: formData,
      //use contentType, processData for sure.
      contentType: false,
      processData: false
    }).done(function (data) {
      console.log(data);
    });
  });

  function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
    $('.file-upload-btn').show();
  }
  $('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
    });
    $('.image-upload-wrap').bind('dragleave', function () {
      $('.image-upload-wrap').removeClass('image-dropping');
  });