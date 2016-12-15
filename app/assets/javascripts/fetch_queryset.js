function step2_state(state) {
  if (state == undefined) {
    return $('#step2').attr('data-state');
  } else {
    $('#step2').attr('data-state', state);
  }
}

function fetch_queryset() {
  var render_step2 = function(_data) {
    return new Promise(
      function(resolve, reject) {
        data = _data.images;
        var wrap = function(x) {
          return _data.base_path + x;
        }

        $.each(data, function(_junk, x) {
          var path = wrap(x.link)
          var s = $('<div></div>')
                    .addClass('col-xs-12 col-sm-6 col-md-4 col-lg-2')
                    .addClass('img-padded')
                    .attr('data-queryset-id', x.id)
                    .attr('data-content', 'blabla')
                    .attr('data-full-res', path)
                    .append($('<div></div>')
                              .addClass('img-thumb')
                              .css('background-image', 'url("' + path + '")'));

          $('#step2').append(s);
        })

        $('[data-queryset-id]').each(function() {
          var that = $(this);
          that.zoom({
            url: that.attr('data-full-res')
          })
        })

        $('#step2-summary')
          .text(Object.keys(data).length + ' images matched in Query Set')
          .show();

        resolve();
      }
    );
  }

  var attach_step2_click = function() {
    return new Promise(
      function(resolve, reject) {
        $('[data-queryset-id]').each(function() {
          // $(this).popover({
          //   trigger: 'hover',
          //   placement: 'auto right',
          //   viewport: {
          //     selector: '#step2'
          //   }
          // })

          $(this).on('click', function() {
            
            var that = $(this);

            if (that.hasClass('step2-selected')) {
              // ignore
            } else {
              $('.step2-selected[data-queryset-id]').removeClass('step2-selected');
              that.addClass('step2-selected');
              fetch_retrieveset();
            }
          })
        })

        resolve();
      }
    )
    
  }

  var get_step1_checked = function() {
    var data_builder = new Array();

    $('[data-global="step1"]:checked').each(function() {
      var that = $(this);
      data_builder.push([ that.attr('data-category'), that.attr('data-value') ])
    })

    return data_builder;
  }

  set_queryset('reset');
  
  $('#step2-summary').hide();
  $('#step2-placeholder').hide();
  $('#step2-loading').show();
  $('#step2-selected').removeClass('step2-selected');
  $('#step2 [data-queryset-id]').remove();
  $('#step3 [data-retrieveset-id]').remove();

  $.get({
    url: '/fetch/queryset',
    data: {
      data: JSON.stringify(get_step1_checked())
    }
  }).done(function(data) {
    
    render_step2(data).then(function() {
      $('#step2-loading').hide();
      maximize_height($('#step2'), 16);
      attach_step2_click();
    })
  })
}

$(function() {
  window_resize_handler();
})