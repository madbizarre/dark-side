;(function (){
    $(document).ready(function (){
        var $btnSubmit = $('button[type=submit]'),
            $contact = $('#contact'),
            $contactTitle = $('.contact-title'),
            $contactModal = $('#contactModal'),
            alert = $('.alert-danger');
        var closeAlert = function (){
                var alert = $('.alert-danger');
                if (alert.length) {
                    alert.alert('close');
                }
            },
            ajaxSuccess = function (data){
                try{yaCounter33537228.reachGoal('sendData');}catch(e){}
                $btnSubmit.button('reset');
                closeAlert();
                $contactTitle.html('Спасибо, заявка отправлена');
                $contact.before('<div class="alert alert-success" role="alert"><strong>Мы свяжемся с Вами в ближайшее время.</strong></div>');
                $contact.css('display', 'none');
            },
            ajaxError = function (err){
                $btnSubmit.button('reset');
                if (alert.length) {
                    alert.close();
                }
                $btnSubmit.button('reset');
                $contact.before('<div class="alert alert-danger" role="alert"><strong>Произошла ошибка! Пожалуйста, повторите попытку.</strong></div>');
            };

        $('.review-slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        $('.btn').on('click', function (){
            closeAlert();
            $contactModal.modal('show');
        });
        $contact.on('submit', function (e){
            $btnSubmit.button('loading');
            e.preventDefault();
            closeAlert();
            if (document.all && !window.atob) {
                if ($('#inputTel').val().length == 0) {
                    $contact.before('<div class="alert alert-danger" role="alert"><strong>Поле телефон обязательно для заполнения!</strong></div>');
                    $btnSubmit.button('reset');
                    return;
                }
            }
            $.ajax({
                url: '/mail',
                method: 'post',
                data: {
                    name: $('#inputName').val(),
                    email: $('#inputEmail').val(),
                    tel: $('#inputTel').val(),
                    comment: $('#inputComment').val()
                },
                success: ajaxSuccess,
                error: ajaxError
            });
        });
        if (document.all && !window.atob) {
            $('label[for="inputComment"]').html('Комментарий:');
            $('label[for="inputName"]').html('Имя:');
            $('label[for="inputEmail"]').html('Email:');
            $('label[for="inputTel"]').html('Телефон*:');
        }
    });
})();