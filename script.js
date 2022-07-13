let transactions = document.getElementById("transactions")
let refIncome = document.getElementById("income")
let refExpense = document.getElementById("expense")
let refBalance = document.getElementById("balance")
let form = document.getElementById("form")
let transactionText = document.getElementById("transaction-text")
let transactionValue = document.getElementById("transaction-value")

let listTransations = []

let delTransaction = id =>{
    listTransations = listTransations.filter(transaction => transaction.id !== id)
    showBalance()
}

let addTransaction = transaction =>{
    let op = transaction.val < 0 ? '-' : '+'
    let addClass = transaction.val < 0 ? 'minus' : 'plus'
    let list = document.createElement('li')
    let onlyVal = Math.abs(transaction.val)

    list.classList.add(addClass)
    list.innerHTML = `
    ${transaction.name} <span>R$ ${op}${onlyVal}</span>
    <button class="delete" onClick="delTransaction(${transaction.id})">x</button>
    `
    transactions.append(list)
}

let localStorageTransaction = JSON.parse(localStorage.getItem('transactions'))

let showBalance = () =>{
    //map: coleta somente o atributo do objeto
    let sumBalance = listTransations.map(transaction => transaction.val)
    //reduce: soma todos os valores
    let total = sumBalance.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
    //filter: apresenta os valores de acordo a condição
    let income = sumBalance.filter(value => value > 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2)
    let expense = Math.abs(sumBalance.filter(value => value < 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2))

    refBalance.textContent = `R$ ${total}`
    refExpense.textContent = `R$ ${expense}`
    refIncome.textContent = `R$ ${income}`

}

let showTransactions = () =>{
    //limpa a lista para não recarregar todas as transações a cada nova adição
    transactions.innerHTML = ''
    listTransations.forEach(addTransaction)
    showBalance()
}

showTransactions()

let createRandomId =()=> Math.round(Math.random()*1000)

form.addEventListener('submit', event=> {
    //Previne o envio do formulario
    event.preventDefault()

    //trim: remove espaços em branco no inicio e fim de um texto
    if (transactionText.value.trim()=== '' || transactionValue.value.trim()===''){
        alert("Digite o nome e o valor da transação!!!")
        return
    }

    let transaction = {
        id: createRandomId(),
        name: transactionText.value,
        val: Number(transactionValue.value)
    }
    listTransations.push(transaction)
    showTransactions()

    transactionText.value = ''
    transactionValue.value = ''
})
