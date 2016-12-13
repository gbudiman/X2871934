var retrieveset_state;
var result_count;
var result_position;
var result_segment;
var has_ajax_sent;

function set_queryset(state) {
  if (state == retrieveset_state) { return; }

  var scroll_to_selected = function() {
    if ($('.step2-selected').offset() == undefined) { return; }
    var offset = $('.step2-selected').offset().top;

    $('#step2').animate({
      scrollTop: $('#step2').scrollTop() + offset - 72
    }, 400, window_resize_handler)
  }

  switch(state) {
    case 'set':
      retrieveset_state = 'set';
      step2_state('compressed');
      $('#step2')
        .animate({
          width: $('#step2').attr('data-compressed')
        }, 400, scroll_to_selected);
      break;
    case 'reset':
      retrieveset_state = 'reset';
      step2_state('full_width');
      $('#step2')
        .animate({
          width: $('#step2').attr('data-full-width')
        }, 400, scroll_to_selected);
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
                    .addClass('img-retrieve')
                    .attr('data-retrieveset-id', name)
                    .attr('data-full-res', 'photo_placeholder.jpg')
                    .append($('<div></div>')
                              .addClass('img-thumb')
                              .css('background-image', 'url("/photo_placeholder.jpg"'))
                    .append($('<div></div>').css('clear', 'both'))
                    .append($('<span></span>')
                              .append((Math.round(x.relevance * 100) / 100) + '%'))

          $('#step3').append(s);
        })

        // Move markers, both loading and end, to be the last child
        $('#step3')
          .append($('#step3-loading'))
          .append($('#step3-end'));

        $('[data-retrieveset-id').each(function() {
          var that = $(this);
          $(this).zoom({
            url: that.attr('data-full-res')
          })
        })

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
    $('#step3-summary').hide();
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
    render_step3(data.data).then(function() {
      //$('#step3-loading').hide();
      result_count = data.result;
      result_position = data.position;
      result_segment = data.segment;
      maximize_height($('#step3'), 16);
      //attach_step3_click();
      has_ajax_sent = false;

      $('#step3-summary')
        .text(data.result + ' images matched in Retrieve Set')
        .show();
    });
  })
}