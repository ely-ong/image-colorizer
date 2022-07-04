function uploadURL() {
  var img_url = $("#image-url").val();

  if (img_url) {
    var filename = $("#image-url").val().match(/.*\/(.*)$/)[1];

    var extensions = ['jpg', 'jpeg', 'png'];
    var inputExt = filename.substr(filename.lastIndexOf('.') + 1);

    if ($.inArray(inputExt, extensions) == -1){
        $("#image-url").val('');
        $('.notif-box-loading').text("Entered URL is invalid. Please enter a URL ending in '.jpg' or '.png'.");
        $('.notif-box-loading').css('background', '#c9666b')
        $('.notif-box-loading').show();
    }

    else{
      $(".file-upload-image").attr("src", $("#image-url").val());
      // $('.file-upload-content').show();
      // $('.image-upload-wrap').hide();
      $('.remove-image').hide();
      $('.notif-box-loading').css('background', '#AD9749')
      $('.notif-box-loading').text("Colorizing image...please wait.");
      $('.notif-box-loading').show();
      $('.url-submit').prop('disabled', true);
      $('.notif-box-loading').show();

      processURL(img_url, filename, inputExt);

    }
  }
}

function processURL(img_url, filename, img_ext){

  // added proxy to work around CORS error
  const proxy = 'https://api.allorigins.win/raw?url='

  fetch(proxy+img_url)
    .then(function(res){
      return res.blob();
    })
    .then(blob => {
      const file = new File([blob], filename, {
          type: 'image/jpg'
      });

      var formData = new FormData();
      formData.append('imageURL', file);
      formData.append('imageURL', file.name);
      
      $.ajax({
        type: "POST",
        url: "/colorize",
        data: formData,
        async: false,
        //use contentType, processData for sure.
        contentType: false,
        processData: false, 
        success: function (data) {
          window.location = `/colorizer/${data.file_name}/${data.colorized_name}`
        }
      })


    });
  
}


function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $("#imageURL").attr("src", reader.result);
      console.log("imageurl", $("#imageURL")[0].files[0].name)
    };

    reader.readAsDataURL(input.files[0]);

    var form = $('#uploadImage')[0]; 
    var formData = new FormData(form);     
    original_name = $("#imageURL")[0].files[0].name;
    // colorized_name = original_name.substr(0, original_name.lastIndexOf('.'));
    formData.append('imageURL', original_name);
    console.log(original_name)
    $('.notif-box-loading').show();
    // formData.append('colorized', `colorized_${colorized_name}.png`);
    $.ajax({
      type: "POST",
      url: "/colorize",
      data: formData,
      async: false,
      //use contentType, processData for sure.
      contentType: false,
      processData: false, 
      success: function (data) {
        console.log("data hereee", data.file_name, data.colorized_name)
        window.location = `/colorizer/${data.file_name}/${data.colorized_name}`
      }
    });

  } else { 
    removeUpload();
  }
}

function processImage(img){
    console.log("processImage()")

    $('.notif-box-loading').show();

    var src = img.src.split('/');
    var name = src[src.length - 1];
    console.log(name)

    fetch(img.src)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], name, {
          type: 'image/jpg'
      });
    var formData = new FormData();
    formData.append('imageURL', file);
    formData.append('imageURL', file.name);
    console.log(file.name)
    $.ajax({
      type: "POST",
      url: "/colorize",
      data: formData,
      async: false,
      //use contentType, processData for sure.
      contentType: false,
      processData: false, 
      success: function (data) {
        console.log("data hereee", data.file_name, data.colorized_name)
        window.location = `/colorizer/${data.file_name}/${data.colorized_name}`
      }
    });
});

}
  
function removeUpload() {
  $('.preview-tab').prop('disabled', true);
  $('.dl-btn').prop('disabled', true);
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
  $('#image-url').prop('disabled', false);
  $('.url-submit').prop('disabled', false);
  $('.file-upload-btn').prop('disabled', false);
  $('.image-name').hide();
  $('#origTag').removeClass("active");
  $('#colorTag').removeClass("active");
  $("#image-url").val('');
  $('.no-image').show();
  $('.no-image-text').show();
  $('.notif-box-success').hide();
  $('.notif-box-fail').hide();

  $('.no-image-box').show();
}

$('#image-url').on('change', function() {
  let empty = false;

  empty = $('#image-url').val().trim().length == 0;

  if (empty)
    $('.process-image').addClass('disabled-link');
  else
    $('.process-image').removeClass('disabled-link');
});