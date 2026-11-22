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
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [detail, setDetail] = useState<UserDetail | null>(null)

    async function cargarUsuarios(path: string) {
        setError(null)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await response.json()
            if (!response.ok) {
                setError(typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail))
                setUsers([])
                return
            }
            setUsers(data)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        cargarUsuarios('/user')
    }, [token])

    useEffect(() => {
        const headers = { Authorization: `Bearer ${token}` }
        const api = import.meta.env.VITE_API_URL

        async function cargarMe() {
            const r1 = await fetch(`${api}/user/me/id`, { headers })   // se sacaron los .then  
            if (!r1.ok) return
            const { id } = await r1.json()

            const r2 = await fetch(`${api}/user/${id}`, { headers })   
            setMe(await r2.json())
        }

        cargarMe()
    }, [token])

    useEffect(() => {
        if (selectedId === null) return

        async function cargarDetalle() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${selectedId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!response.ok) return
            setDetail(await response.json())
        }

        cargarDetalle()
    }, [selectedId, token])

    function buscar() {
        if (!search.trim()) return
        cargarUsuarios(`/user/search/${encodeURIComponent(search)}`)
    }

    function limpiar() {
        setSearch('')
        cargarUsuarios('/user')
    }

    if (loading) return <p>Cargando...</p>

    return (
        <>
            <h1>
                Hola, {me?.name}
            </h1>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre"
            />
            <button onClick={buscar}>Buscar</button>
            <button onClick={limpiar}>Limpiar</button>
            
            {error && <p>{error}</p>}

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