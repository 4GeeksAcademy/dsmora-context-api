const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			tasks: [],
		},
		actions: {
			loadSomeData: () => {
				fetch('https://playground.4geeks.com/todo/users/dsmora')
					.then(resp => resp.json())
					.then(respJson => {
						const store = getStore();
						const tasks = store.tasks;
						const newTasksFromUser = respJson.todos;
						const newTasks = [...tasks, ...newTasksFromUser];
						setStore({ tasks: newTasks });
						console.log(store);
					})
			},
			addTask: (task) => {
				const store = getStore();
				const tasks = store.tasks;
				fetch('https://playground.4geeks.com/todo/todos/dsmora', {
					method: 'POST',
					body: JSON.stringify({
						label: task,
						is_done: false
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(resp => resp.json())
					.then(respJson => {
						const newTasks = [...tasks, respJson];
						setStore({ tasks: newTasks })
					})
			},
			deleteTask: (id) => {
				const store = getStore();
				const tasks = store.tasks;

				fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
					method: 'DELETE'
				})
					.then(resp => { if (resp.ok) { resp.json() } })
					.then(() => {
						const newTasks = tasks.filter(item => item.id !== id);
						setStore({ tasks: newTasks })
					})
			}
		}
	};
};

export default getState;
