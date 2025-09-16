import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import { db } from '../../firebase/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import './Dashboard.css';

const Dashboard = () => {
    const { currentUser, userLoggedIn, loading } = useAuth();
    const [todos, setTodos] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingTodoTitle, setEditingTodoTitle] = useState('');
    const navigate = useNavigate();

    // Fetch user-specific todos when the user's login state changes
    useEffect(() => {
        if (userLoggedIn && currentUser) {
            fetchTodos(currentUser.uid);
        }
    }, [userLoggedIn, currentUser]);

    const fetchTodos = async (uid) => {
        try {
            const q = query(collection(db, "todos"), where("userId", "==", uid));
            const querySnapshot = await getDocs(q);
            const todosData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTodos(todosData);
        } catch (error) {
            console.error("Error fetching todos: ", error);
        }
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (newTodoTitle.trim() === '' || !currentUser) return;

        const newTodo = {
            title: newTodoTitle,
            completed: false,
            userId: currentUser.uid,
            createdAt: new Date()
        };
        try {
            await addDoc(collection(db, "todos"), newTodo);
            setNewTodoTitle('');
            await fetchTodos(currentUser.uid);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteDoc(doc(db, "todos", id));
            await fetchTodos(currentUser.uid);
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const handleToggleComplete = async (id, currentStatus) => {
        try {
            const todoRef = doc(db, "todos", id);
            await updateDoc(todoRef, {
                completed: !currentStatus
            });
            await fetchTodos(currentUser.uid);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const handleEditTodo = async (id, newTitle) => {
        if (newTitle.trim() === '') return;
        try {
            const todoRef = doc(db, "todos", id);
            await updateDoc(todoRef, {
                title: newTitle
            });
            setEditingTodoId(null);
            setEditingTodoTitle('');
            await fetchTodos(currentUser.uid);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const handleStartEdit = (todo) => {
        setEditingTodoId(todo.id);
        setEditingTodoTitle(todo.title);
    };

    const handleLogout = async () => {
        try {
            await doSignOut();
            // localStorage.removeItem('userLoggedIn'); // This is now handled by the authContext
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="todo-dashboard">
            <div className="header">
                <h1 className="dashboard-title">Todo Dashboard</h1>
                <button onClick={handleLogout} className="logout-button">Log Out</button>
            </div>

            <form onSubmit={handleAddTodo} className="add-todo-form">
                <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    placeholder="Add a new todo..."
                    className="add-todo-input"
                />
                <button type="submit" className="add-todo-button">Add</button>
            </form>

            <ul className="todo-list">
                {todos.length === 0 ? (
                    <p className="empty-message">Your to-do list is empty. Add a new task above!</p>
                ) : (
                    todos.map(todo => (
                        <li
                            key={todo.id}
                            className={`todo-item ${todo.completed ? 'completed' : 'incomplete'}`}
                        >
                            {editingTodoId === todo.id ? (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleEditTodo(todo.id, editingTodoTitle);
                                }} className="edit-form">
                                    <input
                                        type="text"
                                        value={editingTodoTitle}
                                        onChange={(e) => setEditingTodoTitle(e.target.value)}
                                        className="edit-input"
                                    />
                                    <button type="submit" className="save-button">Save</button>
                                    <button
                                        type="button"
                                        onClick={() => setEditingTodoId(null)}
                                        className="cancel-button"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <span className="todo-title">{todo.title}</span>
                                    <div className="todo-actions">
                                        <button onClick={() => handleToggleComplete(todo.id, todo.completed)} className="complete-button">
                                            {todo.completed ? 'Incomplete' : 'Complete'}
                                        </button>
                                        <button onClick={() => handleStartEdit(todo)} className="edit-button">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteTodo(todo.id)} className="delete-button">
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Dashboard;