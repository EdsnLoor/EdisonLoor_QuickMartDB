const fs = require('fs');
const file = './db/cartData.json';
const inventory = './db/inventory.txt';
const checkout = './db/checkout.txt';

const saveDB=(data)=>{
    fs.writeFileSync (file, JSON.stringify(data));
}

const getInventory = ()=>{
    fs.readFile(inventory, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        fs.writeFile (file, data, (err)=>{
            if (err) throw err;
        });
    });

}

const clearReceipt =() =>{
    fs.writeFile (checkout, '', (err)=>{
        if (err) throw err;
    });
    let header = '=====================\n TRANSACTION RECEIPT \n =====================\n';
    fs.writeFileSync (checkout, header, (err)=>{
        if (err) throw err;
    });
}

const saveCart =(cart) =>{
    fs.appendFileSync(checkout, cart + '\n', function (err) {
        if (err) throw err;
    });
}

const readDB =()=>{
    if (!fs.existsSync(file)){
        return null;
    }
    const info = fs.readFileSync(file, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    return data;
}
module.exports={
    saveDB,
    readDB,
    saveCart,
    clearReceipt,
    getInventory
}