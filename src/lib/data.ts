export const categories = {
  budget_meals: {
    name: "Budget Meals",
    image: "/images/categories/budget-meals.jpg",
    description: "Affordable meal options",
    allows_addons: true,
  },
  silog_meals: {
    name: "Silog Meals",
    image: "/images/categories/silog-meals.jpg",
    description: "Filipino breakfast meals with rice and egg",
    allows_addons: true,
  },
  ala_carte: {
    name: "Ala Carte",
    image: "/images/categories/ala-carte.jpg",
    description: "Individual dishes",
    allows_addons: false,
  },
  beverages: {
    name: "Beverages",
    image: "/images/categories/beverages.jpg",
    description: "Drinks and refreshments",
    allows_addons: false,
  },
}

export const globalAddons = {
  siomai: {
    name: "Extra Siomai",
    price: 5,
    image: "/images/variants/siomai.jpg",
  },
  shanghai: {
    name: "Extra Shanghai",
    price: 5,
    image: "/images/variants/shanghai.jpg",
  },
  skinless: {
    name: "Extra Skinless",
    price: 10,
    image: "/images/variants/skinless.jpg",
  },
  egg: {
    name: "Extra Egg",
    price: 15,
    image: "/images/variants/egg.jpg",
  },
  hotdog: {
    name: "Extra Hotdog",
    price: 15,
    image: "/images/variants/hotdog.jpg",
  },
  sauce: {
    name: "Extra Sauce",
    price: 5,
    image: "/images/variants/sauce.jpg",
  },
}

export const products = {
  // Budget Meals
  budget_meals: {
    hotsilog: {
      name: "Hotsilog",
      base_price: 60,
      description: "Savory hotdog with perfectly fried rice and sunny-side-up egg",
      image: "/images/products/hotsilog.jpg",
      category: "budget_meals",
      allows_addons: true,
      available_addons: ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"],
    },
    hamsilog: {
      name: "Hamsilog",
      base_price: 55,
      description: "Classic ham with garlic fried rice and perfectly cooked egg",
      image: "/images/products/hamsilog.jpg",
      category: "budget_meals",
      allows_addons: true,
      available_addons: ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"],
    },
    silog: {
      name: "Silog",
      base_price: 35,
      description: "Simple yet satisfying garlic fried rice with egg",
      image: "/images/products/silog.jpg",
      category: "budget_meals",
      allows_addons: true,
      available_addons: ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"],
    },
    skinless_rice: {
      name: "Skinless Rice",
      base_price: 40,
      description: "Skinless longganisa with fragrant garlic fried rice",
      image: "/images/products/skinless-rice.jpg",
      category: "budget_meals",
      allows_addons: true,
      available_addons: ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"],
    },
    pork_chaofan: {
      name: "Pork Chaofan",
      base_price: 45,
      description: "Chinese-style pork fried rice with vegetables",
      image: "/images/products/pork-chaofan.jpg",
      category: "budget_meals",
      allows_addons: true,
      required_addons: true,
      available_addons: ["siomai", "shanghai", "skinless", "egg"],
    },
    beef_chaofan: {
      name: "Beef Chaofan",
      base_price: 50,
      description: "Savory beef fried rice with mixed vegetables",
      image: "/images/products/beef-chaofan.jpg",
      category: "budget_meals",
      allows_addons: true,
      required_addons: true,
      available_addons: ["siomai", "shanghai", "skinless", "egg"],
    },
    siomai_rice: {
      name: "Siomai Rice",
      base_price: 39,
      description: "Steamed pork siomai served with special sauce and rice",
      image: "/images/products/siomai-rice.jpg",
      category: "budget_meals",
      allows_addons: true,
      available_addons: ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"],
    },
    shanghai_rice: {
      name: "Shanghai Rice",
      base_price: 39,
      description: "Crispy lumpia shanghai with rice and sweet chili sauce",
      image: "/images/products/shanghai-rice.jpg",
      category: "budget_meals",
      allows_addons: true,
      available_addons: ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"],
    },
  },

  // Silog Meals
  silog_meals: {
    tapsilog: {
      name: "Tapsilog",
      base_price: 100,
      description: "Premium beef tapa with garlic rice and sunny-side-up egg",
      image: "/images/products/tapsilog.jpg",
      category: "silog_meals",
      allows_addons: true,
      available_addons: ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"],
    },
    porksilog: {
      name: "Porksilog",
      base_price: 95,
      description: "Grilled pork chop with garlic rice and egg",
      image: "/images/products/porksilog.jpg",
      category: "silog_meals",
      allows_addons: true,
      available_addons: ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"],
    },
    chicksilog: {
      name: "Chicksilog",
      base_price: 95,
      description: "Crispy fried chicken with garlic rice and egg",
      image: "/images/products/chicksilog.jpg",
      category: "silog_meals",
      allows_addons: true,
      available_addons: ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"],
    },
    bangsilog: {
      name: "Bangsilog",
      base_price: 100,
      description: "Fried milkfish with garlic rice and egg",
      image: "/images/products/bangsilog.jpg",
      category: "silog_meals",
      allows_addons: true,
      available_addons: ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"],
    },
    sisigsilog: {
      name: "Sisigsilog",
      base_price: 95,
      description: "Sizzling pork sisig with garlic rice and egg",
      image: "/images/products/sisigsilog.jpg",
      category: "silog_meals",
      allows_addons: true,
      available_addons: ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"],
    },
    tocilog: {
      name: "Tocilog",
      base_price: 85,
      description: "Sweet pork tocino with garlic rice and egg",
      image: "/images/products/tocilog.jpg",
      category: "silog_meals",
      allows_addons: true,
      available_addons: ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"],
    },
  },

  // Ala Carte
  ala_carte: {
    lugaw: {
      name: "Lugaw",
      base_price: 20,
      description: "Comforting Filipino rice porridge with garlic and ginger",
      image: "/images/products/lugaw.jpg",
      category: "ala_carte",
      allows_addons: false,
    },
    goto: {
      name: "Goto",
      base_price: 35,
      description: "Rich rice porridge with tender beef tripe",
      image: "/images/products/goto.jpg",
      category: "ala_carte",
      allows_addons: false,
    },
    beef_mami: {
      name: "Beef Mami",
      base_price: 45,
      description: "Hot noodle soup with tender beef and vegetables",
      image: "/images/products/beef-mami.jpg",
      category: "ala_carte",
      allows_addons: false,
    },
    pares: {
      name: "Pares",
      base_price: 60,
      description: "Filipino-style braised beef with star anise and rice",
      image: "/images/products/pares.jpg",
      category: "ala_carte",
      allows_addons: false,
    },
    fries: {
      name: "Fries",
      base_price: 25,
      description: "Crispy golden french fries with special seasoning",
      image: "/images/products/fries.jpg",
      category: "ala_carte",
      allows_addons: false,
    },
    waffle: {
      name: "Waffle",
      description: "Freshly baked waffles with your choice of flavor",
      image: "/images/products/waffle.jpg",
      category: "ala_carte",
      variants: {
        chocolate: {
          name: "Chocolate Waffle",
          base_price: 15,
          image: "/images/variants/chocolate-waffle.jpg",
        },
        cheese: {
          name: "Cheese Waffle",
          base_price: 15,
          image: "/images/variants/cheese-waffle.jpg",
        },
        hotdog: {
          name: "Hotdog Waffle",
          base_price: 15,
          image: "/images/variants/hotdog-waffle.jpg",
        },
      },
    },
    graham_bar: {
      name: "Graham Bar",
      base_price: 20,
      description: "Sweet and creamy graham cracker dessert bar",
      image: "/images/products/graham-bar.jpg",
      category: "ala_carte",
      allows_addons: false,
    },
    cheese_stick: {
      name: "Cheese Stick",
      base_price: 10,
      description: "Crispy cheese sticks (6 pieces per order)",
      image: "/images/products/cheese-stick.jpg",
      category: "ala_carte",
      allows_addons: false,
    },
    pastil: {
      name: "Pastil",
      base_price: 15,
      description: "Traditional Filipino rice snack with seasoned meat",
      image: "/images/products/pastil.jpg",
      category: "ala_carte",
      allows_addons: false,
    },
  },

  // Beverages
  beverages: {
    coke_float: {
      name: "Coke Float",
      description: "Classic Coca-Cola with creamy vanilla ice cream",
      category: "beverages",
      variants: {
        "16oz": {
          name: "16oz Coke Float",
          base_price: 29,
          image: "/images/variants/coke-float-16oz.jpg",
        },
        "22oz": {
          name: "22oz Coke Float",
          base_price: 39,
          image: "/images/variants/coke-float-22oz.jpg",
        },
      },
    },
    iced_coffee: {
      name: "Iced Coffee",
      description: "Smooth cold-brewed coffee with ice (22oz)",
      image: "/images/products/iced-coffee.jpg",
      category: "beverages",
      base_price: 39,
    },
    hot_coffee: {
      name: "Hot Coffee",
      description: "Freshly brewed hot coffee",
      image: "/images/products/hot-coffee.jpg",
      category: "beverages",
      base_price: 25,
    },
    fruit_soda: {
      name: "Fruit Soda",
      description: "Refreshing fruit-flavored soda with real fruit syrup",
      category: "beverages",
      variants: {
        "16oz": {
          base_price: 29,
          flavors: {
            blueberry: {
              name: "Blueberry",
              image: "/images/variants/blueberry-16oz.jpg",
            },
            strawberry: {
              name: "Strawberry",
              image: "/images/variants/strawberry-16oz.jpg",
            },
            lemon: {
              name: "Lemon",
              image: "/images/variants/lemon-16oz.jpg",
            },
            green_apple: {
              name: "Green Apple",
              image: "/images/variants/greenapple-16oz.jpg",
            },
            lychee: {
              name: "Lychee",
              image: "/images/variants/lychee-16oz.jpg",
            },
          },
        },
        "22oz": {
          base_price: 39,
          flavors: {
            blueberry: {
              name: "Blueberry",
              image: "/images/variants/blueberry-22oz.jpg",
            },
            strawberry: {
              name: "Strawberry",
              image: "/images/variants/strawberry-22oz.jpg",
            },
            lemon: {
              name: "Lemon",
              image: "/images/variants/lemon-22oz.jpg",
            },
            green_apple: {
              name: "Green Apple",
              image: "/images/variants/greenapple-22oz.jpg",
            },
            lychee: {
              name: "Lychee",
              image: "/images/variants/lychee-22oz.jpg",
            },
          },
        },
      },
    },
  },
} 