$(() => {
  $("#navarTogger").blur((event) => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse("hide");
    }
  });
});

// $(() => {const xhr = new XMLHttpRequest();
// 		const maincontent = document.getElementById('main-content');
// 		xhr.onload = function() {
// 			if (this.status === 200) {
// 				maincontent.innerHTML = xhr.responseText;
// 			} else {
// 				console.log('Did not recieve 200 OK from response!');
// 			}
// 		};
// xhr.open('get', 'home-snippet.html');
// xhr.send();
// })

$(
  ((global) => {
    const dc = {};
    const homeHtml = "snippets/home-snippet.html";
    const allCategoriesUrl = "json/categories.json";
    const categoriesTitleHtml = "snippets/categories-title-snippet.html";
    const categoryHtml = "snippets/category-snippet.html";
    const menuItemsUrl = "json/menu_items.json?category=";
    const menuItemsTitleHtml = "snippets/menu-items-title.html";
    const menuItemHtml = "snippets/menu-item.html";

    // Conviniece function for inserting innerHTMLfor 'select'
    const insertHtml = (selector, html) => {
      const targetElem = document.querySelector(selector);
      targetElem.innerHTML = html;
    };
    // Show loading icon inside element identified by 'selector'
    const showLoading = (selector) => {
      let html = "<div class='text-center'>";
      html += "<img src='images/ajax-loader.gif'></div>";
      insertHtml(selector, html);
    };

    //Return substitute of {{propName}}
    const insertProperty = (string, propName, propValue) => {
      const propToReplace = "{{" + propName + "}}";
      string = string.replace(new RegExp(propToReplace, "g"), propValue);
      return string;
    };

    const switchMenuToActive = function () {
      let classes = document.querySelector("#navHomeButton").className;
      classes = classes.replace(new RegExp("active", "g"), "");
      document.querySelector("#navHomeButton").className = classes;

      classes = document.querySelector("#navHomeButton").className;
      if (classes.indexOf("active") == -1) {
        classes += " active";
        document.querySelector("#navMenuButton").className = classes;
      }
    };

    // On page load (before image or CSS)
    document.addEventListener("DOMContentLoaded", (event) => {
      //On first load, show home view
      showLoading("#main-content");
      $ajaxUtils.sendGetRequest(
        homeHtml,
        (responseText) => {
          document.querySelector("#main-content").innerHTML = responseText;
        },
        false
      );
    });

    //load the menu categories view
    dc.loadMenuCategories = function () {
      showLoading("#main-content");
      $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
    };

    //load the menu items view
    dc.loadMenuItems = function (categoryShort) {
      showLoading("#main-content");
      $ajaxUtils.sendGetRequest(
        menuItemsUrl + categoryShort,
        buildAndShowMenuItemsHTML
      );
    };

    function buildAndShowCategoriesHTML(categories) {
      $ajaxUtils.sendGetRequest(
        categoriesTitleHtml,
        (categoriesTitleHtml) => {
          $ajaxUtils.sendGetRequest(
            categoryHtml,
            (categoryHtml) => {
              const categoriesViewHtml = buildCategoriesViewHtml(
                categories,
                categoriesTitleHtml,
                categoryHtml
              );
              insertHtml("#main-content", categoriesViewHtml);
            },
            false
          );
        },
        false
      );
    }
// Using categories data
    function buildCategoriesViewHtml(
      categories, 
      categoriesTitleHtml, 
      categoryHtml) {
      let finalHtml = categoriesTitleHtml;
      finalHtml += "<section class='row'>";

      for (let i = 0; i < categories.length; i++) {
        let html = categoryHtml;
        let name = "" + categories[i].name;
        let short_name = categories[i].short_name;
        html = 
          insertProperty(html, "name", name);
        html = 
          insertProperty(html, "short_name", short_name);
        finalHtml += html;
      }
      finalHtml += "</section>";
      return finalHtml;
    }

    function buildAndShowMenuItemsHTML(categoryMenuItems) {
      $ajaxUtils.sendGetRequest(
        menuItemsTitleHtml,
        function (menuItemsTitleHtml) {
          $ajaxUtils.sendGetRequest(
            menuItemHtml,
            function (menuItemHtml) {
              let menuItemsViewHtml =     buildMenuItemsViewHTML(
                categoryMenuItems,
                menuItemsTitleHtml,
                menuItemHtml
              );
              insertHtml("#main-content", menuItemsViewHtml);
            },
            false
          );
        },
        false
      );
    }
// Using category and menu items data and snippets html
    function buildMenuItemsViewHTML(
      categoryMenuItems,
      menuItemsTitleHtml,
      menuItemHtml
    ) {
      menuItemsTitleHtml = insertProperty(
        menuItemsTitleHtml,
        "name",
        categoryMenuItems.category.name);

      menuItemsTitleHtml = insertProperty(
        menuItemsTitleHtml,
        "special_instructions",
        categoryMenuItems.category.special_instructions);

      let finalHtml = menuItemsTitleHtml;
      finalHtml += "<section class='row'>";

      let menuItems = categoryMenuItems.menu_items;
      let catShortName = categoryMenuItems.category.short_name;

      for (let i = 0; i < menuItems.length; i++) {
        let html = menuItemHtml;
        html = insertProperty(html, "short_name", menuItems[i].short_name);
        html = insertProperty(html, "catShortName", catShortName);
        html = insertItemPrice(html, "price_small", menuItems[i].price_small);
        html = insertItemPortionName(
          html,
          "small_portion_name",
          menuItems[i].small_portion_name
        );
        html = insertItemPrice(html, "price_large", menuItems[i].price_large);
        html = insertItemPortionName(html, "large_portion_name", menuItems[i].large_portion_name);
        html = insertProperty(html, "name", menuItems[i].name);
        html = insertProperty(html, "description", menuItems[i].description);

        if (i % 2 != 0) {
          html +=
            "<div class='clearfix visible-lg-block visible-md-block'></div>";
        }

        finalHtml += html;
      }

      finalHtml += "</section>";
      return finalHtml;
    }
// Append price with s if price exists
    function insertItemPrice(html, pricePropName, priceValue) {
      if (!priceValue) {
        return insertProperty(html, pricePropName, "");
      }
      priceValue = "$" + priceValue.toFixed(2);
      html = insertProperty(html, pricePropName, priceValue);
      return html;
    }
    //Appends portion namein parens if it exists
    function insertItemPortionName(html, portionPropName, portionValue) {
      if (!portionValue) {
        return insertProperty(html, portionPropName, "");
      }
      portionValue = "$" + portionValue.toFixed(2);
      html = insertProperty(html, pricePropName, portionValue);
      return html;
    }

    global.$dc = dc;
  })(window)
);
