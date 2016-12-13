var retrieveset_state;

function set_queryset(state) {
  if (state == retrieveset_state) { return; }

  switch(state) {
    case 'set':
      retrieveset_state = 'set';
      $('#step2')
        .animate({
          width: $('#step2').attr('data-compressed')
        }, 400, function() {
          var offset = $('.step2-selected').offset().top;
          console.log('Set scroll to ' + offset);
          $('#step2').animate({
            scrollTop: $('#step2').scrollTop() + offset - 72
          })
        })
      break;
    case 'reset':
      retrieveset_state = 'reset';
      console.log($('.step2-selected').offset());
      $('#step2')
        .animate({
          width: $('#step2').attr('data-full-width')
        }, 400, function() {
          if ($('.step2-selected').offset() == undefined) { return; }
          var offset = $('.step2-selected').offset().top;
          console.log('Reset scroll to ' + offset);
          $('#step2').animate({
            scrollTop: $('#step2').scrollTop() + offset - 72
          })
        })
      $('#step3').hide();
      break;
  }
}

function fetch_retrieveset() {
  var render_step3 = function(data) {
    return new Promise(
      function (resolve, reject) {
        $.each(data, function(name, x) {
          var s = $('<div></div>')
                    .addClass('col-xs-12 col-sm-6 col-md-4 col-lg-2')
                    .addClass('img-padded')
                    .attr('data-retrieveset-id', name)
                    .append($('<img></img')
                              .attr('alt', name)
                              .attr('src', 'photo_placeholder.jpg')
                              .addClass('img-rounded')
                              .attr('width', 128)
                              .attr('height', 128));

          $('#step3').append(s);
        })

        resolve();
      }
    );
  }

  set_queryset('set');
  $('#step3').show();
  $('#step3-loading').show();
  
  $.get({
    url: '/fetch/retrieveset'
  }).done(function(data) {
    render_step3(data).then(function() {
      $('#step3-loading').hide();
      maximize_height($('#step3'), 16);
    });
  })
}