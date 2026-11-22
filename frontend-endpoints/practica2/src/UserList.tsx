import { useEffect, useState } from "react";

interface User {
    id: number
    name: string
}

interface UserDetail {
    id: number
    name: string
    email: string
    age: number
    country: { id: number; name: string }
    roles: { id: number; name: string }[]
}

export function UserList({ token }: { token: string }) {
    const [users, setUsers] = useState<User[]>([])
    const [error, setError] = useState<string | null>(null)
    const [me, setMe] = useState<User | null>(null)
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [detail, setDetail] = useState<UserDetail | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function cargarLista() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                const data = await response.json()
                if (!response.ok) {
                    setError(typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail))
                    return
                }
                setUsers(data)
            } finally {
                setLoading(false)
            }
        }

        cargarLista()
    }, [token])

    useEffect(() => {
        const headers = { Authorization: `Bearer ${token}` }
        const api = import.meta.env.VITE_API_URL

        fetch(`${api}/user/me/id`, { headers })
            .then((response) => response.json())
            .then(({ id }) => fetch(`${api}/user/${id}`, { headers }))
            .then((response) => response.json())
            .then(setMe)
    }, [token])

    useEffect(() => {
        if (selectedId === null) return

        fetch(`${import.meta.env.VITE_API_URL}/user/${selectedId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then(setDetail)
    }, [selectedId, token])

    if (error) return <p>{error}</p>
    if (loading) return <p>Cargando...</p>

    return (
        <>
            <h1>Hola, {me?.name}</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id} onClick={() => setSelectedId(user.id)}>
                        {user.name}
                    </li>
                ))}
            </ul>

            {detail && (
                <div>
                    <p>Email: {detail.email}</p>
                    <p>Edad: {detail.age}</p>
                    <p>País: {detail.country.name}</p>
                    <p>Roles: {detail.roles.map((rol) => rol.name).join(', ')}</p>
                </div>
            )}

        </>
    )
}