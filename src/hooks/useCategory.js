import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function useCategory() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null); // 👈🏽 Novo estado
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function getCategories() {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:4000/api/categories');
            setCategories(response.data);
        } catch (err) {
            setError(err);
            const msg = err?.response?.data?.message || err.message || "Erro inesperado";
            toast.error(`Erro: ${msg}`);
        } finally {
            setLoading(false);
        }
    }

    async function getCategory(id) {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/api/category/${id}`);
            setCategory(response.data); // 👈🏽 Salva a categoria no estado
            return response.data;
        } catch (err) {
            setError(err);
            const msg = err?.response?.data?.message || err.message || "Erro inesperado";
            toast.error(`Erro: ${msg}`);
        } finally {
            setLoading(false);
        }
    }

    async function createCategory(data) {
        setLoading(true);
        try {
            const req = axios.post('http://localhost:4000/api/category/new', data);

            toast.promise(req, {
                loading: "Criando categoria...",
                success: "Categoria criada com sucesso!",
                error: (err) => {
                    const msg = err?.response?.data?.message || err.message || "Erro inesperado";
                    return `Erro: ${msg}`;
                },
            });

            await req;
            navigate('/admin/categories');
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    async function updateCategory(id, data) {
        setLoading(true);
        try {
            const req = axios.put(`http://localhost:4000/api/category/update/${id}`, data);

            toast.promise(req, {
                loading: "Atualizando categoria...",
                success: "Categoria atualizada com sucesso!",
                error: (err) => {
                    const msg = err?.response?.data?.message || err.message || "Erro inesperado";
                    return `Erro: ${msg}`;
                },
            });

            await req;
            navigate('/admin/categories');
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    async function deleteCategory(id) {
        setLoading(true);
        try {
            const req = axios.delete(`http://localhost:4000/api/category/delete/${id}`);

            toast.promise(req, {
                loading: "Removendo categoria...",
                success: "Categoria deletada com sucesso!",
                error: (err) => {
                    const msg = err?.response?.data?.message || err.message || "Erro inesperado";
                    return `Erro: ${msg}`;
                },
            });

            await req;
            getCategories();
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return {
        categories,
        category,        // 👈🏽 exporta category
        loading,
        error,
        getCategories,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory
    };
}
