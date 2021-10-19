//import yargs from "yargs"; //es6
const yargs = require("yargs"); //es5(common js)
const fs = require("fs"); //
const { readAllTask, createTask, readDetailTask, updateTask, deleteTask } = require("./model/task");
const chalk = require('chalk');

// tao leenh test
yargs.command({
    command: "test",
    handler: () => {
        console.log('test');
    }
});

//CRUD

//create node - node app/index.js create --title="Hoc nodejs" --description=" khong kho";
yargs.command({
    command: "create",
    builder: {
        title: {
            type: "string",
        },
        description: {
            type: "string",
        }
    },
    handler: (args) => {
        const { title, description } = args;
        const newTask = createTask(title, description);
        console.log("Da tao moi cong viec thanh cong");
    }
})

//read-all - node app/index.js read-all
yargs.command({
    command: "read-all",
    handler: () => {
        const result = readAllTask();
        console.log(chalk.blue("task:"), result);
    }
})

//read-detail - node app/index.js read-detail
yargs.command({
    command: "read-detail",
    builder: {
        id: {
            type: "string",
        }
    },
    handler: (args) => {
        const { id } = args;
        const task = readDetailTask(id);
        if (task) {
            console.log("task :", task);
        } else {
            console.log("not found");
        }
    }
})

//update - node app/index.js update
yargs.command({
    command: "update",
    builder: {
        id: {
            type: "string",
        },
        title: {
            type: "string",
        },
        description: {
            type: "string",
        }
    },
    handler: (args) => {
        const { id, title, description } = args;
        const task = updateTask(id, title, description);
        if (task) {
            console.log("task cap nhat thanh cong");
        } else {
            console.log("not found");
        }
    }
})

//delete - node app/index.js delete
yargs.command({
    command: "delete",
    builder: {
        id: {
            type: "string",
        }
    },
    handler: (args) => {
        const { id } = args;
        const task = deleteTask(id);
        console.log(task);
        if (task) {
            console.log("delete task:", task);
        } else {
            console.log("not found");
        }
    }
})

//luu lai lenh
yargs.parse();