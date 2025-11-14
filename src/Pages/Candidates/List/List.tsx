import { useEffect, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { candidateApi } from "../../../api/candidates/crud";
import { tr } from "zod/locales";
import "../../../App.css"
import type { Candidate } from "../../../data/models/candidate";


export default function List() {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [candidates, setCandidates] = useState<Array<Candidate>>([]);

    const navigate = useNavigate();



    const fetchCandidates = async () => {
    try {
        const data = await candidateApi.getAll();
        console.log("Candidats récupérés :", data);
        setCandidates(data);
    } catch (error) {
       console.log(`error: ${error}`)
    } finally {
       setIsLoading(false)
    }
    }


    const handleDestroyCandidate = async (id: number) => {
        try {
            await candidateApi.destroy(id);
            fetchCandidates()
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }

    const handleEditCandidate = async (id: number) => {
        navigate(`/candidates/${id}/edit`)
    }

    const handleShowCandidate = async (id: number) => {
        navigate(`/candidates/${id}/show`)
    }


        
    
    
    useEffect(() => {

        fetchCandidates()
    }, [])

  return (
    <div>
        <h1 style={{color: "#070ffaff"}}>Liste des candidat(e)s</h1>
        <Link to="/candidates/create">Crée un(e) candidat(e)</Link><br /><br /><br />

        {
            isLoading ? 
            <Loader/> :
            <table>
                <thead>
                    <tr>
                        <th>
                            Nom(s)
                        </th>
                        <th>
                            description(s)
                        </th>
                       
                        <th>
                            Photo
                        </th>
                        {/* <th>
                            Poids
                        </th>
                        <th>
                            Taille
                        </th> */}
                        <th>
                            Opérations
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                    candidates.length === 0 ?
                    <tr>
                        <td colSpan={2}>
                            Aucune candidat(e)
                        </td>
                    </tr>:

                    candidates.map((candidate, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {candidate.name}
                                </td>
                                <td>
                                    {candidate.description}
                                </td>
                                <td>
                                    {candidate.photo}
                                </td>
                                {/* <td>
                                    {candidate.age}
                                </td>
                                <td>
                                    {candidate.weight}
                                </td>
                                <td>
                                    {candidate.height}
                                </td>
                                <td>
                                    {candidate.quickDescription}
                                </td>
                                <td>
                                    {candidate.fullDescription}
                                </td> */}
                                <td>
                                   <img 
                                    src={`http://192.168.1.202:8000/storage/${candidate.picture}`} 
                                    alt={candidate.firstName} 
                                    width={100}
                                    />
                                </td>
                                <td>
                                    <button type="button" onClick={()=>handleShowCandidate(candidate.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-icon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 8.25.22-.22a.75.75 0 0 1 1.28.53v6.441c0 .472.214.934.64 1.137a3.75 3.75 0 0 0 4.994-1.77c.205-.428-.152-.868-.627-.868h-.507m-6-2.25h7.5M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>
                                        Détails
                                    </button>
                                    <button type="button" onClick={()=>handleEditCandidate(candidate.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-icon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Modifier
                                    </button>
                                    <button type="button" onClick={()=>handleDestroyCandidate(candidate.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-icon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        }
    </div>
  )
}
