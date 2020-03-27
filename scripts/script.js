let fastfood = {
    hamburger:{
        name: 'Гамбургер',
        amount: 0,
        price: 14500,
        kcall: 200,
        get calcPrice(){
           return this.amount * this.price;
        },
        get calcKcall (){
            return this.amount * this.kcall
        }
    },
    hamburgercheese:{
        name: 'Гамбургер с Сыром',
        amount: 0,
        price: 16500,
        kcall: 300,
        get calcPrice(){
            return this.amount * this.price;
        },
        get calcKcall (){
            return this.amount * this.kcall
        }
    },
    hamburgerchicken:{
        name: 'Гамбургер Куриный',
        amount: 0,
        price: 13000,
        kcall: 150,
        get calcPrice(){
            return  this.amount * this.price;
        },
        get calcKcall (){
            return this.amount * this.kcall
        }
    },
    sandvichbeef:{
        name: 'Сэндвич с Говядиной',
        amount: 0,
        price: 17000,
        kcall: 250,
        get calcPrice(){
            return this.amount * this.price;
        },
        get calcKcall (){
            return this.amount * this.kcall
        }
    },
    sandvichchicken:{
        name: 'Сэндвич с Курицей',
        amount: 0,
        price: 16000,
        kcall: 220,
        get calcPrice(){
            return this.amount * this.price;
        },
        get calcKcall (){
            return this.amount * this.kcall
        }
    },
    sandvichtuna:{
        name: 'Сэндвич с Тунцом',
        amount: 0,
        price: 20000,
        kcall: 270,
        get calcPrice(){
            return this.amount * this.price;
        },
        get calcKcall (){
            return this.amount * this.kcall
        }
    },
};
let extraProducts = {
    lettuce:{
        name: 'Салатный лист',
        kcall: 50,
        price: 500
    },
    doublemayonese:{
        name: 'Двойной майонез',
        kcall: 100,
        price: 800
    },
    doublecheese:{
        name: 'Двойной сыр',
        kcall: 120,
        price: 1500
    },
};

let buttonPlusOrMinus = document.querySelectorAll('.count__button');
for(let btn of buttonPlusOrMinus){
    btn.addEventListener('click', function(e){
        e.preventDefault();
        plusOrMinus(this);
    })
}

function plusOrMinus (element){
    let parent = element.closest('.burger-img'),
        parentId = parent.getAttribute('id'),
        elementSymbol = element.getAttribute('data-symbol');
       amount = parent.querySelector('.count'),
       kcall = parent.querySelector('.kcall__span span'),
       price = parent.querySelector('.price__span span'),
       busket = document.querySelector('.busket span');
       
    if(elementSymbol == 'plus' && fastfood[parentId].amount < 10){
     fastfood[parentId].amount++;
     busket.innerHTML++;
    }
    else if(elementSymbol == 'minus' && fastfood[parentId].amount > 0) { 
        fastfood[parentId].amount--;
        busket.innerHTML--;
    }
amount.innerHTML = fastfood[parentId].amount;
price.innerHTML = fastfood[parentId].calcPrice;
kcall.innerHTML = fastfood[parentId].calcKcall;
};

let checkBox = document.querySelectorAll('.check');
for (let el of checkBox){
    el.addEventListener('click', function(){
        extraProductsCalc(this);
    })
}

function extraProductsCalc(element){
    let parent = element.closest('.burger-img'),
    parentId = parent.getAttribute('id'),
    elementName = element.getAttribute('data-extra');
   kcall = parent.querySelector('.kcall__span span'),
   price = parent.querySelector('.price__span span');

   fastfood[parentId][elementName] = element.checked;

   if(fastfood[parentId][elementName] == true){
       fastfood[parentId].price += extraProducts[elementName].price;
       fastfood[parentId].kcall += extraProducts[elementName].kcall;
   }
   else if(fastfood[parentId][elementName] == false){
    fastfood[parentId].price -= extraProducts[elementName].price;
    fastfood[parentId].kcall -= extraProducts[elementName].kcall;
   }
kcall.innerHTML = fastfood[parentId].calcKcall;
price.innerHTML = fastfood[parentId].calcPrice;
}

let receiptOut = document.querySelector('.receipt-out'),
    receipt = document.querySelector('.receipt'),
    receiptBtn = document.querySelector('.receipt-btn'),
    busket = document.querySelector('.busket'),
    fastfoodArray = [],
   totalName = '',
   totalPrice = 0,
   totalKcall = 0;
busket.addEventListener('click', function(e){
    e.preventDefault();
   for(let key in fastfood){
      if (fastfood[key].amount > 0){
           fastfoodArray.push(fastfood[key]);
           fastfood[key].name += ` - ${fastfood[key].amount}шт`;
           for(let newKey in fastfood[key]){
            if(fastfood[key][newKey] === true){ 
                // console.log(extraProducts[newKey].name);
                
                fastfood[key].name += `<br>\t${extraProducts[newKey].name}`;
            }
        }
       }
   }
   for( let food of fastfoodArray){
    totalPrice += food.calcPrice;
    totalKcall += food.calcKcall;
    totalName += `<br>${food.name}<br>`;
 }
 receiptOut.innerHTML = `Ваш заказ:<br>${totalName}<br>Калорийность: ${totalKcall} ккал<br>Общая стоимость: ${totalPrice} сумм`;
 setTimeout(function (){receipt.style = 'top: 0';}, 300);
let amount = document.querySelectorAll('.count'),
kcall = document.querySelectorAll('.kcall__span span'),
price = document.querySelectorAll('.price__span span');
for(let i in price){
    if(price[i].innerHTML !== 0) price[i].innerHTML = 0;
    for(let k in kcall){
        if(kcall[k].innerHTML !== 0) kcall[k].innerHTML = 0;
        for (let j in amount){
            if(amount[j].innerHTML !== 0) amount[j].innerHTML = 0;
            
        }
    }
}
})
receiptBtn.addEventListener('click', function(){
    location.reload();
})