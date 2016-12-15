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

  var render_step3 = function(_data) {
    return new Promise(
      function (resolve, reject) {
        data = _data.images
        var wrap = function(x) {
          return _data.base_path + x;
        }
        var m_round = function(_x) {
          x = parseFloat(_x);
          if (x < 0.001) {
            return '~ 0%'
          } else {
            return (Math.round(x * 100) / 100) + '%'
          }
        }

        $.each(data, function(id, x) {
          var path = wrap(x.link);
          var s = $('<div></div>')
                    .addClass('col-xs-12 col-sm-6 col-md-4 col-lg-2')
                    .addClass('img-retrieve')
                    .attr('data-retrieveset-id', id)
                    .attr('data-full-res', path)
                    .append($('<div></div>')
                              .addClass('img-thumb')
                              .css('background-image', 'url("' + path + '")'))
                    .append($('<div></div>').css('clear', 'both'))
                    .append($('<span></span>')
                              .append(m_round(x.relevance)))

          $('#step3').append(s);
        })

        // Move markers, both loading and end, to be the last child
        $('#step3')
          .append($('#step3-loading'))
          .append($('#step3-end'));

        $('[data-retrieveset-id]').each(function() {
          var that = $(this);
          that.zoom({
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

    result_count = 0;
    result_position = 0;
    result_segment = 0;
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
    // data: {
    //   previous_result: infinite_scroll ? result_count : 0,
    //   previous_position: infinite_scroll ? result_position : 0
    // }
    data: {
      queryset_id: $('.step2-selected').attr('data-queryset-id'),
      previous_position: result_position,
      segment: result_segment
    }
  }).done(function(data) {
    render_step3(data).then(function(match_count) {
      //$('#step3-loading').hide();
      result_count = parseInt(data.result_count);
      result_position = parseInt(data.position) + parseInt(data.segment);
      result_segment = parseInt(data.segment);

      if (result_count < result_position) {
        $('#step3-loading').hide();
        $('#step3-end').show();
      }

      maximize_height($('#step3'), 16);
      //attach_step3_click();
      has_ajax_sent = false;

      $('#step3-summary')
        .text(result_count + ' images matched in Retrieve Set')
        .show();
    });
  })
}