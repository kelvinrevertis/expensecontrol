let transactions = document.getElementById("transactions")
let refIncome = document.getElementById("income")
let refExpense = document.getElementById("expense")
let refBalance = document.getElementById("balance")
let form = document.getElementById("form")
let transactionText = document.getElementById("transaction-text")
let transactionValue = document.getElementById("transaction-value")

const localStorageTransactions = JSON.parse(localStorage.getItem('saveTransactions'))
let saveTransactions = localStorage.getItem('saveTransactions')!== null ? localStorageTransactions : []

let delTransaction = ID =>{
    saveTransactions = saveTransactions.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    showTransactions()
}

let addTransaction = transaction =>{
    let op = transaction.val < 0 ? '-' : '+'
    let addClass = transaction.val < 0 ? 'minus' : 'plus'
    let onlyVal = Math.abs(transaction.val).toFixed(2)
    let list = document.createElement('li')

    list.classList.add(addClass)
    list.innerHTML = `
    ${transaction.name} <span>R$${op}${onlyVal}</span>
    <button class="delete" onClick="delTransaction(${transaction.id})">x</button>
    `
    transactions.append(list)
}

let showBalance = () =>{
    //map: coleta somente o atributo do objeto
    let sumBalance = saveTransactions.map(transaction => transaction.val)
    //reduce: soma todos os valores
    let total = sumBalance.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
    //filter: apresenta os valores de acordo a condição
    let income = sumBalance.filter(value => value > 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2)
    let expense = Math.abs(sumBalance.filter(value => value < 0).reduce((accumulator, value) => accumulator + value, 0)).toFixed(2)

    refBalance.textContent = `R$ ${total}`
    refExpense.textContent = `R$ ${expense}`
    refIncome.textContent = `R$ ${income}`
}

let showTransactions = () =>{
    //limpa a lista para não recarregar todas as transações a cada nova adição
    transactions.innerHTML = ''
    saveTransactions.forEach(addTransaction)
    showBalance()
}

showTransactions()

const updateLocalStorage = () =>{
    localStorage.setItem('saveTransactions', JSON.stringify(saveTransactions))
}

const createRandomId =()=> Math.round(Math.random()*1000)


form.addEventListener('submit', event=> {
    //Previne o envio do formulario
    event.preventDefault()
    

    //trim: remove espaços em branco no inicio e fim de um texto
    if (transactionText.value.trim()=== '' || transactionValue.value.trim()===''){
        alert("Digite o nome e o valor da transação!!!")
        return
    }

    const transaction = {
        id: createRandomId(),
        name: transactionText.value,
        val: Number(transactionValue.value)
    }
    saveTransactions.push(transaction)
    showTransactions()
    updateLocalStorage()

    transactionText.value = ''
    transactionValue.value = ''
})
