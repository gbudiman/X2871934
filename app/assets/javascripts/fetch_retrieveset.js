var retrieveset_state;
var result_count;
var result_position;
var result_segment;
var has_ajax_sent;

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
          $('#step2').animate({
            scrollTop: $('#step2').scrollTop() + offset - 72
          })
        })
      $('#step3').hide();
      break;
  }
}

function fetch_retrieveset(_infinite_scroll) {
  var infinite_scroll = _infinite_scroll;
  if (_infinite_scroll == undefined) {
    infinite_scroll = false;
  }

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
                              .attr('width', 120)
                              .attr('height', 160));

          $('#step3').append(s);
        })

        // Move markers, both loading and end, to be the last child
        $('#step3')
          .append($('#step3-loading'))
          .append($('#step3-end'));
        resolve();
      }
    );
  }

  var attach_step3_click = function() {
    return new Promise(
      function(resolve, reject) {
        $('[data-retrieveset-id]').each(function() {
          $(this).on('click', function() {
            var that = $(this);

            if (that.hasClass('step3-selected')) {

            } else {
              $('.step3-selected[data-retrieveset-id]').removeClass('step3-selected');
              that.addClass('step3-selected');
            }
          })
        })
      }
    )
  }

  

  if (!infinite_scroll) {
    set_queryset('set');
    $('#step3').show();
    $('#step3-loading').show();
    $('#step3 [data-retrieveset-id').remove();
  } else {
    //has_ajax_sent = true;
    if (has_ajax_sent) { 
      return; 
    } else {
      has_ajax_sent = true;
    }
  }
  $('#step3-end').hide();
  

  $.get({
    url: '/fetch/retrieveset',
    data: {
      previous_result: infinite_scroll ? result_count : 0,
      previous_position: infinite_scroll ? result_position : 0
    }
  }).done(function(data) {
    console.log(data);
    render_step3(data.data).then(function() {
      //$('#step3-loading').hide();
      result_count = data.result;
      result_position = data.position;
      result_segment = data.segment;
      maximize_height($('#step3'), 16);
      attach_step3_click();
      has_ajax_sent = false;
    });
  })
}