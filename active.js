(function ($) {
    'use strict';

    var browserWindow = $(window);

    document.addEventListener('DOMContentLoaded', function () {
        try {
            const bgImage = new Image();
            const bgImageUrl = $('.slide-img').css('background-image').match(/url\(["']?(.*?)["']?\)/)[1];
            bgImage.src = bgImageUrl;
    
            // Flags to track font, background image, and Owl Carousel loading
            let isFontLoaded = false;
            let isBgImageLoaded = false;
            let isOwlLoaded = false;
    
            // Function to check if all assets are loaded
            function checkAllLoaded() {
                if (isFontLoaded && isBgImageLoaded) {
                    $('main').removeClass('d-none'); // Remove the d-none class from <main>
                    $('.preloader').fadeOut('slow', function () {
                        $(this).remove(); // Remove the preloader from the DOM
                    });
                }
            }
    
            // Load Google Font
            document.fonts.load('1em "Play"').then(() => {
                isFontLoaded = true;
                checkAllLoaded(); // Check if the background image and Owl Carousel are also loaded
            }).catch(() => {
                console.error('Failed to load font.');
                isFontLoaded = true; // Proceed even if the font fails to load
                checkAllLoaded();
            });
    
            // Handle background image loading
            bgImage.onload = function () {
                isBgImageLoaded = true;
                checkAllLoaded(); // Check if the font and Owl Carousel are also loaded
            };
    
            bgImage.onerror = function () {
                console.error('Failed to load background image.');
                isBgImageLoaded = true; // Proceed even if the image fails to load
                checkAllLoaded();
            };
    
            // Fallback: Timeout to show content after 4 seconds
            const preloaderTimeout = setTimeout(function () {
                isFontLoaded = true;
                isBgImageLoaded = true;
                isOwlLoaded = true; // Force Owl Carousel to be treated as loaded
                checkAllLoaded(); // Ensure the content is shown after timeout
            }, 4000);
    
            // Check if Owl Carousel script is loaded
            const owlScript = document.getElementById('owl-carousel-script');
            if (owlScript) {
                if (owlScript.readyState === 'complete' || owlScript.readyState === 'loaded' || owlScript.onload) {
                    isOwlLoaded = true;
                    checkAllLoaded(); // Check if the font and background image are also loaded
                } else {
                    owlScript.onload = function () {
                        isOwlLoaded = true;
                        checkAllLoaded(); // Check if the font and background image are also loaded
                    };
                    owlScript.onerror = function () {
                        console.error('Failed to load Owl Carousel.');
                        isOwlLoaded = true; // Proceed even if Owl Carousel fails to load
                        checkAllLoaded();
                    };
                }
            }
    
        } catch (error) {
            console.error('An error occurred:', error.message);
            $('main').removeClass('d-none'); // Ensure main is shown in case of an error
            $('.preloader').fadeOut('slow', function () {
                $(this).remove();
            });
        }
    });
    
    
    
    
    document.addEventListener("DOMContentLoaded", function () {
        const lazyImages = document.querySelectorAll("img.lazyload");
    
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute("data-src");
                    img.removeAttribute("data-src");
                    img.classList.remove("lazyload");
                    observer.unobserve(img);
                }
            });
        });
    
        lazyImages.forEach(img => imageObserver.observe(img));


        const lazyBackgrounds = document.querySelectorAll(".lazyload-bg");
    
        const backgroundObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bg = entry.target;
                    const backgroundImage = bg.getAttribute("data-bg");
                    if (backgroundImage) {
                        bg.style.backgroundImage = `url(${backgroundImage})`;
                        bg.removeAttribute("data-bg");
                    }
                    observer.unobserve(bg);
                }
            });
        });
    
        lazyBackgrounds.forEach(bg => backgroundObserver.observe(bg));
    });
    

    
    

    // :: 2.0 Nav Active Code
    if ($.fn.classyNav) {
        $('#oneMusicNav').classyNav();
    }

    // :: 3.0 Sliders Active Code
    if ($.fn.owlCarousel) {
        var welcomeSlide = $('.hero-slides');
        var testimonials = $('.testimonial-slides');
        var sports = $('.sports-slider');

        welcomeSlide.owlCarousel({
            items: 1,
            margin: 0,
            mouseDrag: false,      
            touchDrag: false,  
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 20000,    // Set autoplay to 20 seconds (20,000 ms)
            autoplayHoverPause: true,
            smartSpeed: 1000,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut'
        });

        welcomeSlide.on('translate.owl.carousel', function () {
            var slideLayer = $("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        welcomeSlide.on('translated.owl.carousel', function () {
            var slideLayer = welcomeSlide.find('.owl-item.active').find("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        testimonials.owlCarousel({
            items: 1,
            margin: 0,
            navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
            loop:true,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 20000,   
            autoplayHoverPause: true,
            // smartSpeed: 1000,
            // animateIn: 'fadeIn',
            // animateOut: 'fadeOut'
        });


            $('.gameon-gallery-mobile').owlCarousel({
                items: 1, // Show one item at a time
                loop: true, // Enable looping
                margin: 10, // Space between items
                center: true, // Center the active item
                dots: true, // Show dots navigation
                autoplay: true, // Enable autoplay
                autoplayTimeout: 5000, // Autoplay interval
                autoplayHoverPause: true // Pause on hover
            });
        
        


        sports.owlCarousel({
            nav: true,
            margin: 40,
            stagePadding: 90,
            navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
            responsive: {


                0: {
                    items: 1,
                    stagePadding: 50
                },

                390: {
                    items: 1,
                    stagePadding: 90
                },

                450: {
                    items: 1,
                    stagePadding: 100
       },

                500: {
                    items: 1,
                    stagePadding: 110
       },


                550: {
                    items: 1,
                    margin: 15,
                    stagePadding: 130
       },

                600: {
                    items: 2,
                    margin: 20,
                    stagePadding: 80
       },

                650: {
                    items: 2,
                    margin: 20,
                    stagePadding: 80
       },

                800: {
                    items: 2,
                    margin: 20,
                    stagePadding: 120
       },

                850: {
                    items: 2,
                    margin: 40,
                    stagePadding: 130
                },

                900: {
                    items: 2,
                    margin: 40,
                    stagePadding: 150
                },

                950: {
                    items: 3,
                    margin: 20,
                },

                1000: {
                    items: 3,
                    margin: 30
                },

                1100: {
                    items: 3,
                    margin: 40,
                    stagePadding: 130
                },

                1200: {
                    items: 4,
                    margin: 20
                },

                1300: {
                    items: 4,
                    margin: 30
                },

                1400: {
                    items: 4,
                    margin: 40

                },

                1600: {
                    items: 5,
                    margin: 20

                },

                1700:{
                    items: 5
                },

                2450:{
                    items: 5,
                    stagePadding: 200,
                    margin:40
                }
        
            },
            onInitialized: updateArrows, 
            onChanged: updateArrows

            
        });


        function updateArrows(event) {
            const carousel = $(event.target); // Get the carousel
            const currentIndex = event.item.index; // Current index
            const itemCount = event.item.count; // Total items
            const visibleItems = event.page.size; // Number of visible items
        
            // Select navigation arrows
            const prevArrow = carousel.find(".owl-prev");
            const nextArrow = carousel.find(".owl-next");
        
            if (visibleItems == itemCount) {
                // Disable both arrows if all 5 items are visible
                prevArrow.css({ opacity: 0, "pointer-events": "none", cursor: "default" });
                nextArrow.css({ opacity: 0, "pointer-events": "none", cursor: "default" });
            } else {
                // Enable/disable previous arrow
                if (currentIndex === 0) {
                    prevArrow.css({ opacity: 0.5, "pointer-events": "none", cursor: "default" });
                } else {
                    prevArrow.css({ opacity: 1, "pointer-events": "auto", cursor: "pointer" });
                }
        
                // Enable/disable next arrow
                if (currentIndex + visibleItems >= itemCount) {
                    nextArrow.css({ opacity: 0.5, "pointer-events": "none", cursor: "default" });
                } else {
                    nextArrow.css({ opacity: 1, "pointer-events": "auto", cursor: "pointer" });
                }
            }
        }
        




        sports.find('.owl-nav').removeClass('disabled');
sports.on('changed.owl.carousel', function(event) {
	$(this).find('.owl-nav').removeClass('disabled');
});
        
        
    
        
        

      
    }

  

    // :: 5.0 Video Active Code
    if ($.fn.magnificPopup) {
        $('.video--play--btn').magnificPopup({
            disableOn: 0,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false
        });
    }

    // :: 6.0 ScrollUp Active Code
    if ($.fn.scrollUp) {
        browserWindow.scrollUp({
            scrollSpeed: 1500,
            scrollText: '<i class="fa fa-angle-up"></i>'
        });
    }

    // :: 7.0 CounterUp Active Code
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // :: 8.0 Sticky Active Code
    if ($.fn.sticky) {
        $(".oneMusic-main-menu").sticky({
            topSpacing: 0
        });
    }

    // :: 9.0 Progress Bar Active Code
    if ($.fn.circleProgress) {
        $('#circle').circleProgress({
            size: 160,
            emptyFill: "rgba(0, 0, 0, .0)",
            fill: '#000000',
            thickness: '3',
            reverse: true
        });
        $('#circle2').circleProgress({
            size: 160,
            emptyFill: "rgba(0, 0, 0, .0)",
            fill: '#000000',
            thickness: '3',
            reverse: true
        });
        $('#circle3').circleProgress({
            size: 160,
            emptyFill: "rgba(0, 0, 0, .0)",
            fill: '#000000',
            thickness: '3',
            reverse: true
        });
        $('#circle4').circleProgress({
            size: 160,
            emptyFill: "rgba(0, 0, 0, .0)",
            fill: '#000000',
            thickness: '3',
            reverse: true
        });
    }

    // :: 10.0 audioPlayer Active Code
    if ($.fn.audioPlayer) {
        $('audio').audioPlayer();
    }

    // :: 11.0 Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip()
    }

    // :: 12.0 prevent default a click
    $('a[href="#"]').on('click', function ($) {
        $.preventDefault();
    });

    // :: 13.0 wow Active Code
    // if (browserWindow.width() > 767) {
    //     new WOW().init();
    // }
    
    // :: 14.0 Gallery Menu Active Code
    $('.catagory-menu a').on('click', function () {
        $('.catagory-menu a').removeClass('active');
        $(this).addClass('active');
    })

})(jQuery);


