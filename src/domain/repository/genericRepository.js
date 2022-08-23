var { query } = require('../../database/index');

async function selectAll(table) {
    const sql = 'SELECT * FROM ' + table;
    return await query(sql);
}

async function describeTable(table) {
    const sql = 'describe ' + table;
    return await query(sql);
}

async function insert(table, obj) {
    const keys = Object.keys(obj);
    const values = Object.values(obj).map(v => `'${v}'`);

    const sqlInsert = `insert into ${table}(${keys.join(',')}) values(${values.join(',')})`;
    const promisse = query(sqlInsert);
    error = await handleError(promisse);

    if(error && error.errno === 1062){

        var setStr = '';
        keys.forEach(key => {
            if(setStr !== ''){
                setStr += ','
            }
            setStr += `${key} = '${obj[key]}'`
        });

        var describe = await describeTable(table)
        var pks = describe.filter(dt => dt.Key === 'PRI');
        
        var pksStr = pks.map(pk => `${pk.Field} = '${obj[pk.Field]}'`).join(' and ');
        const sqlInsert = `UPDATE ${table} SET ${setStr} WHERE ${pksStr}`;
        

        console.log(sqlInsert);

        const promisse = query(sqlInsert);
        error = await handleError(promisse);
    }
    console.log(error)
    return error;
}

async function deleteTupla(table, obj) {
    const keys = Object.keys(obj);
    const values = Object.values(obj).map(v => `'${v}'`);

    var describe = await describeTable(table)
    var pks = describe.filter(dt => dt.Key === 'PRI');
    
    var pksStr = pks.map(pk => `${pk.Field} = '${obj[pk.Field]}'`).join(' and ');

    const sqlDelete = `delete from ${table} where ${pksStr}`;
    
    return query(sqlDelete);
}

async function handleError(promisse){
    error = null
    promisse.catch(err => {
        error = err
    });
    try {
        await promisse;
    } catch (err) {
        error = err
    }
    return error;
}

module.exports = {
    selectAll,
    describeTable,
    insert,
    deleteTupla
}