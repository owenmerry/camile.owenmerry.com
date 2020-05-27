export const buildProductList = (data) => {

    const products = data.data.products.map((item) => ({
        name: item.name,
        price: item.price.priceInPenceIncVat,
        image: item.productImage.location,
        section: item.category.categoryName,
    }));

    return products;
}

export const randomOrderFromLimit = (data,limit, minAmount) => {

    const order = [];
    var i = 0;
    var total = 0;
    const products = data.filter((item) => item.price <= limit);

    do {
    let randomNumber = randomNumberFromRange(0, products.length-1);
    let itemSelected = products[randomNumber];
    i += itemSelected.price;
    if(i < limit){
        order.push(itemSelected);
        total += itemSelected.price;
    }else{
        if (order.length === 0){
            i = 0;
        }
        if (total <= minAmount) {
            i = i - itemSelected.price;
        }
    }

    } while (i < limit);

    //return data;
    return {
        order,
        total,
    };
}

export const randomNumberFromRange = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

