const fs = require("fs");
const readAllTask = () => {
    const buffer = fs.readFileSync("app/task.json"); //hex
    //chuyen sang string 
    const taskString = buffer.toString();
    //chuyen sang chuoi Json
    const taskJson = JSON.parse(taskString);

    return taskJson;
    // console.log(taskJson);
    // console.log('read-all');
}

//create
const createTask = (title, description) => {
    const newTask = {
        id: Math.random().toString(),
        title,
        description,
    };
    let taskList = readAllTask();
    //taskList.push(newTask);
    taskList = [...taskList, newTask];
    fs.writeFileSync("app/task.json", JSON.stringify(taskList));
    return newTask;
}

//read-detail
const readDetailTask = (id) => {
    const taskList = readAllTask();
    const task = taskList.find((task) => id === task.id);
    return task;
}

//update task 
const updateTask = (id, title, description) => {
    let taskList = readAllTask();
    const index = taskList.findIndex(task => id === task.id);
    if (index != -1) {
        // thuc hien update
        const oldTask = taskList[index];
        const newTask = {...oldTask, title, description };
        taskList[index] = newTask;
        fs.writeFileSync("app/task.json", JSON.stringify(taskList));
        return newTask;
    } else {
        //thong bao nguoi dung
        return false;
    }
};

//delete task
const deleteTask = (id) => {
    let taskList = readAllTask();
    const index = taskList.findIndex((task) => task.id = id);
    if (index !== -1) {
        const task = taskList[index];
        taskList = taskList.filter((task) => task.id !== id);
        fs.writeFileSync("app/task.json", JSON.stringify(taskList));
        return task;
    } else {
        return false;
    }
}

module.exports = {
    readAllTask,
    createTask,
    readDetailTask,
    updateTask,
    deleteTask,
}