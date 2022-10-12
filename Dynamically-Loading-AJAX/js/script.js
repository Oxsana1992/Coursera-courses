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
    const allCategoriesUrl =
      "html://davids-restorant.herokuapp.com/categories.json";
    const categoriesTitleHtml = "snippets/categories-title-snippet.html";
    const categoryHtml = "snippets/category-snippet.html";
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
    const insertProperty = (string, propName, propValue) => {
      const propToReplace = "{{" + propName + "}}";
      string = string.replace(new RegExp(propToReplace, "g"), propValue);
      return string;
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

    dc.loadMenuCategories = () => {
      showLoading("#main-content");
      $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
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

    function buildCategoriesViewHtml(
      categories,
      categoriesTitleHtml,
      categoryHtml
    ) {
      const finalHtml = categoriesTitleHtml;
      finalHtml += "<section class='row'>";

      for (let i = 0; i < categories.length; i++) {
        const html = categoryHtml;
        const name = "" + categories[i].name;
        const short_name = categories[i].short_name;
        html = insertProperty(html, "name", name);
        html = insertProperty(html, "short_name", short_name);
        finalHtml += html;
      }
      finalHtml += "</section>";
      return finalHtml;
    }
    global.$dc = dc;
  })(window)
);
