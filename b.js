(function($) {
  var aurl = 'https://antk.github.io/birthday/assets/';
  var cbg1 = aurl + 'confetti-bg.png';
  var cbg2 = aurl + 'rain-transparent-confetti-1.gif';
  var fw = aurl + 'fireworks.gif';
  var bn = aurl+ 'balloons.gif';
  var bs = aurl + 'birthday.mp3';
  var clickCount = 0;
  var trigger = document.createElement('div');
  $('body').append(trigger);
  $(trigger).css({
    position:'absolute', 
    bottom:0, 
    right:0, 
    height:'100px', 
    width:'100px', 
    background: 'rgba(255, 255, 255, 0.02)'
  });
  var intervalId = window.setInterval(function() {
    clickCount = 0;
  }, 4000);
  $(trigger).click(function() {
    clickCount++;
    console.log(clickCount);
    if(clickCount >= 5) {
      clickCount = 0;
      $('body').css({overflow:'hidden'});
      happyBirthday();
      window.clearInterval(intervalId);
    }
  });
  function happyBirthday() {
    var overlay = document.createElement('div');
    var birthdayElem = document.createElement('div');
    $('body').append(overlay).append(birthdayElem);
    $(overlay).css({
      position: 'absolute',
      top: '0',
      left: '0',
      height: $(document).height() + 'px',
      width: '100%',
      background: '#333',
      opacity: '0.4'
    });
    $(birthdayElem).css({
      position: 'absolute',
      top: $(window).scrollTop(),
      left: '0',
      height: $(window).height() + 'px',
      width: '100%',
      background: 'rgba(255,255,255,0.8)'
    });
    var birthdayHtml = '' + 
    '<div id="birthday-bg" style="background:url(' + cbg1 + ') no-repeat top center;width:100%;height:100%;background-size:cover;position:relative;">' +
    ' <div style="background:url(' + cbg2 + ') no-repeat top center; width:100%; height:100%;background-size:cover;">' +
    '  <div id="birthday-gif" style="width:100%;height:' + ($(window).height()) + 'px"></div>' +
    ' </div>';
    var elemHtml = '<img class="fireworks" data-src="' + fw + '" style="position:absolute;top:0;left:0;"/>';
    birthdayHtml += elemHtml;
    birthdayHtml += '</div>';
    $.ajax({
      url: "//api.giphy.com/v1/gifs/search?api_key=OB4hiQ16LN99kAgP2oAFBsX550GD223X&q=birthday&limit=100&offset=0&rating=G&lang=en"
    }).done(function(data) {
      if(data) {
        var gifs = data.data;
        $(birthdayElem).html(birthdayHtml);
        birthdaySong();
        mouseBalloon();
        setTimeout(function() {
          cycleGifs(gifs);
        },2500);
      }
    });

    function mouseBalloon() {
      $('body').click(function(e) {
        var img = document.createElement('img');
        $(img).attr('src', bn);
        $(img).css({
          position:'absolute',
          width:'200px',
          top:(e.pageY-100)+'px',
          left:(e.pageX-100)+'px',
          'clip-path': Math.floor(Math.random() * 2) == 0 ? 'inset(45px 96px 0px 0px)' : 'inset(0 29px 0px 106px)',
        });
        $('body').append(img);
        setTimeout(function() {
          $(img).css({
            transition: '3s ease-in-out',
            transform: 'translateY(-1000px)'
          });
        }, 10);
      })
    }

    function birthdaySong() {
      var html = '<audio loop autoplay controls><source src="' + bs + '"></audio>';
      $('body').append(html);
    }

    function cycleGifs(gifs) {
      var birthdayGif = $('#birthday-gif');
      birthdayGif.css({background: 'url(' + gifs[Math.floor(Math.random() * gifs.length)].images.original.url + ') no-repeat center center', 'background-size':'contain'});
      setInterval(function() {
        var index = Math.floor(Math.random() * gifs.length);
        birthdayGif.css({background: 'url(' + gifs[index].images.original.url + ') no-repeat center center', 'background-size':'contain', 'opacity':'0.9'});
      }, 3000);
      var fireworks = $('.fireworks');
      var fwhMin = 250;
      var fwhMax = 500;
      var topMin = 1;
      var topMax = 60;
      var leftMin = 1;
      var leftMax = 60;

      setInterval(function() {
        var randomTop = Math.random() * (topMax - topMin) + topMin;
        var randomLeft = Math.random() * (leftMax - leftMin) + leftMin;
        var randomFwDimensions = Math.random() * (fwhMax - fwhMin) + fwhMax;
        var src = $(fireworks).attr('data-src');
        $(fireworks).css({top:randomTop + '%', left:randomLeft + '%', width:randomFwDimensions + 'px', height: randomFwDimensions + 'px'});
        $(fireworks).attr('src', src);
        $(fireworks).show();
        setTimeout(function() {
          $(fireworks).hide();
          $(fireworks).removeAttr('src');
        }, 1500)
      }, 2000)
    }
  }

})(jQuery);