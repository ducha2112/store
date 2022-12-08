
class ProductsList{
    constructor(container = '.products') {
        this.container = container;//свойство, которое хранит информацию, где будем товары размещать
        this.goods = [];//массив товаров каталога
        this.getProducts()
            .then(data => {//data - это массив товаров
                this.goods = data;
                this.render();
            })
    }


    getProducts(){
        return fetch(`json/catalog.json`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }

    render(){//получение всех товаров каталога
        // console.log(this.goods);
        const block = document.querySelector(this.container);//в данном блоке будем выводить товары
        this.goods.forEach(item => {
            const good = new GoodCatalog(item);
            block.insertAdjacentHTML('beforeend',good.render());//получили верстку для каждого товара
        });
        let list =  document.querySelectorAll('.buy-btn');

          list.forEach(item => item.addEventListener('click',(e)=>{

              for(let i in catalog.goods) {
                  // console.log(e.target.id);
                  // console.log(catalog.goods[i]);


                  if (e.target.id == catalog.goods[i].id_product) {
                     let chosen = catalog.goods[i];


                      if (cart.goods.find(item =>item.id_product == chosen.id_product)) {
                          // console.log(cart.goods.find(item =>item.id_product == chosen.id_product));
                       let found = cart.goods.find(item =>item.id_product == chosen.id_product);
                          found.count += 1;
                          document.querySelector(`#count_${found.id_product}`).innerHTML = found.count;
                          document.querySelector(`#cost_${found.id_product}`).innerHTML = found.count * found.price;


                      } else {

                          cart.goods.push(chosen);
                          console.log(cart.goods);

                          chosen.count = 1;
                          document.querySelector('.cart-block').insertAdjacentHTML('beforeend',
                              `<div style="text-align: center;" class="product-item">
                <img src="images/${chosen.id_product}.webp" width = '200'">
                <h3>${chosen.product_name}</h3>
                <p>${chosen.price}</p>  
                <p id = "count_${chosen.id_product}">${chosen.count}</p>    
                <p id = "cost_${chosen.id_product}">Общая стоимость: ${chosen.price * chosen.count}</p> 
                <button id = "clr_${chosen.id_product}" >Удалить из корзины</button> 
            </div>`)


                      }


                  }

              }


          }));

    }


}

class GoodCatalog{//в этом классе описываем отдельные свойства каждого товара
    constructor(product){
        this.title = product.product_name;
        this.id = product.id_product;
        this.img = `images/${product.id_product}.webp`;
        this.price = product.price;
        // this.clickBuy()

    }
    render(){//получение товара каталога
        return `
            <div style="text-align: center;" class="product-item">
                <img src="${this.img}" width = '200'">
                <h3>${this.title}</h3>
                <p>${this.price}</p>    
                <button class="buy-btn" id = "${this.id}">Купить</button>
            </div>`
    }




}

class Cart{
    constructor(container = '.cart-block') {
        this.container = container;//свойство, которое хранит информацию, где будем товары размещать
        this.goods = [];//массив товаров каталога
        this.clickBasket();//для показа и скрытия товаров корзины
        this
        this.getProducts()
            .then(data => {//data - это массив товаров
                this.goods = data.goods;
                this.render();
            })
    }

    getProducts(){
        return fetch(`json/cart.json`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }

    render(){//вывод корзины
        // console.log(this.goods);
        const block = document.querySelector(this.container);//в данном блоке будем выводить товары
        this.goods.forEach(item => {
            const goodCart = new GoodCart();
            block.insertAdjacentHTML('beforeend',goodCart.render(item));//получили верстку для каждого товара
        });
    }

    clickBasket() {
        document.querySelector('.btn-cart').addEventListener('click',()=>{
            document.querySelector(this.container).classList.toggle('invisible');
        });
    }



}

class GoodCart {//в этом классе описываем отдельные свойства каждого товара

    render(goodCart)
    {
        this.clearBasket();

        return `
            <div style="text-align: center;" class="product-item">
                <img src="images/${goodCart.id_product}.webp" width = '200'">
                <h3>${goodCart.product_name}</h3>
                <p>${goodCart.price}</p>  
                <p id = "count_${goodCart.id_product}">${goodCart.count}</p>    
                <p id = "cost_${goodCart.id_product}">Общая стоимость: ${goodCart.price * goodCart.count}</p> 
                <button id = "clr_${goodCart.id_product}" >Удалить из корзины</button>  
            </div>`;

    }
    clearBasket() {
        for (let i of cart.goods) {
            // console.log(i.id_product);
            let listClear = document.querySelectorAll(`#clr_${i.id_product}`);
            console.log(listClear);
           listClear.forEach(item=>  item.addEventListener('click',(event)=>{
               console.log(event.target.id,i.id_product);
               let x = event.target.id.split('_')[1];

                   if (x == i.id_product) {
                       console.log(cart.goods.indexOf(i));
                       cart.goods.splice(cart.goods.indexOf(i));

                   }
           }));

            // }
        }
    }

}




let catalog = new ProductsList();
let cart = new Cart();



