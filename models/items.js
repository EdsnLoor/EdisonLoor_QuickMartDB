const {saveCart, appendValue, clearReceipt} = require("../helpers/saveFiles");

class Items {
    _list= {};

    get listArr(){
        const itemsList =[];
        Object.keys(this._list).forEach(key=>{
            const list = this._list [key];
            itemsList.push(list)
        });
        return itemsList;
    }
    constructor(){
        this._list={};
    }

    getItemsFromArray (items=[]){
        items.forEach (item =>{
            this._list[item.id]=item;
        })
    }

    taxFunction (taxStatus, regularPrice, exemptArr, taxableArr){
        if (taxStatus === "Taxable"){
            taxableArr.push(regularPrice);
        } else if (taxStatus === "Exempt") {
            exemptArr.push(regularPrice)
        }
    }

    viewCart (regularUser){
        console.log();
        let cartArray = [];
        let totalArrayTaxable = [];
        let totalArrayExempt = [];
        let sumTaxes =0;
        let totalTaxable =0;
        let totalExempt = 0;
        let beforeTaxes = 0
        let contador = 0;
        this.listArr.forEach(item=>{
            const {desc, regularPrice, memberPrice, completadoEn, taxStatus}=item;
            if (regularUser && completadoEn){
                contador +=1;
                console.log  (`${(contador+'.').underline.cyan} ${desc}  ${'Price'.blue} ::  $${(regularPrice)}  ${'Transaction Date'.blue}  :: ${completadoEn.cyan}`)
                let cartRegularUser = `${(contador+'.')} ${desc}  ${'Price'} ::  $${(regularPrice)}  ${'Transaction Date'}  :: ${completadoEn}`
                this.taxFunction(taxStatus, regularPrice, totalArrayExempt, totalArrayTaxable);
                saveCart(cartRegularUser);
            } else if (!regularUser && completadoEn) {
                contador +=1;
                let cartMemberUser = `${(contador+'.')} ${desc}  ${'Price'} ::  $${(memberPrice)}  ${'Transaction Date'}  :: ${completadoEn}`
                console.log (`${(contador+'.').underline.cyan} ${desc}  ${'Price'.blue} ::  $${(memberPrice)}  ${'Transaction Date'.blue}  :: ${completadoEn.cyan}`)
                this.taxFunction(taxStatus, memberPrice, totalArrayExempt, totalArrayTaxable);
                saveCart(cartMemberUser);
            }
        });
        totalArrayTaxable.forEach(Price =>{
            beforeTaxes += Price
            sumTaxes += Price*0.06
            totalTaxable+= Price*1.06;
        });
        totalArrayExempt.forEach(Price =>{
            totalExempt+= Price;
        });
        console.log(`${'SUB-TOTAL'.blue} ::  $${((beforeTaxes+totalExempt).toFixed(2))}`)
        saveCart('SUB-TOTAL :$'+(beforeTaxes+totalExempt).toFixed(2));
        console.log(`${'TAX (6,5%)'.blue} ::  $${((sumTaxes).toFixed(2))}`)
        saveCart('TAX (6,5%) :$'+sumTaxes.toFixed(2));
        console.log(`${'TOTAL CHECKOUT'.blue} ::  $${((totalTaxable+totalExempt).toFixed(2))}`)
        saveCart('TOTAL CHECKOUT :$'+(totalTaxable+totalExempt).toFixed(2));
        console.log()
    }

    printReceipt(){
        clearReceipt()
        this.viewCart();
    }

    toggleCompletadas (ids=[]){

        ids.forEach(id=>{
            const item = this._list[id];
            if (!item.completadoEn){
                item.completadoEn= new Date().toISOString();
            }
        });

        this.listArr.forEach(item =>{
            if (!ids.includes(item.id )){
                this._list[item.id].completadoEn=null;
            }
        });
    }
}
module.exports= Items;

