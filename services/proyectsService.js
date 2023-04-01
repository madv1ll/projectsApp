const API = 'https://api-proyectsapp.onrender.com';

export const getProyects = async () => {
    const res = await fetch(`${API}/proyects`);
    return await res.json();
};

export const getProyect = async (id) => {
    const res = await fetch(`${API}/proyects/${id}`);
    return await res.json();
};

export const saveProyect = async (newProyect) => {
    const res = await fetch(`${API}/proyects`, {
        method: 'POST',
        body: JSON.stringify(newProyect),
        headers: { accept: 'application/json', 'Content-Type': 'application/json' }
    })
    return await res
};

export const deleteProyect = async (id) => {
    await fetch(`${API}/proyects/${id}`, {
        method: 'DELETE',
    })
};

export const updateProyect = async (id, newProyect) => {
    const res = await fetch(`${API}/proyects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newProyect),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
    })
    return await res;
};