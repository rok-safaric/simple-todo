let todoList = {
    todos: [],
    addTodo: function(todoText){
        this.todos.push({
            todoText: todoText, 
            completed: false
        });
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position){
        let todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function(){
        let totalTodos = this.todos.length;
        let completedTodos = 0;

        this.todos.forEach(function(todo){
            if(todo.completed === true) {
                completedTodos++;
            }
        });
        
        this.todos.forEach(function(todo){
            if(completedTodos === totalTodos){
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        });

    }
}

let handlers = {
    addTodo: function(e){
        console.log(e);
        let addTodoTextInput = document.getElementById('addTodoTextInput');
        if(event.keyCode === 13 && addTodoTextInput.value !== '' ){
            todoList.addTodo(addTodoTextInput.value);
            addTodoTextInput.value = '';
            view.displayTodos();
        }
    },
    changeTodo: function(todoId){
        console.log(todoList.todos[todoId].todoText);
    },
    deleteTodo: function(position){
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function(position){
        todoList.toggleCompleted(position);
        view.displayTodos();
    },
    toggleAll: function(){
        todoList.toggleAll();
        view.displayTodos();
    }
};

let view = {
    displayTodos: function(){
        let todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
        todoList.todos.forEach(function(todo, position){
            let todoLi = document.createElement('li');
            todoLi.className = 'todoText'
            let todoTextWithCompletion = '';
            todoTextWithCompletion =  todo.todoText;
            
            todoLi.id = position;
            todoLi.textContent = todoTextWithCompletion;
            if (todo.completed === true){
                todoLi.className = 'taskCompleted';
            }
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        }, this);
        
    },
    createDeleteButton: function() {
        let deleteButton = document.createElement('i');
        deleteButton.className = 'fa fa-times';
        return deleteButton;
    },
    setUpEventListeners: function(){
        let todosUl = document.querySelector('ul'); 
        todosUl.addEventListener('click', function(event){ 
            let elementClicked = event.target;

            if (elementClicked.className === 'fa fa-times') {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }

            if (elementClicked.className === 'todoText') {
                handlers.toggleCompleted(parseInt(elementClicked.id));
            }
        });
    }
};
view.setUpEventListeners();


