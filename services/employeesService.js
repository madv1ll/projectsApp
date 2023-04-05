// const API = 'https://api-proyectsapp.onrender.com';
const API = 'http://10.0.2.2:4000'

export const getEmployees = async (id) => {
    const res = await fetch(`${API}/employees/${id}`);
    return await res.json();
};

export const getEmployee = async (id) => {
    const res = await fetch(`${API}/employees/desc/${id}`);
    return await res.json();
};

export const addEmployee = async (employee) => {
    await fetch(`${API}/employees`, {
        method: 'POST',
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    });
};

export const updateEmployee = async (employee) => {
    await fetch(`${API}/employees/${employee.id}`, {
        method: 'PUT',
        headers: { accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    });
};

export const deleteEmployee = async (id) => {
    await fetch(`${API}/employees/${id}`, {
        method: 'DELETE',
    });
};