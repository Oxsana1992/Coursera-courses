$(() => {
  $("#navarTogger").blur((event) => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse("hide");
    }
  });
});
$(
  ((global) => {
    const dc = {};
    const homeHtml = "src/snippets/home-snippet.html";
    const allCategoriesUrl = "src/json/categories.json";
    const categoriesTitleHtml = "src/snippets/categories-title-snippet.html";
    const categoryHtml = "src/snippets/category-snippet.html";
    const menuItemsUrl = "src/json/menu_items.json?category=";
    const menuItemsTitleHtml = "src/snippets/menu-items-title.html";
    const menuItemHtml = "src/snippets/menu-item.html";

    // Conviniece function for inserting innerHTMLfor 'select'
    const insertHtml = (selector, html) => {
      const targetElem = document.querySelector(selector);
      targetElem.innerHTML = html;
    };
    // Show loading icon inside element identified by 'selector'
    const showLoading = (selector) => {
      let html = "<div class='text-center'>";
      html += "<img src='src/images/ajax-loader.gif'></div>";
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
      categoryHtml
    ) {
      let finalHtml = categoriesTitleHtml;
      finalHtml += "<section class='row'>";

      for (let i = 0; i < categories.length; i++) {
        let html = categoryHtml;
        let name = "" + categories[i].name;
        let short_name = categories[i].short_name;
        html = insertProperty(html, "name", name);
        html = insertProperty(html, "short_name", short_name);
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
              let menuItemsViewHtml = buildMenuItemsViewHTML(
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
        categoryMenuItems.category.name
      );

      menuItemsTitleHtml = insertProperty(
        menuItemsTitleHtml,
        "special_instructions",
        categoryMenuItems.category.special_instructions
      );

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
        html = insertItemPortionName(
          html,
          "large_portion_name",
          menuItems[i].large_portion_name
        );
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
(function (global) {
  // Set up a namespace for our utility
  var ajaxUtils = {};

  // Returns an HTTP request object
  function getRequestObject() {
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      // For very old IE browsers (optional)
      return new ActiveXObject("Microsoft.XMLHTTP");
    } else {
      global.alert("Ajax is not supported!");
      return null;
    }
  }

  // Makes an Ajax GET request to 'requestUrl'
  ajaxUtils.sendGetRequest = function (
    requestUrl,
    responseHandler,
    isJsonResponse
  ) {
    var request = getRequestObject();
    request.onreadystatechange = function () {
      handleResponse(request, responseHandler, isJsonResponse);
    };
    request.open("GET", requestUrl, true);
    request.send(null); // for POST only
  };

  // Only calls user provided 'responseHandler'
  // function if response is ready
  // and not an error
  function handleResponse(request, responseHandler, isJsonResponse) {
    if (request.readyState == 4 && request.status == 200) {
      // Default to isJsonResponse = true
      if (isJsonResponse == undefined) {
        isJsonResponse = true;
      }

      if (isJsonResponse) {
        responseHandler(JSON.parse(request.responseText));
      } else {
        responseHandler(request.responseText);
      }
    }
  }

  // Expose utility to the global object
  global.$ajaxUtils = ajaxUtils;
})(window);
