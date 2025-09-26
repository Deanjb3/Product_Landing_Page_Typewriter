$(document).ready(function() {
    // Initialize AOS with enhanced settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
    });

    // Enhanced smooth scrolling
    $('a.nav-link').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            const offset = $(hash).offset().top - 60;
            
            $('html, body').animate({
                scrollTop: offset
            }, {
                duration: 800,
                easing: 'easeInOutCubic'
            });

            // Close mobile menu if open
            $('.navbar-collapse').collapse('hide');
        }
    });

    // Improved typewriter effect
    function typeWriterEffect(element, text, speed = 50) {
        if (!element || !text) return;
        let i = 0;
        element.html('');
        
        function type() {
            if (i < text.length) {
                element.append(text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Start typewriter effect with delay
    setTimeout(() => {
        const text = $('.typewriter-text').text();
        typeWriterEffect($('.typewriter-text'), text);
    }, 500);

    // Enhanced form handling
    $('#orderForm').on('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
            model: $('#model').val()
        };

        // Validate form data
        if (!formData.name || !formData.email) {
            alert('Please fill in all required fields');
            return;
        }

        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        submitBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Processing...');

        // Simulate API call
        setTimeout(() => {
            // Success message
            $('.modal-body').html(`
                <div class="text-center">
                    <i class="fas fa-check-circle text-success" style="font-size: 3rem;"></i>
                    <h4 class="mt-3">Thank you for your order!</h4>
                    <p>We will contact you shortly at ${formData.email}</p>
                </div>
            `);
            
            // Reset and close after delay
            setTimeout(() => {
                $('#orderModal').modal('hide');
                // Reset form after modal is hidden
                $('#orderModal').one('hidden.bs.modal', function () {
                    $('#orderForm')[0].reset();
                    $('.modal-body').html($('#orderForm'));
                    submitBtn.prop('disabled', false).html('Place Order');
                });
            }, 2000);
        }, 1500);
    });

    // Enhanced navbar scroll effect
    let lastScroll = 0;
    let ticking = false;
    $(window).scroll(function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const currentScroll = $(window).scrollTop();
                
                if (currentScroll > 50) {
                    $('.navbar').addClass('navbar-scrolled');
                    
                    // Hide navbar on scroll down, show on scroll up
                    if (currentScroll > lastScroll) {
                        $('.navbar').addClass('navbar-hidden');
                    } else {
                        $('.navbar').removeClass('navbar-hidden');
                    }
                } else {
                    $('.navbar').removeClass('navbar-scrolled navbar-hidden');
                }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Price toggle animation
    $('.pricing-card').hover(
        function() {
            $(this).find('.price').addClass('price-hover');
            $(this).find('.pricing-header').addClass('header-hover');
        },
        function() {
            $(this).find('.price').removeClass('price-hover');
            $(this).find('.pricing-header').removeClass('header-hover');
        }
    );

    // Add loading state to CTA buttons
    $('.cta-button').click(function() {
        const button = $(this);
        button.addClass('clicked');
        setTimeout(() => button.removeClass('clicked'), 1000);
    });

    // Error handling with user feedback
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        console.error('Error:', { msg, url, lineNo, columnNo, error });
        
        // Show user-friendly error message
        const errorMessage = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                Something went wrong. Please try refreshing the page.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        if (!$('.alert-danger').length) {
            $('.container').first().prepend(errorMessage);
        }
        
        return false;
    };
});