;
(function (){
    var closeAlert = function (){
            var alert = $('.alert-danger');
            if (alert.length) {
                alert.alert('close');
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
            var alert = $('.alert-danger');
            if (alert.length) {
                alert.close();
            }
            $('#contact').before('<div class="alert alert-danger" role="alert"><strong>Произошла ошибка! Пожалуйста, повторите попытку.</strong></div>');
        };

    $('.btn').on('click', function (){
        closeAlert();
        $('#contactModal').modal('show');
    });
    $('#contact').on('submit', function (e){
        e.preventDefault();
        closeAlert();
        if (document.all && !window.atob) {
            var error = [], text = '';
            if ($('#inputName').val().length == 0) {
                error.push('имя');
            }
            if ($('#inputTel').val().length == 0) {
                error.push('телефон');
            }
            if ($('#inputComment').val().length == 0) {
                error.push('комментарий');
            }
            switch (error.length) {
                case 0:
                    break;
                case 1:
                    text = 'Поле ' + error[0] + ' обязательно для заполнения!';
                    $('#contact').before('<div class="alert alert-danger" role="alert"><strong>' + text + '</strong></div>');
                    return;
                case 2:
                    text = 'Поля ' + error[0] + ' и ' + error[1] + ' обязательны для заполнения!';
                    $('#contact').before('<div class="alert alert-danger" role="alert"><strong>' + text + '</strong></div>');
                    return;
                case 3:
                    text = 'Поля ' + error[0] + ', ' + error[1] + ' и ' + error[2] + ' обязательны для заполнения!';
                    $('#contact').before('<div class="alert alert-danger" role="alert"><strong>' + text + '</strong></div>');
                    return;
            }
        }
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
    if (document.all && !window.atob) {
        $('label[for="inputComment"]').html('Комментарий*:');
        $('label[for="inputName"]').html('Имя*:');
        $('label[for="inputEmail"]').html('Email:');
        $('label[for="inputVk"]').html('Id Вконтакте:');
        $('label[for="inputTel"]').html('Телефон*:');
    }
})();