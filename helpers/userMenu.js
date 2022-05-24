const inquirer = require("inquirer");

const Users=[
    {
        type: 'list',
        name: 'option',
        message: 'Rewards Member or Regular customer?',
        choices:[
            {
                value: '1',
                name: `${'1.'.underline.cyan} Rewards Member`
            },
            {
                value: '2',
                name: `${'2.'.underline.cyan} Regular customer`
            },
            {
                value: '0',
                name: `${'0.'.underline.cyan} Salir`
            }
        ]
    }
];

const userMenu = async ()=>{

    console.clear();
    console.log('====================='.green);
    console.log('Select an option'.white);
    console.log('=====================\n'.green);

    const {option} = await inquirer.prompt(Users);

    return option;
}

module.exports={
    userMenu
}