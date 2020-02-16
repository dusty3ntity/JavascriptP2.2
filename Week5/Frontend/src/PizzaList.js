const PIZZA_LIST = [
    {
        id: 1,
        icon: "assets/images/pizza_7.jpg",
        title: "Імпреза",
        type: "М’ясна піца",
        content: {
            meat: ["балик", "салямі"],
            chicken: ["куриця"],
            cheese: ["сир моцарелла", "сир рокфорд"],
            pineapples: ["ананаси"],
            additional: ["томатна паста", "петрушка"]
        },
        smallSize: {
            weight: 370,
            size: 30,
            price: 99
        },
        bigSize: {
            weight: 660,
            size: 40,
            price: 169
        },
        isNew: true,
        isPopular: true
    },
    {
        id: 2,
        icon: "assets/images/pizza_2.jpg",
        title: "BBQ",
        type: "М’ясна піца",
        content: {
            meat: ["мисливські ковбаски", "ковбаски папероні", "шинка"],
            cheese: ["сир домашній"],
            mushrooms: ["шампінйони"],
            additional: ["петрушка", "оливки"]
        },
        smallSize: {
            weight: 460,
            size: 30,
            price: 139
        },
        bigSize: {
            weight: 840,
            size: 40,
            price: 199
        },
        isPopular: true
    },
    {
        id: 3,
        icon: "assets/images/pizza_1.jpg",
        title: "Міксовий поло",
        type: "М’ясна піца",
        content: {
            meat: ["вітчина", "куриця копчена"],
            cheese: ["сир моцарелла"],
            pineapples: ["ананаси"],
            additional: ["кукурудза", "петрушка", "соус томатний"]
        },
        smallSize: {
            weight: 430,
            size: 30,
            price: 115
        },
        bigSize: {
            weight: 780,
            size: 40,
            price: 179
        }
    },
    {
        id: 4,
        icon: "assets/images/pizza_5.jpg",
        title: "Сициліано",
        type: "М’ясна піца",
        content: {
            meat: ["вітчина", "салямі"],
            cheese: ["сир моцарелла"],
            mushrooms: ["шампінйони"],
            additional: ["перець болгарський", "соус томатний"]
        },
        smallSize: {
            weight: 450,
            size: 30,
            price: 111
        },
        bigSize: {
            weight: 790,
            size: 40,
            price: 169
        }
    },
    {
        id: 17,
        icon: "assets/images/pizza_3.jpg",
        title: "Маргарита",
        type: "Вега піца",
        content: {
            cheese: ["сир моцарелла", "сир домашній"],
            tomatoes: ["помідори"],
            additional: ["базилік", "оливкова олія", "соус томатний"]
        },
        smallSize: {
            weight: 370,
            size: 30,
            price: 89
        }
    },
    {
        id: 43,
        icon: "assets/images/pizza_6.jpg",
        title: "Мікс смаків",
        type: "М’ясна піца",
        content: {
            meat: ["ковбаски"],
            cheese: ["сир моцарелла"],
            mushrooms: ["шампінйони"],
            pineapples: ["ананаси"],
            additional: ["цибуля кримська", "огірки квашені", "соус гірчичний"]
        },
        smallSize: {
            weight: 470,
            size: 30,
            price: 115
        },
        bigSize: {
            weight: 780,
            size: 40,
            price: 180
        }
    },
    {
        id: 90,
        icon: "assets/images/pizza_8.jpg",
        title: "Дольче Маре",
        type: "Морська піца",
        content: {
            ocean: [
                "криветки тигрові",
                "мідії",
                "ікра червона",
                "філе червоної риби"
            ],
            cheese: ["сир моцарелла"],
            additional: ["оливкова олія", "вершки"]
        },
        bigSize: {
            weight: 845,
            size: 40,
            price: 399
        }
    },
    {
        id: 6,
        icon: "assets/images/pizza_4.jpg",
        title: "Россо Густо",
        type: "Морська піца",
        content: {
            ocean: ["ікра червона", "лосось копчений"],
            cheese: ["сир моцарелла"],
            additional: ["оливкова олія", "вершки"]
        },
        smallSize: {
            weight: 400,
            size: 30,
            price: 189
        },
        bigSize: {
            weight: 700,
            size: 40,
            price: 299
        }
    }
];

module.exports = PIZZA_LIST;
