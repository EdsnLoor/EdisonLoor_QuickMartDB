require ('colors');
const { saveDB, readDB, printReceipt, getInventory} = require('./helpers/saveFiles');
const   {   inquirerMenu,
            pause,
            showListCheckList,
            confirm
            } = require('./helpers/inquirer');
const {userMenu} = require("./helpers/userMenu");
const Items = require('./models/items');

const main= async()=>{
    do {
        opt = await userMenu();
        switch (opt) {
            case '1':
                await mainMenu(false);
                break;

            case '2':
                await mainMenu(true);
                break;
        }
    } while (opt !== '0');
}

const mainMenu= async(regularUser)=>{
    let opt = '';
    const items = new Items();
    const itemsDB= readDB();

    if (itemsDB){
        items.getItemsFromArray (itemsDB);
        getInventory();
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1': //completado
                const ids = await showListCheckList (items.listArr);
                items.toggleCompletadas(ids);
                break;
            case '2':
                const idsCart = await showListCheckList (items.listArr);
                items.toggleCompletadas(idsCart);
            break;
            case '3':
                items.viewCart(regularUser);
            break;
            case '4':
                items.viewCart(regularUser);
                const ok = await confirm ('Proceed to checkout?')
                if (ok){
                    items.printReceipt();
                    console.log ('Receipt printed');
                }
                break;
        }
        saveDB(items.listArr);
        await pause ();
    } while (opt !== '0');
}
main();