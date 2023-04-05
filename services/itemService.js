// const API = 'https://api-proyectsapp.onrender.com';
const API = 'http://10.0.2.2:4000'

export const getProyectItems = async (id) => {
    const res = await fetch(`${API}/items/${id}`);
    return await res.json();
};

export const getItem = async (id) => {
    const res = await fetch(`${API}/items/desc/${id}`);
    return await res.json();
};

export const addItem = async (item) => {
    await fetch(`${API}/items`, {
        method: 'POST',
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });
};
export const updateItem = async (id,item) => {
    await fetch(`${API}/items/${id}`, {
        method: 'PUT',
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });
};

export const deleteItem = async (id) => {
    await fetch(`${API}/items/${id}`, {
        method: 'DELETE',
    });
};