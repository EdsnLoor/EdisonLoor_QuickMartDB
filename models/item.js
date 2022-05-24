class Item {
    id= '';
    desc='';
    quantity = '';
    regularPrice='' ;
    memberPrice= '';
    taxStatus='';
    completadoEn = null;

    constructor (){
        this.desc = '';
        this.quantity = '' ;
        this.regularPrice= '';
        this.memberPrice= '';
        this.taxStatus='';
    }
}
module.exports = Item;
