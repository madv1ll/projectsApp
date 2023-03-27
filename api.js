const API = 'https://api-proyectsapp.onrender.com/proyects';

export const getProyects = async () => {
    const res = await fetch(API);
    return await res.json();
};

export const getProyect = async (id) => {
    const res = await fetch(`${API}/${id}`);
    return await res.json();
}

export const saveProyect = async (newProyect) => {
    const res = await fetch(API, {
        method: 'POST',
        body: JSON.stringify(newProyect),
        headers: { accept: 'application/json', 'Content-Type': 'application/json' }
    })
    return await res
};

export const deleteProyect = async (id) => {
    await fetch(`${API}/${id}`, {
        method: 'DELETE',
    })
};

export const updateProyect = async (id, newProyect) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newProyect),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
    })
    return await res;
}