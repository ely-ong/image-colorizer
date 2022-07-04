$('#image-url').prop('disabled', true);
$('.url-submit').prop('disabled', true);
$('.file-upload-btn').hide();
$('.dl-btn').prop('disabled', false);
$('.clear-btn').prop('disabled', false);

function downloadImg(){
  var img = $('.file-upload-image').attr('src');
  var fileName = "";

  if($(".colorized-name").is(":hidden")){
    fileName = $(".original-name").text().trim();
  }

  else{
    fileName = $(".colorized-name").text().trim();
  }
  
  // var str1 = 'colorized_';
  // var finalFileName = str1.concat(fileName.toString());
  var el = document.createElement("a");
  
  el.setAttribute("href", img);
  el.setAttribute("download", fileName);
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
      // $('#image-url').prop('disabled', true);
      // $('.url-submit').prop('disabled', true);
      // $('.file-upload-btn').prop('disabled', true);
      $('.file-upload-btn').hide();
      $('.file-upload-image').attr('src', e.target.result);
      $('.file-upload-content').show();
      $('#origTag').addClass("active")

      $('.original-name').html(input.files[0].name);

      var filename = $('.original-name').text();

      var extensions = ['jpg', 'jpeg', 'png'];
      var inputExt = filename.split('.').pop();

      console.log(inputExt);

      if ($.inArray(inputExt, extensions) == -1){
          $('.notif-box-fail').text("Uploaded file is invalid. Please upload a JPG or PNG file.");
          $('.notif-box-fail').show();
          $("#image-url").val('');
          $('.image-name').hide();
          $('.file-upload-btn').hide();
          // $('.no-image-box').hide();
      }

      else{
        $("#upload-btn-hidden").trigger('click'); 
      }
        
    };

    reader.readAsDataURL(input.files[0]);

  } else { 
    removeUpload();
  }
}

$('#upload-btn-hidden').click(function(e){
  $('.original-name').show();
  $('.colorized-name').hide();
  $('#colorTag').removeClass("active");
  e.preventDefault();

  var form = $('#uploadImage')[0]; 
  var formData = new FormData(form);     
  formData.append('imageURL', $("#imageURL")[0].files[0].name);
  $('.notif-box-success').css('background', '#AD9749')
  $('.notif-box-success').text("Colorizing image...please wait.");
  $('.notif-box-success').show();
  $('#image-url').prop('disabled', true);
  $('.url-submit').prop('disabled', true);
  $('#colorTag').prop('disabled', true);
  $('.dl-btn').prop('disabled', true);
  $('.clear-btn').prop('disabled', true);
  $.ajax({
    type: "POST",
    url: "/colorizeImage",
    data: formData,
    //use contentType, processData for sure.
    contentType: false,
    processData: false
  }).done(function (data) {
    $('.original-name').hide();
    $('.preview-tab').prop('disabled', false);
    $('.dl-btn').prop('disabled', false);
    $('.clear-btn').prop('disabled', false);
    $('#colorTag').addClass('active')
    $('#origTag').removeClass('active')
    $('.file-upload-image').attr('src', `/colorized/${data.colorized}.png`);
    $('.colorized-name').html(`${data.colorized}.png`);
    $('.colorized-name').show();
    $('.notif-box-success').css('background', '#006C8A')
    $('.notif-box-success').text("Image successfully colored!");
    $('.notif-box-success').show().delay(5000).fadeOut(); //show for 5 secs
    
    $('.no-image-box').hide();
  })
  .fail(function(){
      $('.notif-box-success').hide();
      $('.notif-box-fail').text("An error occurred in image colorization. Try another image.");
      $('.notif-box-fail').show();
  });
});

function removeUpload() {
  $('.url-submit').prop('disabled', false);
  $('.preview-tab').prop('disabled', true);
  $('.dl-btn').prop('disabled', true);
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
  $('#image-url').prop('disabled', false);
  // $('.url-submit').prop('disabled', false);
  // $('.file-upload-btn').prop('disabled', false);
  $('.file-upload-btn').show();
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

$('.image-upload-wrap').bind('dragover', function () {
  $('.image-upload-wrap').addClass('image-dropping');
  });
  $('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

function uploadURL() {
  var img_url = $("#image-url").val();

  if (img_url) {
    var filename = $("#image-url").val().match(/.*\/(.*)$/)[1];

    var extensions = ['jpg', 'jpeg', 'png'];
    var inputExt = filename.substr(filename.lastIndexOf('.') + 1);

    if ($.inArray(inputExt, extensions) == -1){
        $('.notif-box-fail').text("Entered URL is invalid. Please enter a URL ending in '.jpg' or '.png'.");
        $('.notif-box-fail').show();
        $("#image-url").val('');
        $('.image-name').hide();
        // $('.no-image-box').hide();
    }

    else{
      $('.notif-box-fail').text("An error occurred in image colorization. Try another image.");
      $('.notif-box-fail').hide();
      $(".file-upload-image").attr("src", $("#image-url").val());
      $('.image-upload-wrap').hide();
      $('.file-upload-btn').hide();
      $('.file-upload-content').show();
      $('#origTag').addClass("active")
      $('.original-name').show();
      $('.colorized-name').hide();
      $('#colorTag').removeClass("active");
      $('.original-name').text(filename);
      $('.original-name').show();
      $('.no-image').hide();
      $('.no-image-text').hide();
 
      $('.notif-box-success').css('background', '#AD9749')
      $('.notif-box-success').text("Colorizing image...please wait.");
      $('.notif-box-success').show();
      $('#image-url').prop('disabled', true);
      $('.url-submit').prop('disabled', true);
      $('#colorTag').prop('disabled', true);
      $('.dl-btn').prop('disabled', true);
      $('.clear-btn').prop('disabled', true);

      processURL(img_url, filename);

    }
  }
}

function processURL(img_url, filename){

  // added proxy to work around CORS error
  const proxy = 'https://api.allorigins.win/raw?url='

  fetch(proxy+img_url)
  //catch for images that don't bypass the CORS error
    .catch(error => {
      $('.notif-box-success').hide();
      $('.notif-box-fail').text("An error occurred in retrieving image. Try another image.");
      $('.notif-box-fail').show();
      $('.clear-btn').prop('disabled', false);
    })
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
        url: "/colorizeImage",
        data: formData,
        //use contentType, processData for sure.
        contentType: false,
        processData: false,
      }).done(function (data) {
        $('.original-name').hide();
        $('.preview-tab').prop('disabled', false);
        $('.dl-btn').prop('disabled', false);
        $('.clear-btn').prop('disabled', false);
        $('#colorTag').addClass('active')
        $('#origTag').removeClass('active')
        $('.file-upload-image').attr('src', `/colorized/${data.colorized}.png`);
        $('.colorized-name').html(`${data.colorized}.png`);
        $('.colorized-name').show();
        $('.notif-box-success').css('background', '#006C8A')
        $('.notif-box-success').text("Image successfully colored!");
        $('.notif-box-success').show().delay(5000).fadeOut(); //show for 5 secs
      
        $('.no-image-box').hide();
      })
      .fail(function(){
        $('.notif-box-success').hide();
        $('.notif-box-fail').text("An error occurred in image colorization. Try another image.");
        $('.notif-box-fail').show();
        $('.clear-btn').prop('disabled', false);
      });

    });
  
}

$('#origTag').click(function(e){
  $('#origTag').addClass('active')
  $('#colorTag').removeClass('active')
  
  filename_original = $('.original-name').text().trim();

  $('.file-upload-image').attr('src', `/uploads/${filename_original}`);
  
  if($('.no-image-box').is(":hidden")){
    $('.original-name').show(); 
    $('.colorized-name').hide(); 
  }
  $('.image-upload-wrap').hide()
});

$('#colorTag').click(function(e){
  $('#origTag').removeClass('active')
  $('#colorTag').addClass('active')
  
  filename_colorized = $('.colorized-name').text().trim()

  console.log("filename", filename_colorized)

  $('.file-upload-image').attr('src', `/colorized/${filename_colorized}`);

  if($('.no-image-box').is(":hidden")){
    $('.original-name').hide(); 
    $('.colorized-name').show(); 
  }
  $('.image-upload-wrap').hide()
});

if($('.original-name').text().trim() != "" && $('.colorized-name').text().trim() != "") {
  console.log("clicked")
  $('.no-image-box').hide()
  $("#colorTag").trigger('click'); 
  $('.file-upload-content').show();
}

$('#image-url').on('keyup', function() {
  let empty = false;

  empty = $('#image-url').val().trim().length == 0;

  if (empty)
    $('.url-submit').addClass('disabled-link');
  else
    $('.url-submit').removeClass('disabled-link');
});