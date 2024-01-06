window.onload = function () {
    showAll();
};

//調整視窗尺寸時按鈕消失
window.addEventListener('resize', function () {
    var screenWidth = window.innerWidth;

    // 螢幕寬度小於 600px 時，移除圖片
    if (screenWidth < 600) {
        document.querySelector('.pre-btn img').style.display = 'none';
        document.querySelector('.nxt-btn img').style.display = 'none';
    } else {
        // 螢幕寬度大於等於 600px 時，顯示圖片
        document.querySelector('.pre-btn img').style.display = 'block';
        document.querySelector('.nxt-btn img').style.display = 'block';
    }
});

// 初始化時執行一次，確保初始狀態是正確的
window.dispatchEvent(new Event('resize'));

function clearAll() {
    var parentContainer = document.querySelector(".row");
    parentContainer.innerHTML = '';

    var resultElement = document.getElementById("NumberOfNTOUCard");
    resultElement.innerHTML = '';

    var parentContainer = document.querySelector(".product");
    parentContainer.innerHTML = '';
}

function showAll() {
    clearAll();

    fetch('../Model/showAllRestaurant.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // 請根據你的後端需要設置正確的 Content-Type
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            var total = data.split("+");
            var count = total[0];
            var items = total[1].split("\n");

            // 容器名稱
            var product = document.querySelector(".product");

            // 前按鈕
            var preButton = document.createElement("button");
            preButton.className = "pre-btn";
            var preButtonImage = document.createElement("img");
            preButtonImage.src = "../image/left.png"; // 替換成實際的圖片路徑
            preButtonImage.style.transform = "scaleX(-1)"; // 將圖片水平翻轉
            preButton.appendChild(preButtonImage);

            // 後按鈕
            var nextButton = document.createElement("button");
            nextButton.className = "nxt-btn";
            var nextButtonImage = document.createElement("img");
            nextButtonImage.src = "../image/left.png"; // 替換成實際的圖片路徑
            nextButtonImage.style.transform = "scaleX(-1)"; // 將圖片水平翻轉
            nextButton.appendChild(nextButtonImage);

            product.appendChild(preButton);
            product.appendChild(nextButton);

            // product容器內容
            var parentContainer = document.createElement("div");
            parentContainer.className = "product-container";

            product.appendChild(parentContainer);


            // 用按紐切換內容功能
            const productContainers = [...document.querySelectorAll('.product-container')];
            const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
            const preBtn = [...document.querySelectorAll('.pre-btn')];

            productContainers.forEach((item, i) => {
                let containerDimensions = item.getBoundingClientRect();
                let containerWidth = containerDimensions.width;

                nxtBtn[i].addEventListener('click', () => {
                    item.scrollLeft += containerWidth;
                })

                preBtn[i].addEventListener('click', () => {
                    item.scrollLeft -= containerWidth;
                })
            })

            // 動態補充內容
            for (var i = 0; i < count; i++) {
                var temp = items[i].split("|");

                var colDiv = document.createElement("div");
                colDiv.className = "product-card";
                // colDiv.className = "col-12 col-md-5 mt-5 me-auto ms-auto";

                // 取得圖片大小動態設定
                var tempImage = new Image();
                tempImage.src = `${temp[5] || "null"}`;
                tempImage.onload = function () {
                    // 根據圖片寬度動態設定 product-card 寬度
                    colDiv.style.width = tempImage.width + "px";
                };

                //1.容器內容上半部 : 圖片跟網站
                var top = document.createElement("div");
                top.className = "product-image";
                top.innerHTML = `
                        <p><img src="${tempImage.src}" width="100%"></p>
                        <button class="card-btn"> 
                        ${temp[1] !== " " ? `<a href="${temp[1] || "null"}" target="_blank">餐廳網站</a>` : "無連結"}
                        </button>`;

                //2.容器下半部 : 資訊
                var bottom = document.createElement("div");
                bottom.className = "product-info";
                bottom.innerHTML = `
                        <h1 class="product-brand">${temp[0] || "null"}</h1>
                        <div class="Allcontent">
                            <p class="product-short-description">餐廳電話 : ${temp[2] || "null"}</p>
                            <p class="product-short-description">餐廳地址 : ${temp[3] || "null"}</p>
                            <p class="product-short-description">餐廳營業時間 : ${temp[4] || "null"}</p>
                        </div>`;

                colDiv.appendChild(top);
                colDiv.appendChild(bottom);
                parentContainer.appendChild(colDiv);
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function showNTOU() {
    clearAll();

    fetch('../Model/showNCRestaurant.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // 請根據你的後端需要設置正確的 Content-Type
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            var total = data.split("+");
            var count = total[0];
            var items = total[1].split("\n");

            // 容器名稱
            var product = document.querySelector(".product");

            // 前按鈕
            var preButton = document.createElement("button");
            preButton.className = "pre-btn";
            var preButtonImage = document.createElement("img");
            preButtonImage.src = "../image/left.png"; // 替換成實際的圖片路徑
            preButtonImage.style.transform = "scaleX(-1)"; // 將圖片水平翻轉
            preButton.appendChild(preButtonImage);


            // 後按鈕
            var nextButton = document.createElement("button");
            nextButton.className = "nxt-btn";
            var nextButtonImage = document.createElement("img");
            nextButtonImage.src = "../image/left.png"; // 替換成實際的圖片路徑
            nextButtonImage.style.transform = "scaleX(-1)"; // 將圖片水平翻轉
            nextButton.appendChild(nextButtonImage);

            product.appendChild(preButton);
            product.appendChild(nextButton);

            // product容器內容
            var parentContainer = document.createElement("div");
            parentContainer.className = "product-container";

            product.appendChild(parentContainer);


            // 用按紐切換內容功能
            const productContainers = [...document.querySelectorAll('.product-container')];
            const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
            const preBtn = [...document.querySelectorAll('.pre-btn')];

            productContainers.forEach((item, i) => {
                let containerDimensions = item.getBoundingClientRect();
                let containerWidth = containerDimensions.width;

                nxtBtn[i].addEventListener('click', () => {
                    item.scrollLeft += containerWidth;
                })

                preBtn[i].addEventListener('click', () => {
                    item.scrollLeft -= containerWidth;
                })
            })

            // var parentContainer = document.querySelector(".row");


            // 動態補充內容
            for (var i = 0; i < count; i++) {
                var temp = items[i].split("|");

                var colDiv = document.createElement("div");
                colDiv.className = "product-card";
                // colDiv.className = "col-12 col-md-5 mt-5 me-auto ms-auto";

                // 取得圖片大小動態設定
                var tempImage = new Image();
                tempImage.src = `${temp[4] || "null"}`;
                tempImage.onload = function () {
                    // 根據圖片寬度動態設定 product-card 寬度
                    colDiv.style.width = tempImage.width + "px";
                };

                //1.容器內容上半部 : 圖片跟網站
                var top = document.createElement("div");
                top.className = "product-image";
                top.innerHTML = `
                        <p><img src="${tempImage.src}" width="100%"></p>
                        <button class="card-btn"> 
                        ${temp[1] !== " " ? `<a href="${temp[1] || "null"}" target="_blank">餐廳網站</a>` : "無連結"}
                        </button>`;

                //2.容器下半部 : 資訊
                var bottom = document.createElement("div");
                bottom.className = "product-info";
                bottom.innerHTML = `
                        <h1 class="product-brand">${temp[0] || "null"}</h1>
                        <div class="Allcontent">
                            <p class="product-short-description">餐廳電話 : ${temp[2] || "null"}</p>
                            <p class="product-short-description">餐廳地址 : ${temp[3] || "null"}</p>
                            <p class="product-short-description">餐廳營業時間 : ${temp[4] || "null"}</p>
                        </div>`;

                colDiv.appendChild(top);
                colDiv.appendChild(bottom);
                parentContainer.appendChild(colDiv);
            }


            // for (var i = 0; i < count; i++) {
            //     var temp = items[i].split("|");

            //     var colDiv = document.createElement("div");
            //     colDiv.className = "col-12 col-md-5 mt-5 me-auto ms-auto";

            //     var restaurantDiv = document.createElement("div");
            //     restaurantDiv.innerHTML = `
            //             <h1 class="Alltitle">${temp[0] || "null"}</h1>
            //             <p><img src="https://lh5.googleusercontent.com/p/AF1QipNTUNHkT4TOCuG8Uc10iYlLlXtRq0EsTcER1vd0=w408-h306-k-no" width="100%"></p>
            //             <div class="Allcontent">
            //                 <p class="text">餐廳電話 : ${temp[2] || "null"}</p>
            //                 <p class="text">餐廳地址 : ${temp[3] || "null"}</p>
            //                 <p class="text">餐廳營業時間 : ${temp[4] || "null"}</p>
            //                 <button class="w-100 mb-2"> 
            //                     ${temp[1] !== " " ? `<a href="${temp[1] || "null"}" target="_blank">餐廳網站</a>` : "無連結"}
            //                 </button>
            //             </div>`;

            //     colDiv.appendChild(restaurantDiv);
            //     parentContainer.appendChild(colDiv);
            // }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}
function showNTOUcount() {
    fetch("../Model/countNTOUCard.php")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            var resultElement = document.getElementById("NumberOfNTOUCard");
            resultElement.innerHTML = "能使用海大卡的店家個數: " + data;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function showCategory() {
    clearAll();

    fetch('../Model/showAllRestaurantKind.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            var total = data.split("+");
            var count = total[0];
            var items = total[1].split("\n");
            var parentContainer = document.querySelector(".row");

            for (var i = 0; i < count; i++) {
                var temp = items[i].split("|");

                var colDiv = document.createElement("div");
                colDiv.className = "col-12 col-md-6 mt-5 me-auto ms-auto";

                var restaurantDiv = document.createElement("div");
                restaurantDiv.innerHTML = `
                <h1 class="Alltitle">${temp[0] || "null"}</h1>
                <p class="text" style="display: inline-block;">餐廳總類&nbsp;</p><p style="display: inline-block;">${temp[1] || "null"}</p>`;

                // 使用 for 迴圈，避免無窮迴圈
                for (var j = i + 1; j < count; j++) {
                    var next = items[j].split("|");
                    if (next[0] == temp[0] && next[0] != " ") {
                        // 使用 inline-block，確保不換行
                        restaurantDiv.innerHTML += `<p class="text"  style="display: inline-block;"></p><p style="display: inline-block;">${next[1] || "null"},</p>`;
                        i = j; // 更新 i 到最後一個相同類別的項目，以避免重複處理
                    } else {
                        break;
                    }
                }

                restaurantDiv.innerHTML += `

                    <p class="text">餐廳地址${temp[2] || "null"}</p>`;

                colDiv.appendChild(restaurantDiv);
                parentContainer.appendChild(colDiv);
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}



//////////////////////////////////////////////////////////////////
// 取得輪播容器元素
var carousel = document.getElementById('myCarousel');
var myCarousel = new bootstrap.Carousel(carousel, {
    interval: 100,
    pause: false
})

function select() {

    setTimeout(function () {
        myCarousel.pause();
    }, 100);

}

function restart() {
    myCarousel.cycle();

}

function openCarousel() {
    document.querySelector('.carousel-container').style.display = 'flex';
}

function closeCarousel() {
    document.querySelector('.carousel-container').style.display = 'none';
}



fetch('../Model/showAllRestaurant.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        var total = data.split("+");
        var count = total[0];
        var items = total[1].split("\n");

        var carouselInner = document.getElementById("dynamicCarouselInner");

        for (var i = 0; i < count; i++) {
            var temp = items[i].split("|");

            var colDiv = document.createElement("div");
            // colDiv.className = "card col-12 col-md-5 me-auto ms-auto";

            var restaurantDiv = document.createElement("div");
            // <p><img src="https://lh5.googleusercontent.com/p/AF1QipNTUNHkT4TOCuG8Uc10iYlLlXtRq0EsTcER1vd0=w408-h306-k-no" width="100%"></p>

            restaurantDiv.innerHTML = `
                    <h1 class="Alltitle">${temp[0] || "null"}</h1>
                    <p><img src="${temp[5] || "null"}" width="100%"></p>
                    <div class="Allcontent">
                    <p class="text">餐廳電話 : ${temp[2] || "null"}</p>
                    <p class="text">餐廳地址 : ${temp[3] || "null"}</p>
                    <p class="text">餐廳營業時間 : ${temp[4] || "null"}</p>
                    <button class="w-100 mb-2"> 
                        ${temp[1] !== " " ? `<a href="${temp[1] || "null"}" target="_blank">餐廳網站</a>` : "無連結"}
                    </button>
                    </div>`;

            var carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");
            carouselItem.setAttribute("data-bs-interval", "100");

            colDiv.appendChild(restaurantDiv);
            carouselItem.appendChild(colDiv);
            carouselInner.appendChild(carouselItem);

        }

        carouselItem.classList.add("active");
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
