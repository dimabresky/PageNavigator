# PageNavigator.js #

Конструктор для создания и работы с постраничной навигацией на стороне клиента

Возможности:

```javascript

// массив элементов для вывода по-страницам
var items = (function () {
    var items = [];
    for (var i = 1; i <= 21; i ++) {
        items.push({item: i});
    }
    return items;
})();

// объект для работы с постраничной навигацией
// первым аргументом задается массив элементов
// вторым - желаемое количество элементов на странице
// третьим - шаблон для ссылки постраничной навигации
//      (по-умолчанию <a data-page=#page# href="#">#content#<a/>)
var pageNavigator = new PageNavigator(items, 4, '<a href="?page=#page#">#content#</a>');

// получение общего числа страниц
pageNavigator.pageCount();

// получение количества элементов на странице 3
pageNavigator.page(3).getItemsCount();

// получение массива элементов для вывода на странице 3
pageNavigator.page(3).getItems();

// получение html постраничной навигации для страницы 3
pageNavigator.page(3).getHtml();

```
Простестировано с Google Chrome 61.0.x.x
