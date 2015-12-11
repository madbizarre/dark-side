"use strict";
var express = require('express');
var router = express.Router();
var transporter = require('../lib/nodemailer');
var config = require('../config');

router.get('/', function (req, res, next){
    let sendReviews = [
        {
            title: 'Ниша "Услуги автосервиса г.Москва"',
            img: 'img/review/tccm.jpg',
            list: ['http://www.tccm.ru', 'Конверсия сайта - 127%', 'Цена заявки 326 руб.', 'В сутки 5-12 заявок', 'Увеличили доход на 37% в месяц!', 'Клиентов стало больше в ДВА раза.'],
            href: 'https://vk.com/topic-102894231_32622870?post=9'
        }, {
            title: 'Циклевка и реставрация паркета',
            img: 'img/review/parquet.jpg',
            list: ['http://www.циклевка-паркета-спб.рф ', 'Создан лэндинг, сделано его SEO', 'Настроена яндекс.метрика', 'Проведена реанимация существующей рекламной кампании Яндекс Директ.', 'Клиентов стало на 34% больше при том же бюджете.']
        }, {
            title: 'Имидж студия Высшая власть',
            img: 'img/review/v-image.jpg',
            list: ['Созданы 2 рекламные кампании в Яндекс Директ', 'В неделю 8-12 заявок', 'Средняя цена заявки 130 руб.']
        }, {
            title: 'Продажа кератина и средств для ухода за волосами',
            img: 'img/review/keratin.jpg',
            list: ['За 4 дня изготовлен сайт и наполнен товаром.', 'После настройки Директа получили настоящий поток заявок', 'Контекстная реклама', 'Таргетированная реклама']
        }, {
            title: 'Юридическая компаниния БРИЗ',
            img: 'img/review/uristbriz.jpg',
            list: ['4 заявки в первый же вечер после запуска', 'Landing Page', 'Контекстная реклама', 'Расширенная аналитика']
        }];
    res.render('index', {sendReviews});
});

router.post('/mail', function (req, res, next){
    let mail = config.get('mail'),
        text = `Имя: ${req.body.name || 'не указано'}
Email: ${req.body.email || 'не указан'}
Телефон: ${req.body.tel}
Комментарий: ${req.body.comment || 'не указан'}`;
    transporter.sendMail({
        from: `${mail.from} <${mail.user}>`,
        to: mail.to.split(', '),
        subject: `Заявка с сайта: joindarkside.ru`,
        text: text
    }, function (err){
        if (err) return next(err);
        res.status(200).end();
    });
});

router.get('/*', function(req, res){
    res.redirect('/');
});

module.exports = router;
