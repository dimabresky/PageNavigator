/**
* @version: 1.1
* @author: dimabresky https://bitbucket.org/dimabresky/, https://github.com/dimabresky
* @copyright: Copyright (c) 2017 dimabresky. Все права защищены.
* @license: MIT лицензия http://www.opensource.org/licenses/mit-license.php
*/

(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {

        define([], function () {
            return (root.PageNavigator = factory());
        });

    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.PageNavigator = factory();
    }
})(this, function () {

    /**
    * [PageNavigator description]
    * @param       {[type]} items      [description]
    * @param       {[type]} numberPerPage [description]
    * @constructor
    */
    function PageNavigator (items, numberPerPage) {

        /**
        * Количество страниц
        * @type {Number}
        */
        var pageCount = Math.ceil(items.length/numberPerPage);

        /**
        * Количество столбцов в пагинации
        * @type {Number}
        */
        var nPageWindow = 3;

        /**
        * Список элементов, разбитых по страницам
        * @type {Object}
        */
        var itemsByPages = {};

        /**
        * Распределение элементов по страницам
        * @return {undefined}
        */
        function _distributeItemsToPages () {

            var page = 1;

            if (pageCount === 1) {
                itemsByPages[page] = items;
            } else {
                items.forEach(function (el, i) {

                    if (typeof itemsByPages[page] === 'undefined') {
                        itemsByPages[page] = [];
                    }

                    itemsByPages[page].push(el);

                    if ((i + 1) % numberPerPage === 0 || (i + 1) === items.length) {
                        page++;
                    }

                });
            }
        }

        /**
         * Генерирует и возвращает html постраничной навигации
         * @param       {Number} page
         * @return      {String}
         */
        function _html (page) {

            var nStartPage = 1,
            nEndPage = pageCount,
            html = '<nav aria-label="Page navigation">';

            if (pageCount === 1) {
                return '';
            }

            if (page > Math.floor(nPageWindow/2) + 1 && pageCount > nPageWindow) {
                nStartPage = page - Math.floor(nPageWindow/2);
            }

            if (
                page <= pageCount - Math.floor(nPageWindow/2) &&
                nStartPage + nPageWindow - 1 <= pageCount
            ) {

                nEndPage = nStartPage + nPageWindow - 1;

            } else if (nEndPage - nPageWindow + 1 >= 1) {

                nStartPage = nEndPage - nPageWindow + 1;
            }

            html += '<ul class="pagination">';

            if (page > 1) {

                html += '<li>';

                if (page > 2) {

                    html += '<a data-page="'+(page-1)+'" href="#" aria-label="Previous">';
                    html += '<span aria-hidden="true">&laquo;</span>';
                    html += '</a>';

                } else {

                    html += '<a data-page="'+page+'" href="#" aria-label="Previous">';
                    html += '<span aria-hidden="true">&laquo;</span>';
                    html += '</a>';

                }

                html += '</li>';

                if (nStartPage > 1) {

                    html += '<li><a data-page="1" href="#">1</a></li>';

                    if (nStartPage > 2) {
                        html += '<li><a data-page="'+(nStartPage + 1)+'" href="#">...</a></li>';
                    }
                }

            }

            do {

                html += '<li '+(nStartPage == page ? 'class="active"' : '')+' ><a data-page="'+nStartPage+'" href="#">"'+nStartPage+'"</a></li>';
                nStartPage++;

            } while(nStartPage <= nEndPage);

            if (page < nEndPage) {
                if (nEndPage < pageCount) {
                    if (nEndPage < pageCount - 1) {
                        html += '<li><a data-page="'+Math.round(nEndPage + (pageCount - nEndPage)/2)+'" href="#">...</a></li>';
                    }
                    html += '<li><a data-page="'+pageCount+'" href="#">'+pageCount+'</a></li>';
                }
                html += '<li><a data-page="'+(page + 1)+'" href="#"><span aria-hidden="true">&raquo;</span></a></li>';
            }

            html += '</ul>';

            html += '</nav>';

            return html;
        }

        /**
        * Подготовка страницы и получение результата
        * @param  {Number} page
        * @return {Object}
        */
        this.page = function (page) {

            if (typeof itemsByPages[page] !== 'object') {
                throw new Error('Страницы с номером ' + page + ' не существует');
            }

            return {

                /**
                 * Html постраничной навигации
                 * @return {String}
                 */
                getHtml: function () {
                    return _html(page);
                },

                /**
                 * Элементы на странице
                 * @return {Array}
                 */
                getItems: function () {
                    return itemsByPages[page];
                },

                /**
                 * Количество элементов на странице
                 * @return {[type]} [description]
                 */
                getItemsCount: function () {
                    return itemsByPages[page].length;
                }

            }

        }

        /**
         * Количество страниц постраничной навигации
         * @return {[type]} [description]
         */
        this.pageCount = function () {
            return pageCount;
        }

        _distributeItemsToPages();

    }

    return PageNavigator;

});
