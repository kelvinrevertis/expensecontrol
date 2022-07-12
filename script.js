let testTransations = [
    {id: 1, name:'Salario', val: 1300},
    {id: 2, name:'Aluguel', val: -330},
    {id: 3, name:'Luz', val: -100},
    {id: 4, name:'Agua', val: -80},

]

let addTranslation = transaction =>{
    const op = transaction.val < 0 ? '-' : '+'
}