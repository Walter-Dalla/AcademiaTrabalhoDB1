var repository = require('../repository/genericRepository');

async function selectAll(table) {
    return repository.selectAll(table);
}

async function describeTable(table) {
    const describeTables = await repository.describeTable(table);
    const fields = describeTables.map(dt => dt.Field);

    return fields;
}

async function insert(table, obj) {

    var errorDictionary = {
        1064: 'Digite todos os campos',
        1265: 'Digite todos os campos',
        1292: 'Digite os campos no formato correto',
        1452: 'Não existe PK na tabela externa',
        1062: 'Já existe um registro com este Id'
    }
    var error = await repository.insert(table, obj);
    
    if(!error){
        return;
    }

    errorMessage = errorDictionary[error.errno] || error.message;
    console.log(errorMessage)

    return errorMessage;
}

function deleteTupla(table, obj) {
    return repository.deleteTupla(table, obj);
}

module.exports = {
    selectAll,
    describeTable,
    insert,
    deleteTupla
}