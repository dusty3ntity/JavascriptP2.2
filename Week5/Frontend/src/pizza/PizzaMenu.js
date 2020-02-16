const TEMPLATES = require("../Templates");
const PIZZA_CART = require("./PizzaCart");
const PIZZA_LIST = require("../PizzaList");
const PIZZA_FILTERS = require("../PizzaFiltersList");

const $PIZZA_LIST = $("#pizza-list");
const $HEADER_TITLE = $("#header-title");
const $PIZZA_COUNT = $("#header-count");
const $PIZZA_FILTERS = $("#filters-list");
let $currentFilter;

function showPizzaList(list) {
    $PIZZA_LIST.html("");

    function showOnePizza(pizza) {
        let htmlCode = TEMPLATES.PizzaMenuItem({ pizza: pizza });

        let $node = $(htmlCode);

        $node.find(".buy-big").click(function() {
            PIZZA_CART.addToCart(pizza, PIZZA_CART.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function() {
            PIZZA_CART.addToCart(pizza, PIZZA_CART.PizzaSize.Small);
        });

        $PIZZA_LIST.append($node);
    }

    list.forEach(showOnePizza);
    $PIZZA_COUNT.text(list.length);
}

function showPizzaFilters() {
    $PIZZA_FILTERS.html("");

    function showOneFilter(filter) {
        let htmlCode = TEMPLATES.PizzaFilter({ filter: filter });
        let $node = $(htmlCode);
        $node.click(() => {
            updateFilters($node.children(), filter);
        });
        $PIZZA_FILTERS.append($node);
    }

    PIZZA_FILTERS.forEach(showOneFilter);
    $currentFilter = $PIZZA_FILTERS
        .children()
        .first()
        .children();
    $currentFilter.addClass("active");
    $HEADER_TITLE.text(PIZZA_FILTERS[0].title);
}

function updateFilters($filter, filter) {
    $currentFilter.removeClass("active");
    $filter.addClass("active");
    $currentFilter = $filter;
    $HEADER_TITLE.text(filter.title);
    filterPizza(filter);
}

function filterPizza(filter) {
    let pizzaShown = [];

    PIZZA_LIST.forEach(pizza => {
        switch (filter.filters) {
            case "all":
                pizzaShown.push(pizza);
                break;
            case "meat":
                if (pizza.content.meat || pizza.content.chicken)
                    pizzaShown.push(pizza);
                break;
            case "vega":
                if (
                    typeof pizza.content.meat === "undefined" &&
                    typeof pizza.content.chicken === "undefined" &&
                    typeof pizza.content.ocean === "undefined"
                )
                    pizzaShown.push(pizza);
                break;
            default:
                if (pizza.content[filter.filters]) pizzaShown.push(pizza);
                break;
        }
    });

    showPizzaList(pizzaShown);
}

function initializeMenu() {
    showPizzaList(PIZZA_LIST);
    showPizzaFilters();
}

exports.filterPizza = filterPizza;
exports.initializeMenu = initializeMenu;
