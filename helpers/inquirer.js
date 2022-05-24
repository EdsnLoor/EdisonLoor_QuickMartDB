const inquirer = require ('inquirer');
require ('colors');

const Menu=[
    {
        type: 'list',
        name: 'option',
        message: 'Welcome, customer',
        choices:[
            {
                value: '1',
                name: `${'1.'.underline.cyan} Add item to a cart`
            },
            {
                value: '2',
                name: `${'2.'.underline.cyan} Remove items`
            },
            {
                value: '3',
                name: `${'3.'.underline.cyan} View cart`
            },
            {
                value: '4',
                name: `${'4.'.underline.cyan} Checkout and print receipt`
            },

            {
                value: '0',
                name: `${'0.'.underline.cyan} Back to users Menu`
            }
        ]
    }
];

const inquirerMenu = async ()=>{

    console.clear();
    console.log('====================='.green);
    console.log('Select an option'.white);
    console.log('=====================\n'.green);

    const {option} = await inquirer.prompt(Menu);

    return option;
}

const pause = async ()=>{

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);
}

const confirm = async (message)=>{
    const  question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const showListCheckList = async (items =[])=>{

    const choices = items.map ((item,i)=>{
        const idx = `${i+1}.`.underline.cyan;
        return{
            value : item.id,
            name : `${idx} ${item.desc}`,
            price : `${idx} ${item.price}`,
            checked: (item.completadoEn)? true : false
        }
    });
    const pregunta = [
        {
            type : 'checkbox',
            name: 'ids',
            message: 'Selections',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}

module.exports={
    inquirerMenu,
    pause,
    confirm,
    showListCheckList
}