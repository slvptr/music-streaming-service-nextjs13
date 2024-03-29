## Курсовая работа по ИСиБД

Минималистичный музыкальный стриминговый сервис в виде веб-приложения, ориентированного на мобильные платформы. 

В системе существуют роли *User* и *Moderator*. *User* может просматривать общий список треков и плейлистов, осуществлять поиск по ним, создавать плейлисты, загружать треки в общее хранилище, редактировать собственные плейлисты. *Moderator* имеет все привилегии *User*, а также имеет возможность редактировать плейлисты других пользователей. 

Аутентификация пользователей осуществляется по e-mail, для авторизации необходимо перейти по уникальной, специфичной для конкретного пользователя ссылке, которая будет отправлена на соответствующий почтовый адрес. 

Пользовательские данные хранятся в реляционной БД, медиа-контент в объектном хранилище.


### Этапы рефакторинга

1. Заменить авторизацию через magic-link (неудобно и дополнительно требует SMTP сервер), на авторизацию по логину и паролю.
2. Настроить политики доступа в S3 и осуществлять запись объектов в хранилище по сервисному идентификатору. Добавить ограничения на размер загружаемых файлов.
3. Переписать виджет плеера -- заменить хардкод элемент на поп-ап, порефакторить UI форм загрузки -- добавить прогресс бары и т.п.
