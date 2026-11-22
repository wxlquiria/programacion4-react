import { useEffect, useState } from "react";
import type { SubmitEvent } from 'react';

interface User {
    id: number
    name: string
    roles?: { id: number; name: string }[]
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

    const formInicial = { name: '', age: '', email: '', password: '', country_id: '1' }
    const [form, setForm] = useState(formInicial)
    const [formMessage, setFormMessage] = useState<string | null>(null)

    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [detail, setDetail] = useState<UserDetail | null>(null)

    const [soloMayores, setSoloMayores] = useState(false)

    const [deleteMessage, setDeleteMessage] = useState<string | null>(null)

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
            const r1 = await fetch(`${api}/user/me/id`, { headers })   
            if (!r1.ok) return
            const { id } = await r1.json()

            const r2 = await fetch(`${api}/user/${id}`, { headers })   
            if (!r2.ok) return
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
        setSoloMayores(false)
        cargarUsuarios('/user')
    }

    function alternar() {
        const nuevo = !soloMayores
        setSoloMayores(nuevo)
        setSearch('')
        cargarUsuarios(nuevo ? '/user_mayores' : '/user')
    }

    function cambiar(campo: string, valor: string) {
        setForm({ ...form, [campo]: valor })
    }

    async function crearUsuario(event: SubmitEvent) {
        event.preventDefault()
        setFormMessage(null)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: form.name,
                    age: Number(form.age),
                    email: form.email,
                    password: form.password,
                    country_id: Number(form.country_id),
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                setFormMessage(typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail))
                return
            }

            setForm(formInicial)
            cargarUsuarios('/user')
        } catch (err) {
            console.log('falló el pedido', err)
            setFormMessage('No se pudo crear el usuario (el servidor falló o no respondió)')
        }
    }

    async function borrar(id: number) {
        if (!window.confirm('Este usuario será eliminado ¿Desea continuar?')) return
        setDeleteMessage(null)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            })

            if (!response.ok) {
                const texto = await response.text()
                let detail = `Error ${response.status}`
                try {
                    const data = JSON.parse(texto)
                    if (data.detail) {
                        detail = typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail)
                    }
                } catch {
                    // la respuesta no era JSON
                }
                setDeleteMessage(detail)
                return
            }

            setUsers(users.filter((user) => user.id !== id))
            if (selectedId === id) {
                setSelectedId(null)
                setDetail(null)
            }
        } catch {
            setDeleteMessage('No se pudo borrar el usuario')
        }
    }

    if (loading) return <p>Cargando...</p>

    return (
        <>
            <h1>
                Hola, {me?.name}{' '}
                {me?.roles && me.roles.length > 0 && `(${me.roles.map((rol) => rol.name.toUpperCase()).join(', ')})`}
            </h1>

            <form onSubmit={crearUsuario}>
                <h2>Nuevo usuario</h2>
                <input placeholder="Nombre" value={form.name}
                    onChange={(e) => cambiar('name', e.target.value)} required />
                <input type="number" placeholder="Edad" value={form.age}
                    onChange={(e) => cambiar('age', e.target.value)} required />
                <input type="email" placeholder="Email" value={form.email}
                    onChange={(e) => cambiar('email', e.target.value)} required />
                <input type="password" placeholder="Contraseña" minLength={4} value={form.password}
                    onChange={(e) => cambiar('password', e.target.value)} required />
                <select value={form.country_id}
                    onChange={(e) => cambiar('country_id', e.target.value)}>
                    <option value="1">Argentina</option>
                    <option value="2">Brasil</option>
                </select>
                <button type="submit">Crear</button>
                {formMessage && <p>{formMessage}</p>}
            </form>

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre"
            />
            <button onClick={buscar}>Buscar</button>
            <button onClick={limpiar}>Limpiar</button>
            <button onClick={alternar}>
                {soloMayores ? 'Todos' : 'Solo mayores'}
            </button>

            {error && <p>{error}</p>}
            {deleteMessage && <p>{deleteMessage}</p>}

            <ul>
                {users.map((user) => (
                    <li key={user.id} onClick={() => setSelectedId(user.id)}>
                        {user.name}
                        <button
                            onClick={(e) => {e.stopPropagation() 
                            borrar(user.id)}}>
                            Borrar
                        </button>
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