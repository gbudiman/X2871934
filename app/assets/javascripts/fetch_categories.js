$(function() {
  var render_step1 = function(data) {
    return new Promise(
      function(resolve, reject) {
        var s = $('<div></div>')
                  .addClass('col-xs-12');
        
        $.each(data, function(category_name, x) {
          var list_header = $('<span></span>')
                              .addClass('list-header')
                              .append(category_name.toUpperCase());

          var list = $('<ul></ul>')
                       .addClass('list-unstyled list-height-limited');

          $.each(x, function(j, y) {
            var entry = $('<div></div>')
                          .addClass('checkbox')
                          .append($('<label></label>')
                                    .append($('<input></input>')
                                              .attr('type', 'checkbox')
                                              .attr('data-global', 'step1')
                                              .attr('data-category', category_name)
                                              .attr('data-value', y))
                                    .append(y)
                                 );

            list.append(entry);
          })
          
          s.append(list_header);
          s.append(list);
        })

        $('#step1').prepend(s);
        resolve();
      }
    )
  }

  var attach_step1_click = function() {
    $('#step1-next').on('click', function() {
      $(this)
        .text('Make Selection First')
        .prop('disabled', true);

      fetch_queryset();
    }).prop('disabled', true);
  }

  var attach_step1_selectors = function() {
    $('[data-global="step1"]').on('change', function() {
      $('#step1-next')
        .text('Next Step')
        .prop('disabled', false);
    })
  }

  
  $.get({
    url: '/fetch/categories'
  }).done(function(data) {
    render_step1(data).then(function() {
      $('#step1-loading').hide();
      $('#step1-next').show();
      maximize_height($('#step1'), $('#step1-next').outerHeight());
      attach_step1_selectors();
      attach_step1_click();
    });
  })

  $(window).on('resize', window_resize_handler)
})
