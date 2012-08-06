(function($) {
    $.fn.extend({
        range: function(options) {
            var options = $.extend({
                colors: ['#EEE', '#333', '#666'],
                min: 0,
                max: 100,
                slide: $.noop,
                change: $.noop,
                stop: $.noop,
                create: $.noop
            }, options || {});

            var draw = function(handle) {
                    var per = parseFloat(handle[0].style.left);
                    if (handle.data('index.uiSliderHandle') == 0) {
                        $('.ui-slider-left.ui-slider-range').width(per + '%');
                    }
                    else {
                        $('.ui-slider-right.ui-slider-range').width(100 - per + '%');
                    }
                };

            return this.each(function() {
                var self = $(this);
                self.slider({
                    range: true,
                    min: options.min,
                    max: options.max,
                    values: options.values || [options.min, options.max],
                    slide: function(event, ui) {
                        draw($(ui.handle));
                        options.slide(event, ui);
                    },
                    change: function(event, ui) {
                        draw($(ui.handle));
                        options.change(event, ui);
                    },
                    stop: function(event, ui) {
                        draw($(ui.handle));
                        options.stop(event, ui);
                    },
                    create: function(event, ui) {
                        self.prepend(
                        $('<div class="ui-slider-left ui-slider-range"/>').css({
                            background: options.colors[0],
                            left: 0
                        }), $('<div class="ui-slider-right ui-slider-range"/>').css({
                            background: options.colors[2],
                            right: 0
                        }));
                        self.find('.ui-slider-range.ui-widget-header').css({
                            background: options.colors[1]
                        });
                        var handles = $(event.target).data('slider').handles;
                        var i = handles.length;
                        while (i--) {
                            draw($(handles[i]));
                        }
                        options.create(event, ui);
                    }
                });
            });
        }
    });

})(jQuery);