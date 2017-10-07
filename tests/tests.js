!function (PageNavigator, QUnit) {

    'use strict';

    var items = [];

    var currentTestName = '';

    var pageNavigator;

    QUnit.module('PageNavigator тест');

    for (var i = 1; i <= 23; i++) {
        items.push({item: i});
    }

    pageNavigator = new PageNavigator(items, 5, '<a data-page="#page#" href="#">#content#</a>')

    currentTestName = 'Общее количество страниц (должно быть 5)';

    if (pageNavigator.pageCount() === 5) {
        QUnit.test( currentTestName, function( assert ) {
            assert.ok( true, "выполнен" );
        });
    } else {
        QUnit.test( currentTestName, function( assert ) {
            assert.notOk( true, "не выполнен (количество страниц равно "+pageNavigator.pageCount()+")" );
        });
    }

    currentTestName = 'Количество элементов на странице под номером 3 (должно быть 5)';

    if (pageNavigator.page(3).getItemsCount() === 5) {
        QUnit.test( currentTestName, function( assert ) {
            assert.ok( true, "выполнен" );
        });
    } else {
        QUnit.test( currentTestName, function( assert ) {
            assert.notOk( true, "не выполнен (количество элементов на странице под номером 3 равно "+pageNavigator.page(3).getItemsCount()+")" );
        });
    }

    currentTestName = 'Количество элементов на странице под номером 5 (должно быть 3)';

    if (pageNavigator.page(5).getItemsCount() === 3) {
        QUnit.test( currentTestName, function( assert ) {
            assert.ok( true, "выполнен" );
        });
    } else {
        QUnit.test( currentTestName, function( assert ) {
            assert.notOk( true, "не выполнен (количество элементов на странице под номером 5 равно "+pageNavigator.page(5).getItemsCount()+")" );
        });
    }

    QUnit.test( "Html постраничной навигации", function( assert ) {
        assert.ok( true, pageNavigator.page(3).getHtml() );
    });

}(PageNavigator, QUnit);
