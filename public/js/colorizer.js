function downloadImg(){
  var img = $('.file-upload-image').attr('src');
  var fileName = $(".image-name").text();
  var str1 = 'colorized-';
  var finalFileName = str1.concat(fileName.toString());
  var el = document.createElement("a");
  
  el.setAttribute("href", img);
  el.setAttribute("download", finalFileName);
  $(document.body).append(el);
  el.click();
  $(document.body).append(el);
}

function readURL(input) {
    if (input.files && input.files[0]) {
      
      var reader = new FileReader();
      var imgUploaded;
      
      reader.onload = function(e) {
        imgUploaded = e.target.result;
        $("#imageURL").attr("src", reader.result);
        $('.image-upload-wrap').hide();
        $('.file-upload-btn').hide();
        $('.file-upload-image').attr('src', e.target.result);
        $('.file-upload-content').show();
        $('#origTag').addClass("active")

        // $('.image-title').html(input.files[0].name);
        $('.image-name').html(input.files[0].name);
        $('.image-name').show();

        // download(imgUploaded, input.files[0].name)  
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
      console.log("doneeee")
      console.log(data)
      $('#colorTag').addClass('active')
      $('#origTag').removeClass('active')
      $('.file-upload-image').attr('src', `colorized/${data.colorized}.png`);
      $('.image-name').html(`${data.colorized}.png`);
      $('.image-name').show();
    });
  });

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
    console.log("huh")
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