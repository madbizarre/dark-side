;
(function (){
    var closeAlert = function (){
            var alert = $('.alert-danger');
            if (alert.length) {
                alert.close();
            }
        },
        ajaxSuccess = function (data){
            var contact = $('#contact');
            closeAlert();
            contact.before('<div class="alert alert-success" role="alert"><strong>Ваша заявка отправлена!</strong></div>');
            contact.css('display', 'none');
            setTimeout(function (){
                $('#contactModal').modal('hide');
            }, 1000);
        },
        ajaxError = function (err){
            var contact = $('#contact'),
                alert = $('.alert-danger');
            if (alert.length) {
                alert.close();
            }
            contact.before('<div class="alert alert-danger" role="alert"><strong>Произошла ошибка! Пожалуйста, повторите попытку.</strong></div>');
        };

    $('.btn').on('click', function (){
        closeAlert();
        $('#contactModal').modal('show');
    });
    $('#contact').on('submit', function (e){
        e.preventDefault();
        closeAlert();
        $.ajax({
            url: '/mail',
            method: 'post',
            data: {
                name: $('#inputName').val(),
                email: $('#inputEmail').val(),
                vk: $('#inputVk').val(),
                tel: $('#inputTel').val(),
                comment: $('#inputComment').val()
            },
            success: ajaxSuccess,
            error: ajaxError
        });
    });
})();