
if(document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {
    
const removeProductButtoms = document.getElementsByClassName("remove-product-buttom")
console.log(removeProductButtoms)
for(var i = 0; i < removeProductButtoms.length; i++) {
    removeProductButtoms[i].addEventListener("click", removeProduct)  
    }

    const quantityInputs = document.getElementsByClassName("product-qtd-input")
  for (var i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("change", checkIfInputIsNull)
  }

    const addToCartButtons = document.getElementsByClassName("button-houver-background")
        for (var i=0; i < addToCartButtons.length; i++){
            addToCartButtons[i].addEventListener("click", addProductToCart)
        }
}

function checkIfInputIsNull(event){
    if(event.target.value === "0"){
        event.target.parentElement.parentElement.remove()
    }


    updateTotal()    
}

//Adicionar Produto ao Carrinho
function addProductToCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("bebida-image")[0].src
    const productTitle = productInfos.getElementsByClassName("bebida-title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText

    const productsCartName = document.getElementsByClassName("cart-product-title")
    for (var i = 0; i < productsCartName.length; i++) {
        if (productsCartName [i].innerText === productTitle) {
            productsCartName [i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
            return

        }
    }

    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")

    newCartProduct.innerHTML = 
    `
        <td class="product-identification">
        <img class="cart-product-image" src="${productImage}" alt="${productTitle}">
        <strong class="cart-product-title">${productTitle}</strong>
    </td>
    <td>
        <span class="cart-product-price">${productPrice}</span>
    </td>
    <td>
        <input class="product-qtd-input" type="number" value="1" min="0">
        <button class="remove-product-buttom" type="button">Remover</button>
    </td>

    `

    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)

    updateTotal()
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
    newCartProduct.getElementsByClassName("remove-product-buttom")[0].addEventListener("click", removeProduct)
    }


//Remover Produto
function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    updateTotal()
  }

//Atualizar Preço do Carrinho
function updateTotal() {
let totalAmount = 0
const cartProducts = document.getElementsByClassName("cart-product")
for (var i = 0; i < cartProducts.length; i++) {
    const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".")
    const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value

    totalAmount +=  productPrice * productQuantity
    
}
totalAmount = totalAmount.toFixed(2)
totalAmount = totalAmount.replace(".", ",")
document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount
}