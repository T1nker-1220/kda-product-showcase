# Products Documentation

## Overview
This document provides a detailed catalog of products offered by Kusina de Amadeo. It includes categories, variants, add-ons, and pricing information. The product structure is designed to be **customizable** and **configurable**, supporting features like variants, sizes, and add-ons.

## Global Settings

### Add-ons Configuration
Add-ons are globally defined and can be applied to specific products or categories.

```json
{
  "global_addons": {
    "siomai": {
      "name": "Extra Siomai",
      "price": 5,
      "image": "/images/variants/siomai.jpg"
    },
    "shanghai": {
      "name": "Extra Shanghai",
      "price": 5,
      "image": "/images/variants/shanghai.jpg"
    },
    "skinless": {
      "name": "Extra Skinless",
      "price": 10,
      "image": "/images/variants/skinless.jpg"
    },
    "egg": {
      "name": "Extra Egg",
      "price": 15,
      "image": "/images/variants/egg.jpg"
    },
    "hotdog": {
      "name": "Extra Hotdog",
      "price": 15,
      "image": "/images/variants/hotdog.jpg"
    },
    "sauce": {
      "name": "Extra Sauce",
      "price": 5,
      "image": "/images/variants/sauce.jpg"
    }
  }
}
```

### Category Configuration
Categories define the grouping of products and whether they allow add-ons.

```json
{
  "categories": {
    "budget_meals": {
      "name": "Budget Meals",
      "image": "/images/categories/budget-meals.jpg",
      "description": "Affordable meal options",
      "allows_addons": true
    },
    "silog_meals": {
      "name": "Silog Meals",
      "image": "/images/categories/silog-meals.jpg",
      "description": "Filipino breakfast meals with rice and egg",
      "allows_addons": true
    },
    "ala_carte": {
      "name": "Ala Carte",
      "image": "/images/categories/ala-carte.jpg",
      "description": "Individual dishes",
      "allows_addons": false
    },
    "beverages": {
      "name": "Beverages",
      "image": "/images/categories/beverages.jpg",
      "description": "Drinks and refreshments",
      "allows_addons": false
    }
  }
}
```

## Product Structure

### Base Properties
Each product can have the following properties:
- `name`: Product name
- `base_price`: Base price of the product
- `description`: Short description of the product
- `image`: Path to the product image
- `category`: Category the product belongs to
- `allows_addons`: Whether the product allows add-ons
- `required_addons`: Whether add-ons are mandatory (e.g., for Chaofan)
- `available_addons`: List of add-ons available for the product
- `variants`: Product variants (e.g., sizes, flavors)

## Product Categories

### 1. Budget Meals
```json
{
  "hotsilog": {
    "name": "Hotsilog",
    "base_price": 60,
    "description": "Hotdog with Sinangag (Fried Rice) and Itlog (Egg)",
    "image": "/images/products/hotsilog.jpg",
    "category": "budget_meals",
    "allows_addons": true,
    "available_addons": ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"]
  },
  "hamsilog": {
    "name": "Hamsilog",
    "base_price": 55,
    "description": "Ham with Sinangag (Fried Rice) and Itlog (Egg)",
    "image": "/images/products/hamsilog.jpg",
    "category": "budget_meals",
    "allows_addons": true,
    "available_addons": ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"]
  },
  "silog": {
    "name": "Silog",
    "base_price": 35,
    "description": "Sinangag (Fried Rice) and Itlog (Egg)",
    "image": "/images/products/silog.jpg",
    "category": "budget_meals",
    "allows_addons": true,
    "available_addons": ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"]
  },
  "skinless_rice": {
    "name": "Skinless Rice",
    "base_price": 40,
    "description": "Skinless Longganisa with Fried Rice",
    "image": "/images/products/skinless-rice.jpg",
    "category": "budget_meals",
    "allows_addons": true,
    "available_addons": ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"]
  },
  "pork_chaofan": {
    "name": "Pork Chaofan",
    "base_price": 45,
    "description": "Pork Fried Rice Chinese Style",
    "image": "/images/products/pork-chaofan.jpg",
    "category": "budget_meals",
    "allows_addons": true,
    "required_addons": true,
    "available_addons": ["siomai", "shanghai", "skinless", "egg"]
  },
  "beef_chaofan": {
    "name": "Beef Chaofan",
    "base_price": 50,
    "description": "Beef Fried Rice Chinese Style",
    "image": "/images/products/beef-chaofan.jpg",
    "category": "budget_meals",
    "allows_addons": true,
    "required_addons": true,
    "available_addons": ["siomai", "shanghai", "skinless", "egg"]
  },
  "siomai_rice": {
    "name": "Siomai Rice",
    "base_price": 39,
    "description": "Siomai with Fried Rice",
    "image": "/images/products/siomai-rice.jpg",
    "category": "budget_meals",
    "allows_addons": true,
    "available_addons": ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"]
  },
  "shanghai_rice": {
    "name": "Shanghai Rice",
    "base_price": 39,
    "description": "Lumpia Shanghai with Rice",
    "image": "/images/products/shanghai-rice.jpg",
    "category": "budget_meals",
    "allows_addons": true,
    "available_addons": ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"]
  }
}
```

### 2. Silog Meals
```json
{
  "tapsilog": {
    "name": "Tapsilog",
    "base_price": 100,
    "description": "Beef Tapa with Sinangag and Itlog",
    "image": "/images/products/tapsilog.jpg",
    "category": "silog_meals",
    "allows_addons": true,
    "available_addons": ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"]
  },
  "porksilog": {
    "name": "Porksilog",
    "base_price": 95,
    "description": "Porkchop with Sinangag and Itlog",
    "image": "/images/products/porksilog.jpg",
    "category": "silog_meals",
    "allows_addons": true,
    "available_addons": ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"]
  },
  "chicksilog": {
    "name": "Chicksilog",
    "base_price": 95,
    "description": "Chicken with Sinangag and Itlog",
    "image": "/images/products/chicksilog.jpg",
    "category": "silog_meals",
    "allows_addons": true,
    "available_addons": ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"]
  },
  "bangsilog": {
    "name": "Bangsilog",
    "base_price": 100,
    "description": "Bangus with Sinangag and Itlog",
    "image": "/images/products/bangsilog.jpg",
    "category": "silog_meals",
    "allows_addons": true,
    "available_addons": ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"]
  },
  "sisigsilog": {
    "name": "Sisigsilog",
    "base_price": 95,
    "description": "Sisig with Sinangag and Itlog",
    "image": "/images/products/sisigsilog.jpg",
    "category": "silog_meals",
    "allows_addons": true,
    "available_addons": ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"]
  },
  "tocilog": {
    "name": "Tocilog",
    "base_price": 85,
    "description": "Tocino with Sinangag and Itlog",
    "image": "/images/products/tocilog.jpg",
    "category": "silog_meals",
    "allows_addons": true,
    "available_addons": ["siomai", "shanghai", "skinless", "egg", "hotdog", "sauce"]
  }
}
```

### 3. Ala Carte
```json
{
  "lugaw": {
    "name": "Lugaw",
    "base_price": 20,
    "description": "Filipino Rice Porridge",
    "image": "/images/products/lugaw.jpg",
    "category": "ala_carte",
    "allows_addons": false
  },
  "goto": {
    "name": "Goto",
    "base_price": 35,
    "description": "Rice Porridge with Beef Tripe",
    "image": "/images/products/goto.jpg",
    "category": "ala_carte",
    "allows_addons": false
  },
  "beef_mami": {
    "name": "Beef Mami",
    "base_price": 45,
    "description": "Beef Noodle Soup",
    "image": "/images/products/beef-mami.jpg",
    "category": "ala_carte",
    "allows_addons": false
  },
  "pares": {
    "name": "Pares",
    "base_price": 60,
    "description": "Beef Stew with Rice",
    "image": "/images/products/pares.jpg",
    "category": "ala_carte",
    "allows_addons": false
  },
  "fries": {
    "name": "Fries",
    "base_price": 25,
    "description": "Crispy French Fries",
    "image": "/images/products/fries.jpg",
    "category": "ala_carte",
    "allows_addons": false
  },
  "waffle": {
    "name": "Waffle",
    "description": "Fresh Baked Waffle",
    "image": "/images/products/waffle.jpg",
    "category": "ala_carte",
    "variants": {
      "chocolate": {
        "name": "Chocolate Waffle",
        "base_price": 15,
        "image": "/images/variants/chocolate-waffle.jpg"
      },
      "cheese": {
        "name": "Cheese Waffle",
        "base_price": 15,
        "image": "/images/variants/cheese-waffle.jpg"
      },
      "hotdog": {
        "name": "Hotdog Waffle",
        "base_price": 15,
        "image": "/images/variants/hotdog-waffle.jpg"
      }
    }
  },
  "graham_bar": {
    "name": "Graham Bar",
    "base_price": 20,
    "description": "Graham Cracker Dessert Bar",
    "image": "/images/products/graham-bar.jpg",
    "category": "ala_carte",
    "allows_addons": false
  },
  "cheese_stick": {
    "name": "Cheese Stick",
    "base_price": 10,
    "description": "Crispy Cheese Stick (6 pieces per order)",
    "image": "/images/products/cheese-stick.jpg",
    "category": "ala_carte",
    "allows_addons": false
  },
  "siomai": {
    "name": "Siomai",
    "description": "Chinese-style Siomai",
    "image": "/images/products/siomai.jpg",
    "category": "ala_carte",
    "variants": {
      "chicken": {
        "name": "Chicken Siomai",
        "base_price": 5,
        "image": "/images/variants/chicken-siomai.jpg"
      },
      "beef": {
        "name": "Beef Siomai",
        "base_price": 5,
        "image": "/images/variants/beef-siomai.jpg"
      }
    }
  }
}
```

### 4. Beverages
```json
{
  "coke_float": {
    "name": "Coke Float",
    "description": "Coca-Cola with Ice Cream",
    "category": "beverages",
    "variants": {
      "16oz": {
        "name": "16oz Coke Float",
        "base_price": 29,
        "image": "/images/variants/coke-float-16oz.jpg"
      },
      "22oz": {
        "name": "22oz Coke Float",
        "base_price": 39,
        "image": "/images/variants/coke-float-22oz.jpg"
      }
    }
  },
  "iced_coffee": {
    "name": "Iced Coffee",
    "description": "Cold Brewed Coffee with Ice (22oz)",
    "image": "/images/products/iced-coffee.jpg",
    "category": "beverages",
    "base_price": 39
  },
  "fruit_soda": {
    "name": "Fruit Soda",
    "description": "Refreshing Fruit-flavored Soda",
    "category": "beverages",
    "variants": {
      "16oz": {
        "base_price": 29,
        "flavors": {
          "blueberry": {
            "name": "Blueberry",
            "image": "/images/variants/blueberry-16oz.jpg"
          },
          "strawberry": {
            "name": "Strawberry",
            "image": "/images/variants/strawberry-16oz.jpg"
          },
          "lemon": {
            "name": "Lemon",
            "image": "/images/variants/lemon-16oz.jpg"
          },
          "green_apple": {
            "name": "Green Apple",
            "image": "/images/variants/greenapple-16oz.jpg"
          },
          "lychee": {
            "name": "Lychee",
            "image": "/images/variants/lychee-16oz.jpg"
          }
        }
      },
      "22oz": {
        "base_price": 39,
        "flavors": {
          "blueberry": {
            "name": "Blueberry",
            "image": "/images/variants/blueberry-22oz.jpg"
          },
          "strawberry": {
            "name": "Strawberry",
            "image": "/images/variants/strawberry-22oz.jpg"
          },
          "lemon": {
            "name": "Lemon",
            "image": "/images/variants/lemon-22oz.jpg"
          },
          "green_apple": {
            "name": "Green Apple",
            "image": "/images/variants/greenapple-22oz.jpg"
          },
          "lychee": {
            "name": "Lychee",
            "image": "/images/variants/lychee-22oz.jpg"
          }
        }
      }
    }
  }
}
```

## Customization Rules

### Add-ons Rules
- Can be enabled or disabled per product
- Can be marked as required (e.g., for Chaofan)
- Can be selected from the global add-ons list

### Variant Rules
- Can include sizes, flavors, or other options
- Each variant can have its own price and image

### Category Rules
- Define whether products in the category allow add-ons
- Provide a default image and description for the category

## Next Steps
1. Review and validate product configurations
2. Implement product management interface
3. Set up image optimization for product images
4. Add inventory tracking system
5. Implement product search and filtering
6. Add product analytics and reporting

---

Let me know if you need any clarification or have additional requirements! 🚀