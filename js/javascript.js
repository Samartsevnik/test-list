
$(document).ready(function () {
  // сбор данных в один массив в нужном виде
  $.when($.ajax('https://my-json-server.typicode.com/ka245/fake-json/users'),
    $.ajax('https://my-json-server.typicode.com/ka245/fake-json/address'),
    $.ajax('https://my-json-server.typicode.com/ka245/fake-json/status'),
    $.ajax('https://tinyfac.es/api/users'))
    .done(function (a1, a2, a3, a4) {
      let data = a1[2].responseJSON
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (data[i].id === a2[2].responseJSON[j].userId || data[i].id === a2[2].responseJSON[j].iuserId) {
            data[i].address = a2[2].responseJSON[j].address
            data[i].phone = a2[2].responseJSON[j].phone
            break;
          }
        }
        data[i].status = a3[2].responseJSON[i].status
        data[i].avatars = a4[2].responseJSON[i].avatars
      }

// рендер данных на страницу
      $('.contacts__items').empty()

      data.forEach((el) => {
        $(`
            <div class="contacts__item">
               <div class="contacts__content">
                <div class="contacts__id">${el.id}</div>
                <div class="contacts__name">
                     <div  class="contacts__img-wrapper"><img src="${el.avatars[0].url}" alt="avatar"></div>
                    ${el.name}
                </div>
                <div class="contacts__email">${el.email}</div>
                <div class="contacts__phone">${el.phone}</div>
                <div class="contacts__status">${el.status}</div>
                <div class="contacts__address">${el.address.street}</div>
                <button class="contacts__more"><span></span></button>
                </div>
               <div class="contacts-dropdown">
                  <div class="contacts__tabs">
                    <div class="contacts__tab contacts__tab-email">Email</div>
                    <div class="contacts__tab contacts__tab-phone">phone</div>
                    <div class="contacts__tab contacts__tab-status">status</div>
                    <div class="contacts__tab contacts__tab-address">address</div>
                  </div>
                  <div class="contacts__item">
                      <div class="contacts__email">${el.email}</div>
                      <div class="contacts__phone">${el.phone}</div>
                      <div class="contacts__status">${el.status}</div>
                      <div class="contacts__address">${el.address.street}</div>
                  </div>
               </div>
            </div>
        `).appendTo($('.contacts__items'))
      })
      $('.contacts__more').on('click', function () {
       $(this).parent().parent().find('.contacts-dropdown').toggleClass('open')
      })
    })



// фильтрация контактов по статусу
  $('.contacts-right__status').change(function (){
    $('.contacts__content .contacts__status').each(function () {
      let found = false;
        if ($(this).text().includes($('.contacts-right__status').val())) {
          found = true;
        }
      found ? $(this).parent().parent().show() : $(this).parent().parent().hide()
    })
  })

  // фильтрация контактов по поиску
  $('#search').keyup(function () {
    search_item($(this).val())
  })

  function search_item(value) {
    $('.contacts__item').each(function () {
      let found = false;
      $(this).each(function () {
        if ($(this).text().toLowerCase().includes(value.toLowerCase())) {
          found = true;
        }
      })
      found ? $(this).show() : $(this).hide()
    })
  }

})